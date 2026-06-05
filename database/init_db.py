import sqlite3
import os

# Create database folder if not exists
if not os.path.exists("database"):
    os.makedirs("database")

# Connect database
conn = sqlite3.connect("database/patient_records.db")
cursor = conn.cursor()

# Create table
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

print("Database and table created successfully!")