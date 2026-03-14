@echo off

ECHO.
ECHO.  This script shall create a header-style comment for this codebase.
ECHO Input a comment label which will be in the middle of the comment.
ECHO Make sure Your label isn't ludicrously big and has an even number of characters.
ECHO Example comment: ///.../// MAIN ///...///
ECHO.
SET /p label="Comment Label: "
ECHO.

rem Count characters in label by putting it in a temp file and counting bytes in file:
SET tempfile=temp.txt
ECHO %label%>%tempfile%
FOR /F "usebackq" %%i in ('%tempfile%') do SET /a chc=%%~zi - 2
del %tempfile%

rem Calculate and print out the comment:
SET /a wingc=43-%chc%/2
FOR /L %%i in (1,1,%wingc%) do ECHO | SET /p="/"
ECHO. | SET /p="/ %label% /"
FOR /L %%i in (1,1,%wingc%) do ECHO | SET /p="/"

ECHO.
ECHO.
ECHO Generation done! Copy the comment above to use it!
