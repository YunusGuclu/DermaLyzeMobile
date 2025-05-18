import io
import traceback
from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import tensorflow as tf

app = Flask(__name__)

# --- 1) İlk model (skin cancer vs benign vs melanoma vb.) ---
interpreter = tf.lite.Interpreter(model_path="model.tflite")
interpreter.allocate_tensors()
inp  = interpreter.get_input_details()[0]
outp = interpreter.get_output_details()[0]
_, h, w, _ = inp['shape']

labels_tr = [
    'Melanositik Nevüs',
    'Melanom',
    'Benign Keratoz Benzeri Lezyon',
    'Bazal Hücre Karsinomu',
    'Aktinik Keratoz / İntraepitelyal Karsinom'
]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "no image"}), 400

        file = request.files['image'].read()
        img = Image.open(io.BytesIO(file)).convert('RGB')
        arr = np.array(img.resize((w, h)), dtype=np.float32)
        arr = (arr / 127.5) - 1.0
        arr = np.expand_dims(arr, axis=0)

        interpreter.set_tensor(inp['index'], arr)
        interpreter.invoke()
        probs = interpreter.get_tensor(outp['index'])[0]

        results = sorted(
            [{"label": l, "score": float(s)} for l, s in zip(labels_tr, probs)],
            key=lambda x: x["score"], reverse=True
        )
        return jsonify(results)
    except Exception:
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500


# --- 2) İkinci model (Acne.tflite) ---
acne_interpreter = tf.lite.Interpreter(model_path="Acne.tflite")
acne_interpreter.allocate_tensors()
acne_inp  = acne_interpreter.get_input_details()[0]
acne_outp = acne_interpreter.get_output_details()[0]
_, acne_h, acne_w, _ = acne_inp['shape']

label_map = {
    0: "Acne", 1: "Acne Infantile", 2: "Acne Open Comedo", 3: "Acne Steroid",
    4: "Acne conglobata", 5: "Acne excoriée", 6: "Acne keloidalis nuchae",
    7: "Acne vulgaris", 8: "Hidradenitis suppurativa", 9: "Hyperhidrosis",
    10: "Milia", 11: "Minocycline Pigmentation", 12: "Perioral Dermatitis",
    13: "Pomade acne", 14: "Rosacea"
}

