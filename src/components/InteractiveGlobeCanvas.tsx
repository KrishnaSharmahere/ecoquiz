import React, { useEffect, useRef, useState } from 'react';

interface MetricNode {
  name: string;
  metric: string;
  color: string;
  radius: number;
  speed: number;
  phase: number;
  tilt: number;
}

export const InteractiveGlobeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ yaw: 0.35, pitch: 0.25 });
  const [velocity, setVelocity] = useState({ yaw: 0.003, pitch: 0 });

  const rotationRef = useRef(rotation);
  const velocityRef = useRef(velocity);
  const isDraggingRef = useRef(isDragging);

  rotationRef.current = rotation;
  velocityRef.current = velocity;
  isDraggingRef.current = isDragging;

  const metricNodes: MetricNode[] = [
    { name: 'WATER', metric: '11,000 L', color: '#00D2FF', radius: 175, speed: 0.008, phase: 0, tilt: 0.35 },
    { name: 'CLIMATE', metric: '+1.1°C', color: '#F43F5E', radius: 195, speed: -0.006, phase: 2.1, tilt: -0.4 },
    { name: 'ENERGY', metric: '75% LED', color: '#FBBF24', radius: 185, speed: 0.007, phase: 4.2, tilt: 0.7 },
    { name: 'CIRCULAR', metric: '95% Al', color: '#FB923C', radius: 165, speed: -0.009, phase: 1.2, tilt: -0.6 },
    { name: 'BIODIVERSITY', metric: '44K+ IUCN', color: '#A78BFA', radius: 205, speed: 0.005, phase: 3.4, tilt: 0.2 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 500;
    let height = 500;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width || 460;
      height = rect.height || 460;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Generate static starlight field in 3D
    const stars: { x: number; y: number; z: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 70; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 550,
        y: (Math.random() - 0.5) * 550,
        z: (Math.random() - 0.5) * 550,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    // 3D Point Projection Helper
    const project = (x: number, y: number, z: number, yaw: number, pitch: number, fov = 400) => {
      // Rotate around Y axis (yaw)
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      // Rotate around X axis (pitch)
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const y2 = y * cosP - z1 * sinP;
      const z2 = z1 * cosP + y * sinP;

      // Perspective divide
      const scale = fov / (fov + z2);
      const px = width / 2 + x1 * scale;
      const py = height / 2 + y2 * scale;

      return { x: px, y: py, z: z2, scale, visible: z2 > -fov };
    };

    let tick = 0;

    const render = () => {
      tick++;

      // Update rotation
      if (!isDraggingRef.current) {
        rotationRef.current.yaw += velocityRef.current.yaw;
        rotationRef.current.pitch += velocityRef.current.pitch;
        // Dampen manual flick velocity
        velocityRef.current.yaw = velocityRef.current.yaw * 0.98 + 0.003 * 0.02;
        velocityRef.current.pitch *= 0.95;
      }

      const yaw = rotationRef.current.yaw;
      const pitch = Math.max(-0.8, Math.min(0.8, rotationRef.current.pitch));

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Background Stars
      stars.forEach(star => {
        const p = project(star.x, star.y, star.z, yaw * 0.2, pitch * 0.2);
        if (p.visible) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, star.size * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224, 242, 254, ${star.alpha * p.scale})`;
          ctx.fill();
        }
      });

      // 2. Draw Outer Celestial Horizon Ring
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 215, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Central Earth Sphere Base Depth Glow
      const globeRadius = 110;
      const coreGrad = ctx.createRadialGradient(
        width / 2 - 25, height / 2 - 25, 10,
        width / 2, height / 2, globeRadius + 20
      );
      coreGrad.addColorStop(0, '#15243B');
      coreGrad.addColorStop(0.5, '#0E1726');
      coreGrad.addColorStop(0.9, '#070C15');
      coreGrad.addColorStop(1, 'rgba(7, 12, 21, 0)');

      ctx.beginPath();
      ctx.arc(width / 2, height / 2, globeRadius + 15, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Atmospheric Rim Halo
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, globeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.45)';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = '#00D2FF';
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // 4. Draw 3D Earth Latitude Rings (Parallels)
      const latSteps = [-60, -35, -15, 0, 15, 35, 60];
      latSteps.forEach(latDeg => {
        const phi = (latDeg * Math.PI) / 180;
        const rLat = globeRadius * Math.cos(phi);
        const yLat = globeRadius * Math.sin(phi);

        ctx.beginPath();
        let first = true;
        for (let thetaDeg = 0; thetaDeg <= 360; thetaDeg += 10) {
          const theta = (thetaDeg * Math.PI) / 180;
          const x = rLat * Math.cos(theta);
          const z = rLat * Math.sin(theta);
          const p = project(x, -yLat, z, yaw, pitch);

          // Only draw points on front or back with appropriate opacity
          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.closePath();
        ctx.strokeStyle = latDeg === 0 ? 'rgba(0, 210, 255, 0.35)' : 'rgba(56, 189, 248, 0.16)';
        ctx.lineWidth = latDeg === 0 ? 1.4 : 0.8;
        ctx.stroke();
      });

      // 5. Draw 3D Earth Longitude Meridians
      for (let lonDeg = 0; lonDeg < 180; lonDeg += 30) {
        const theta = (lonDeg * Math.PI) / 180;
        ctx.beginPath();
        let first = true;
        for (let latDeg = -90; latDeg <= 90; latDeg += 8) {
          const phi = (latDeg * Math.PI) / 180;
          const x = globeRadius * Math.cos(phi) * Math.sin(theta);
          const y = globeRadius * Math.sin(phi);
          const z = globeRadius * Math.cos(phi) * Math.cos(theta);
          const p = project(x, -y, z, yaw, pitch);

          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // 6. Draw 3D Orbital Rings with Orbiting Metric Satellites
      metricNodes.forEach(node => {
        const currentAngle = tick * node.speed + node.phase;

        // Draw orbital trajectory ring
        ctx.beginPath();
        let first = true;
        for (let a = 0; a <= 360; a += 12) {
          const rad = (a * Math.PI) / 180;
          // Tilted orbit
          const x = node.radius * Math.cos(rad);
          const y = node.radius * Math.sin(rad) * Math.sin(node.tilt);
          const z = node.radius * Math.sin(rad) * Math.cos(node.tilt);
          const p = project(x, y, z, yaw, pitch);

          if (first) {
            ctx.moveTo(p.x, p.y);
            first = false;
          } else {
            ctx.lineTo(p.x, p.y);
          }
        }
        ctx.closePath();
        ctx.strokeStyle = `${node.color}25`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Calculate satellite position
        const satX = node.radius * Math.cos(currentAngle);
        const satY = node.radius * Math.sin(currentAngle) * Math.sin(node.tilt);
        const satZ = node.radius * Math.sin(currentAngle) * Math.cos(node.tilt);
        const satP = project(satX, satY, satZ, yaw, pitch);

        // Depth sorting: if behind globe, fade out
        const isBehind = satP.z < 0;
        const satOpacity = isBehind ? 0.35 : 1;
        const satSize = Math.max(3, 5.5 * satP.scale);

        // Satellite Glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(satP.x, satP.y, satSize, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = satOpacity;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isBehind ? 4 : 14;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Satellite Orbit Pulse Ring
        ctx.beginPath();
        ctx.arc(satP.x, satP.y, satSize * 1.8, 0, Math.PI * 2);
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = satOpacity * 0.5;
        ctx.stroke();

        // Metric Tag Label (only if in front)
        if (!isBehind) {
          ctx.font = 'bold 9px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.fillStyle = node.color;
          ctx.globalAlpha = 0.95;
          ctx.fillText(node.metric, satP.x, satP.y - satSize - 6);

          ctx.font = '7px "JetBrains Mono", monospace';
          ctx.fillStyle = '#94A3B8';
          ctx.fillText(node.name, satP.x, satP.y + satSize + 11);
        }
        ctx.restore();
      });

      // 7. Center Focal Crosshairs
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#00F0FF';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Mouse & Touch Drag Interactions
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;

    setRotation(prev => ({
      yaw: prev.yaw + deltaX * 0.007,
      pitch: Math.max(-0.8, Math.min(0.8, prev.pitch + deltaY * 0.007)),
    }));

    setVelocity({
      yaw: deltaX * 0.003,
      pitch: deltaY * 0.003,
    });

    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - lastMousePos.x;
    const deltaY = e.touches[0].clientY - lastMousePos.y;

    setRotation(prev => ({
      yaw: prev.yaw + deltaX * 0.008,
      pitch: Math.max(-0.8, Math.min(0.8, prev.pitch + deltaY * 0.008)),
    }));

    setVelocity({
      yaw: deltaX * 0.003,
      pitch: deltaY * 0.003,
    });

    setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  return (
    <div className="relative w-full max-w-[480px] mx-auto aspect-square flex items-center justify-center select-none group">
      {/* Background Volumetric Ambient Bloom */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-indigo-900/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Interactive 3D Earth Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing rounded-full"
        style={{ touchAction: 'none' }}
      />

      {/* Tactile Hint Pill */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0F1422]/90 border border-white/10 text-[10px] font-mono text-cyan-300 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity backdrop-blur-md flex items-center gap-1.5 shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>Drag to rotate 3D Earth System</span>
      </div>
    </div>
  );
};
