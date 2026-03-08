@ECHO OFF

echo This will copy ^& replace the newest nginx.conf file located here into Your nginx installation.
echo.
echo This script it tailored specifically to updating the repo, not installing anything.
echo Make sure You've got nginx installed in the project before updating.
echo (note: major structure changes would obviously break the script)
echo. 
pause

xcopy /s /y nginx.conf ..\stellarnexus\conf\