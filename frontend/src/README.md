# Varicose Veins Detection Using Deep Learning

## Project Overview

This project is an AI-based medical image classification system that detects whether a leg image shows signs of Varicose Veins or is Normal.

The system uses a Convolutional Neural Network (CNN) model built using TensorFlow and Keras for image classification.

It also includes:

- Flask Backend API
- React Frontend UI
- SQLite Database for storing predictions
- PDF Report Generation
- Prediction History Tracking

This project helps in early detection of varicose veins and can assist healthcare professionals in preliminary diagnosis.

---

## Technologies Used

### Frontend
- React.js
- Axios
- HTML
- CSS
- JavaScript

### Backend
- Python
- Flask
- Flask-CORS
- TensorFlow
- Keras
- NumPy
- Pillow

### Database
- SQLite

### Report Generation
- ReportLab (PDF)

---

## Features

- Upload leg image
- Predict Varicose Veins / Normal
- Confidence Score Display
- Store Prediction History
- Generate PDF Medical Report
- Professional UI
- API-based communication

---

## Folder Structure

```bash
varicose-veins-detector/
│
├── backend/
│   ├── app.py
│   ├── train_model.py
│   ├── model.h5
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   └── App.js
│   └── package.json
│
├── database/
│   ├── init_db.py
│   └── predictions.db
│
└── README.md