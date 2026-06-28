@echo off
echo ==============================================
echo Cleaning Next.js build cache...
echo ==============================================
if exist .next (
  echo Deleting .next directory...
  rmdir /s /q .next
) else (
  echo No .next directory found.
)
echo.
echo ==============================================
echo Starting Next.js Dev Server...
echo ==============================================
npm run dev
