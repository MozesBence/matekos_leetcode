import time
import mysql.connector
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
from request import get_random_quote

load_dotenv("../src/.env")

def get_db_connection():
    """Kapcsolódás az adatbázishoz .env változókkal."""
    return mysql.connector.connect(
        host=os.getenv('DB_HOST'),
        user=os.getenv('DB_USERNAME'),
        password=os.getenv('DB_PASSWORD'),
        database=os.getenv('DB_NAME')
    )

def get_quote_from_db(db):
    """Lekérdezi az aktuális napi idézetet az adatbázisból."""
    cursor = db.cursor()
    cursor.execute("SELECT quote FROM daily_quotes WHERE id = 1")
    result = cursor.fetchone()
    cursor.close()
    return result[0] if result else None

def upload_to_db(quote):
    """Frissíti vagy beilleszti az új napi idézetet az adatbázisba."""
    if not quote:
        print("Nem volt idézet!")
        return
    db = get_db_connection()
    cursor = db.cursor()
    existing_quote = get_quote_from_db(db)

    if existing_quote is None:
        sql = "INSERT INTO daily_quotes (id, quote) VALUES (1, %s)"
        cursor.execute(sql, (quote,))
        print("Új idézet beillesztve!")
    else:
        sql = "UPDATE daily_quotes SET quote = %s WHERE id = 1"
        cursor.execute(sql, (quote,))
        print("Idézet frissítve!")

    db.commit()
    cursor.close()
    db.close()

def intervall():
    """Várakozik éjfélig, majd újra frissíti az idézetet."""
    now = datetime.now()
    midnight = datetime.combine(now.date() + timedelta(days=1), datetime.min.time())
    seconds_until_midnight = (midnight - now).total_seconds()
    time.sleep(seconds_until_midnight)

def test_intevall():
    print("(5sec)...")
    time.sleep(5)

def main():
    """A fő program ciklus, amely minden nap frissíti az idézetet."""
    while True:
        quote = get_random_quote()  
        print(f"Új idézet: {quote}")
        
        success = False
        while not success:
            try:
                upload_to_db(quote)
                print("A feltöltés végbement!")
                success = True
            except mysql.connector.Error as err:
                print(f"DB error: {err}. Újrapróbálkozás 5 másodperc múlva...") 
                time.sleep(5)
        
        intervall()
        print("Várakozás az új napra...")

if __name__ == '__main__':
    main()
