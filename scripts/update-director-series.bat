echo off
echo Replacing director-series.ts with the fixed version that includes the Ashley chair...
del /f /q "e:\steelmade-cloudiary-chairs\lib\data\products\chairs\director-series.ts"
rename "e:\steelmade-cloudiary-chairs\lib\data\products\chairs\director-series.ts.new" "director-series.ts"
echo Done!