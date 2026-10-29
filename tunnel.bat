@echo off
setlocal
echo ========================================================
echo  EcoQuiz - Starting Local Server and Public Cloudflare Tunnel
echo ========================================================
set PATH=C:\Users\krish\AppData\Local\Programs\nodejs;%PATH%
cd /d %~dp0

start "EcoQuiz Server" cmd /c "node serve.js"
timeout /t 2 /nobreak >nul
start "Cloudflare Tunnel" cmd /c ""..\cloudflared.exe" tunnel --url http://127.0.0.1:4173"

echo.
echo Both EcoQuiz Server (port 4173) and Cloudflare Tunnel have been launched!
echo Check the Cloudflare Tunnel window for your active public URL.
echo ========================================================
