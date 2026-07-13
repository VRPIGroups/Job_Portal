@echo off
echo ====================================================
echo 🛡️ Starting PostgreSQL Server...
echo ====================================================
"C:\Program Files\PostgreSQL\17\bin\pg_ctl.exe" start -D "C:\Program Files\PostgreSQL\17\data"

echo.
echo ====================================================
echo 📡 Running database migrations...
echo ====================================================
call npm run db:migrate

echo.
echo ====================================================
echo 🌱 Seeding the database...
echo ====================================================
call npm run db:seed

echo.
echo ====================================================
echo Done! Please restart your backend server if it didn't reconnect.
echo ====================================================
pause
