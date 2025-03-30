@echo off
title Matekos LeetCode Projekt indító
chcp 65001

:menu
cls
echo Válassza ki a futtatási módot:
echo.
echo  1. Felhasználói környezet
echo  2. Fejlesztői környezet
echo  3. Teszt eredmények indítása
echo.
choice /c 123 /m "Adja meg a választott opció számát:"
if errorlevel 3 goto option3
if errorlevel 2 goto option2
if errorlevel 1 goto option1

:option1
echo.
echo [Felhasználói környezet] - Telepítés és futtatás...
REM Gyökér szinten npm install
call npm i
if errorlevel 1 (
    echo Hiba történt az npm install futtatása közben!
    pause
    exit /b 1
)
REM Belépés az src mappába és npm install
pushd src
call npm i
if errorlevel 1 (
    echo Hiba történt az src mappában az npm install futtatása közben!
    popd
    pause
    exit /b 1
)
popd
REM Gyökér szinten build futtatása
call npm run build
if errorlevel 1 (
    echo Hiba történt a build futtatása közben!
    pause
    exit /b 1
)
REM A quote_py mappában először letölti a szükséges Python csomagokat, majd elindítja a main.py-t egy külön CMD ablakban
start "Quote" cmd /c "cd quote_py && pip install mysql-connector-python python-dotenv requests beautifulsoup4 chardet && python ./main.py"
REM Az src mappából a preview és start parancsokat külön ablakokban indítjuk el
start "Preview" cmd /k "cd src && npm run preview"
start "Start" cmd /k "cd src && npm start"
goto end

:option2
echo.
echo [Fejlesztői környezet] - Telepítés és fejlesztői mód indítása...
call npm i
if errorlevel 1 (
    echo Hiba történt az npm install futtatása közben!
    pause
    exit /b 1
)
pushd src
call npm i
if errorlevel 1 (
    echo Hiba történt az src mappában az npm install futtatása közben!
    popd
    pause
    exit /b 1
)
popd
REM A quote_py mappában először letölti a szükséges Python csomagokat, majd elindítja a main.py-t egy külön CMD ablakban
start "Quote" cmd /c "cd quote_py && pip install mysql-connector-python python-dotenv requests beautifulsoup4 chardet && python ./main.py"
REM Fejlesztői mód elindítása
call npm run dev
goto end

:option3
echo.
echo [Teszt eredmények indítása] - Tesztek futtatása...
pushd backend_test
call npm i
if errorlevel 1 (
    echo Hiba történt a backend_test mappában az npm install futtatása közben!
    popd
    pause
    exit /b 1
)
call npm test
popd
goto end

:end
echo.
echo Folyamat befejezve.
pause