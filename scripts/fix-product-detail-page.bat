@echo off
echo Replacing ProductDetailPage.tsx with the fixed version...
del /f /q "e:\steelmade-cloudiary-chairs\components\products\ProductDetailPage.tsx"
rename "e:\steelmade-cloudiary-chairs\components\products\ProductDetailPage.tsx.new" "ProductDetailPage.tsx"
echo Done!