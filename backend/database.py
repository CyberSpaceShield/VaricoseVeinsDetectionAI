import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

def create_table():
    conn = sqlite3.connect(str(BASE_DIR / "predictions.db"))
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS patients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_name TEXT,
            age INTEGER,
            gender TEXT,
            contact TEXT,
            image_name TEXT,
            prediction_result TEXT,
            confidence_score REAL,
            upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    conn.close()


def save_prediction(patient_name, image_name, prediction_result):
    conn = sqlite3.connect("predictions.db")
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO predictions
        (patient_name, image_name, prediction_result)
        VALUES (?, ?, ?)
    """, (patient_name, image_name, prediction_result))

    conn.commit()
    conn.close()


if __name__ == "__main__":
    create_table()
    print("Database and table created successfully")