@ECHO OFF

ECHO.
ECHO.  This will copy ^& replace the newest nginx.conf file located here into Your nginx installation.
ECHO The script it tailored specifically to updating the repo, not installing anything.
ECHO Make sure You've got nginx installed in the project before updating.
ECHO.		(note: major structure changes would obviously break the script)
ECHO. 
PAUSE

XCOPY /s /y nginx.conf ..\stellarnexus\conf\