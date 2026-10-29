@echo off
setlocal
set "PATH=C:\Users\krish\.gemini\antigravity\scratch\git\cmd;%PATH%"
cd /d "C:\Users\krish\.gemini\antigravity\scratch\ecoquiz"

echo ========================================================
echo   EcoQuiz - Upload to GitHub
echo ========================================================
echo.
echo Target Repository: https://github.com/KrishnaSharmahere/ecoquiz.git
echo Branch: main
echo.
echo Connecting to GitHub and pushing files...
echo (If prompted, sign in to your GitHub account or paste your Personal Access Token)
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo  SUCCESS! Your website code is now uploaded to GitHub!
    echo  View it at: https://github.com/KrishnaSharmahere/ecoquiz
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo  If git requested a password/token or failed:
    echo.
    echo  GitHub requires a Personal Access Token instead of your account password:
    echo  1. Create a token in 10 seconds at: https://github.com/settings/tokens/new
    echo     (Give it 'repo' scope and click Generate)
    echo  2. When prompted for password, paste that token!
    echo.
    echo  OR use Method 2:
    echo  Extract 'EcoQuiz-Source.zip' from your Downloads folder
    echo  and drag the files into: https://github.com/KrishnaSharmahere/ecoquiz
    echo ========================================================
)

echo.
pause
