# server/app.py
import io
import numpy as np
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.lite.python.interpreter import Interpreter
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

app = Flask(__name__)
CORS(app)

# --- 1) Modeli yükle ---
# model.tflite dosyanızın server/ altında olduğundan emin olun
interpreter = Interpreter(model_path="model.tflite")
interpreter.allocate_tensors()
inp  = interpreter.get_input_details()[0]
outp = interpreter.get_output_details()[0]

# --- 2) Türkçe etiketler ---
labels_tr = [
    'Melanositik Nevüs',
    'Melanom',
    'Benign Keratoz Benzeri Lezyon',
    'Bazal Hücre Karsinomu',
    'Aktinik Keratoz / İntraepitelyal Karsinom'
]

# Hata kontrolü
num_classes = outp['shape'][1]
if len(labels_tr) != num_classes:
    raise ValueError(f"Etiket sayısı ({len(labels_tr)}) ile model çıktı sayısı ({num_classes}) uyuşmuyor!")

@app.route('/predict', methods=['POST'])
def predict():
    # Görsel yükleme kontrolü
    if 'image' not in request.files:
        return jsonify({"error": "no image"}), 400

    file = request.files['image']
    img  = Image.open(io.BytesIO(file.read())).convert('RGB')

    # Modelin beklediği boyuta getir
    height, width = inp['shape'][1], inp['shape'][2]
    img_resized = img.resize((width, height))

    # Numpy dizisine çevir, preprocess et, batch axis ekle
    arr = np.array(img_resized, dtype=np.float32)
    arr = preprocess_input(arr)            # MobileNetV2 ön-işlemi
    arr = np.expand_dims(arr, axis=0)      # [1, H, W, 3]

    # İnferans
    interpreter.set_tensor(inp['index'], arr)
    interpreter.invoke()
    probs = interpreter.get_tensor(outp['index'])[0]  # tek örnek

    # Sonuçları hazırla
    results = []
    for label, score in zip(labels_tr, probs):
        results.append({
            "label": label,
            "score": float(score)
        })

    # Azalan skor sırasına göre döndür
    results = sorted(results, key=lambda x: x["score"], reverse=True)
    return jsonify(results)

if __name__ == '__main__':
    # Tüm arayüzlerden dinle: http://10.0.2.2:5000 ve http://192.168.x.x:5000
    app.run(host='0.0.0.0', port=5000, debug=True)