disease_info = {
    "Acne": (
        "Teşhis: Deri yağ bezlerinin fazla sebum üretimi ve gözeneklerin tıkanması sonucu siyah nokta, beyaz nokta, papül ve püstüller oluşur.",
        "Bilgi: Ergenlik döneminde hormon dalgalanmalarıyla tetiklenir; genetik yatkınlık, stres ve beslenme de rol oynar. Topikal retinoidler, antibakteriyel losyonlar ve cilt temizliği tedavinin temelini oluşturur."
    ),
    "Acne Infantile": (
        "Teşhis: Yenidoğan ve bebeklik döneminde görülen papül-püstüller, nadiren nodül ve kistler oluşturabilir.",
        "Bilgi: Genellikle bir-üç aylıkken başlar, çoğu bebekte 6 aya kadar kendiliğinden geriler. Bol temiz hava, nazik cilt bakımı ve gerekirse dermatolog kontrolü önerilir."
    ),
    "Acne Open Comedo": (
        "Teşhis: Gözenek tıkanıklığındaki oksidasyonla kararan sebum tıkaçları (siyah noktalar).",
        "Bilgi: Hafif akne formudur, düzenli exfoliasyon ve salisilik asit içeren ürünlerle önlenebilir. Derin lezyonlara ilerlemeden müdahale edilmesi önerilir."
    ),
    "Acne Steroid": (
        "Teşhis: Topikal veya sistemik kortikosteroid kullanımına bağlı, nodüler ve kistik lezyonlar.",
        "Bilgi: Steroid dozu azaltılmalı, hormonal düzeyler izlenmeli, alternatif anti-enflamatuar tedaviler değerlendirilmeli."
    ),
    "Acne conglobata": (
        "Teşhis: Derin skarlı, fistüllü nodüllerle seyreden, en ağır akne tiplerinden biri.",
        "Bilgi: Genç erişkin erkeklerde yaygın; sistemik retinoidler ve antibiyotik kombinasyonları sıklıkla kullanılır. Erken ve agresif tedavi skarları azaltır."
    ),
    "Acne excoriée": (
        "Teşhis: Takıntılı kaşıma ve sıkma nedeniyle erozyon, skar ve pigment değişiklikleri.",
        "Bilgi: Psikolojik faktörler (anksiyete, obsesif davranış) ön planda; dermatolog ve psikolog iş birliğiyle hem topikal hem davranışsal müdahale gerekir."
    ),
    "Acne keloidalis nuchae": (
        "Teşhis: Ense kökünde sert, keloid benzeri nodüller ve skar dokusu.",
        "Bilgi: Sıkı saç kesimi, dar giyim ve travma tetikleyebilir. Siyah ırkta daha sık görülür. Cerrahi eksizyon ve intralezyonal kortikosteroid enjeksiyonları tedavide kullanılır."
    ),
    "Acne vulgaris": (
        "Teşhis: Papül, püstül, kistik lezyonlar ve komedonların karışık formu.",
        "Bilgi: Ergenlik döneminin tipik hastalığıdır; cilt bariyerini koruyan nazik temizleyiciler, topikal retinoidler ve antibiyotikler kombinasyonuyla kontrol altına alınır."
    ),
    "Hidradenitis suppurativa": (
        "Teşhis: Aksilla, kasık ve gluteal bölgede tekrar eden apse ve fistülsel lezyonlar.",
        "Bilgi: Kronik ilerleyici; diyet, hijyen, antibiyotik ve biyolojik ajanlar uzun süreli remisyon sağlar. Cerrahi de gerekebilir."
    ),
    "Hyperhidrosis": (
        "Teşhis: Eli, ayakları veya koltuk altlarını etkileyen aşırı terleme.",
        "Bilgi: Sosyal ve mesleki yaşamı etkiler. Antiperspiran kremler, iyontoforez, botulinum toksini enjeksiyonları veya sinir cerrahisi seçenekleri bulunur."
    ),
    "Milia": (
        "Teşhis: Yüzde 1–2 mm, beyaz veya sarı keratin dolu kistler.",
        "Bilgi: Yenidoğanlarda %40’a varan sıklıkla görülür; müdahale gerektirmez. Yetişkinde travma veya sürfaktan kullanımından sonra ortaya çıkabilir, basit ekstraksiyonla giderilir."
    ),
    "Minocycline Pigmentation": (
        "Teşhis: Minosiklin uzun süreli kullanımında deri, diş ve mukozada mavi-siyah pigment birikimi.",
        "Bilgi: İlacın kesilmesi zamanla renk solmasına yol açar; kalıcı skar riski düşüktür. Alternatif antibiyotik değerlendirilir."
    ),
    "Perioral Dermatitis": (
        "Teşhis: Ağız ve nazolabial bölgede eritemli papül-püstüller, bazen kaşıntılı.",
        "Bilgi: Topikal steroidler kötüleştirir. Metronidazol, pimekrolimus veya düşük doz oral tetrasiklinler etkilidir."
    ),
    "Pomade acne": (
        "Teşhis: Saç ürünlerinin alın bölgesine yayılması sonucu komedon ve papüller.",
        "Bilgi: Yağsız, non-komedojenik ürünler tercih edilmeli; bölge temizliği ve topikal salisilik asit fayda sağlar."
    ),
    "Rosacea": (
        "Teşhis: Yüzde orta hatta eritem, telanjiektazi, papül-püstüller ve bazen göz tutulumu.",
        "Bilgi: Alevlendiriciler arasında güneş, sıcak içecek, alkol bulunur. Topikal metronidazol, azelaik asit ve oral antibiyotiklerle kontrol sağlanır."
    ),
}


@app.route('/predict_acne', methods=['POST'])
def predict_acne():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "no image"}), 400

        file = request.files['image'].read()
        img = Image.open(io.BytesIO(file)).convert('RGB')
        arr = np.array(img.resize((acne_w, acne_h)), dtype=np.float32) / 255.0
        arr = np.expand_dims(arr, axis=0)

        acne_interpreter.set_tensor(acne_inp['index'], arr)
        acne_interpreter.invoke()
        preds = acne_interpreter.get_tensor(acne_outp['index'])[0]

        idx   = int(np.argmax(preds))
        label = label_map[idx]
        score = float(preds[idx])
        diag, info = disease_info.get(label, ("", ""))

        return jsonify({
            "label": label,
            "score": score,
            "diagnosis": diag,
            "info": info
        })
    except Exception:
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500


