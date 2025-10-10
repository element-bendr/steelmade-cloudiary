@echo off
echo Replacing classic-director-chair.ts with the fixed version...
del /f /q "e:\steelmade-cloudiary-chairs\lib\data\products\chairs\director-series\classic-director-chair.ts"
rename "e:\steelmade-cloudiary-chairs\lib\data\products\chairs\director-series\classic-director-chair.ts.new" "classic-director-chair.ts"
echo Done!