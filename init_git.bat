@echo off
set "PATH=C:\Users\krish\.gemini\antigravity\scratch\git\cmd;%PATH%"
cd /d "%~dp0"

echo Initializing Git repository...
git init
git config user.name "Krishan Chander Khjuriya"
git config user.email "krishanchander@lpu.edu.in"
git branch -M main

echo Staging files (excluding node_modules and temp files via .gitignore)...
git add .

echo Creating initial commit...
git commit -m "feat: EcoQuiz - Learn the planet. Level up your impact. (CHE110 CA1 Project)"

echo.
echo Git repository initialized successfully!
git log -1
git status
