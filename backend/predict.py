from flask import Flask, request, jsonify
from flask_cors import CORS
from pathlib import Path
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import sqlite3
import io

BASE_DIR = Path(__file__).resolve().parent
app = Flask(__name__)
CORS(app)

# Load trained model
model = load_model(str(BASE_DIR / "model.h5"))


def init_db():
    conn = sqlite3.connect(str(BASE_DIR / "predictions.db"))
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS patients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_name TEXT,
            image_name TEXT,
            prediction_result TEXT,
            confidence_score REAL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()


def save_prediction(patient_name, image_name, prediction_result, confidence_score):
    conn = sqlite3.connect(str(BASE_DIR / "predictions.db"))
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO patients (
            patient_name,
            image_name,
            prediction_result,
            confidence_score
        )
        VALUES (?, ?, ?, ?)
    """, (patient_name, image_name, prediction_result, confidence_score))
    conn.commit()
    conn.close()


@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    patient_name = request.form.get("patient_name", "Unknown Patient")

    image_bytes = file.read()
    img = image.load_img(io.BytesIO(image_bytes), target_size=(128, 128))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0

    prediction = model.predict(img_array)
    confidence = float(prediction[0][0]) * 100

    if prediction[0][0] > 0.5:
        result = "Varicose Veins Detected"
        confidence_score = round(confidence, 2)
    else:
        result = "Normal Leg"
        confidence_score = round(100 - confidence, 2)

    save_prediction(
        patient_name=patient_name,
        image_name=file.filename,
        prediction_result=result,
        confidence_score=confidence_score
    )

    return jsonify({"prediction": result, "confidence": confidence_score})


if __name__ == "__main__":
    init_db()
    app.run(debug=True)
