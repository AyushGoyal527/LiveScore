@echo off
cd /d "%~dp0backend"
if not exist .env (
  copy .env.example .env
  echo Created backend .env. Open it and set your JWT secrets before continuing.
  pause
)
npm install
npm run dev
pause
