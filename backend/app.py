from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from werkzeug.security import generate_password_hash, check_password_hash
from reportlab.pdfgen import canvas

import numpy as np
import sqlite3
import io
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# =========================
# DATABASE PATH
# =========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "..", "database", "varicoai.db")

# =========================
# LOAD MODEL
# =========================
model = load_model("model.h5")

# =========================
# CREATE TABLES
# =========================
def create_tables():

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Users table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
    )
    """)

    # Predictions table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        prediction TEXT,
        confidence REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()

create_tables()

# =========================
# HOME ROUTE
# =========================
@app.route("/")
def home():
    return "Backend Running Successfully!"

# =========================
# REGISTER ROUTE
# =========================
@app.route("/register", methods=["POST"])
def register():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    if not all([name, email, password, role]):
        return jsonify({
            "error": "All fields are required"
        }), 400

    hashed_password = generate_password_hash(password)

    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()

        cursor.execute("""
        INSERT INTO users (name, email, password, role)
        VALUES (?, ?, ?, ?)
        """, (name, email, hashed_password, role))

        conn.commit()
        conn.close()

        return jsonify({
            "message": f"{role.capitalize()} registered successfully!"
        })

    except sqlite3.IntegrityError:
        return jsonify({
            "error": "Email already exists"
        }), 400
    
# =========================
# LOGIN ROUTE
# =========================
@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    try:

        conn = sqlite3.connect("../database/varicoai.db")
        cursor = conn.cursor()

        cursor.execute("""
            SELECT id, name, email, password, role
            FROM users
            WHERE email = ?
        """, (email,))

        user = cursor.fetchone()

        conn.close()

        if user:

            user_id = user[0]
            name = user[1]
            user_email = user[2]
            stored_password = user[3]
            role = user[4]

            # CHECK HASHED PASSWORD
            if check_password_hash(stored_password, password):

                return jsonify({
                    "message": "Login successful",
                    "id": user_id,
                    "name": name,
                    "email": user_email,
                    "role": role
                })

            else:

                return jsonify({
                    "error": "Invalid password"
                }), 401

        else:

            return jsonify({
                "error": "User not found"
            }), 404

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500    

# =========================
# PREDICT ROUTE
# =========================
@app.route("/predict", methods=["POST"])
def predict():

    if "file" not in request.files:
        return jsonify({
            "error": "No file uploaded"
        }), 400

    file = request.files["file"]

    user_id = request.form.get("user_id")

    # Read image
    image_bytes = file.read()

    img = image.load_img(
        io.BytesIO(image_bytes),
        target_size=(128, 128)
    )

    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0

    # Predict
    prediction = model.predict(img_array)

    confidence = float(prediction[0][0]) * 100

    if prediction[0][0] > 0.5:
        result = "Varicose Veins Detected"
        confidence_score = round(confidence, 2)
    else:
        result = "Normal Leg"
        confidence_score = round(100 - confidence, 2)

    # Save prediction to database
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO predictions (user_id, prediction, confidence)
    VALUES (?, ?, ?)
    """, (user_id, result, confidence_score))

    conn.commit()
    conn.close()

    return jsonify({
        "prediction": result,
        "confidence": confidence_score
    })

# =========================
# DOWNLOAD REPORT
# =========================
@app.route("/download-report", methods=["POST"])
def download_report():

    data = request.json

    prediction = data.get("prediction")
    confidence = data.get("confidence")

    report_path = os.path.join(BASE_DIR, "report.pdf")

    c = canvas.Canvas(report_path)

    c.setFont("Helvetica-Bold", 18)
    c.drawString(180, 800, "VaricoAI Medical Report")

    c.setFont("Helvetica", 14)
    c.drawString(100, 730, f"Prediction: {prediction}")
    c.drawString(100, 700, f"Confidence: {confidence}%")

    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    c.drawString(100, 670, f"Generated On: {current_time}")

    c.save()

    return send_file(
        report_path,
        as_attachment=True
    )

# =========================
# VIEW ALL PREDICTIONS
# =========================
@app.route("/predictions", methods=["GET"])
def get_predictions():

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
    SELECT * FROM predictions
    ORDER BY created_at DESC
    """)

    rows = cursor.fetchall()

    conn.close()

    predictions = []

    for row in rows:
        predictions.append({
            "id": row[0],
            "user_id": row[1],
            "prediction": row[2],
            "confidence": row[3],
            "created_at": row[4]
        })

    return jsonify(predictions)

# =========================
# GET PATIENT HISTORY
# =========================

@app.route("/patient-history/<int:user_id>", methods=["GET"])
def patient_history(user_id):

    try:

        conn = sqlite3.connect("../database/varicoai.db")

        cursor = conn.cursor()

        cursor.execute("""
        SELECT prediction, confidence, created_at
        FROM predictions
        WHERE user_id = ?
        ORDER BY id DESC
        """, (user_id,))

        history = cursor.fetchall()

        conn.close()

        results = []

        for row in history:

            results.append({
                "prediction": row[0],
                "confidence": row[1],
                "date": row[2]
            })

        return jsonify(results)

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

# =========================
# RUN APP
# =========================
if __name__ == "__main__":
    app.run(debug=True)