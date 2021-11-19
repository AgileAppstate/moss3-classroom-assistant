*Needs to run*
Works on Windows

All files need to be in root directory of individual project

Must be run through executable, not dev environment

*Specific info*
Downloaded file path saved in destination.txt

Files are read with glob and passed individually to exec function

The glob npm package is required because the exec function does not glob wildcards like * which are necessary for MOSS

Output is only given in an alert box, which requires the user to manually type in the results url

The file with all major changes and logic is ItemArchivePanelList.jsx located in app/routes/archive/components

There are multiple Strawberry (Perl interpreter) and moss.pl files located in different sections of the project, please keep all of these where they are because I'm not entirely sure which one is used where (the code just works)
