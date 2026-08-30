/*
EL DETECTOR MÁGICO
Aplicación web con TensorFlow.js

Modelo:
modelo_web_FINAL_tfjs/model.json

Categorías:
0 → caja
1 → celular
2 → lentes
3 → manzana
4 → mouse
5 → platano
6 → reloj
7 → tijeras
*/


// CONFIGURACIÓN
const MODEL_PATH = "./modelo_web_FINAL_tfjs_2/model.json";

const CLASSES = [
"caja",
"celular",
"lentes",
"manzana",
"mouse",
"platano",
"reloj",
"tijeras"
];

const EMOJIS = {
caja: "📦",
celular: "📱",
lentes: "👓",
manzana: "🍎",
mouse: "🖱️",
platano: "🍌",
reloj: "⌚",
tijeras: "✂️"
};


// VARIABLES
let model = null;
let stream = null;
let cameraActive = false;


// ELEMENTOS HTML
const video = document.getElementById("video");

const startCameraButton = document.getElementById("startCamera");
const detectButton = document.getElementById("detectButton");
const stopCameraButton = document.getElementById("stopCamera");

const statusIcon = document.getElementById("statusIcon");
const statusTitle = document.getElementById("statusTitle");
const statusText = document.getElementById("statusText");

const cameraMessage = document.getElementById("cameraMessage");

const resultIcon = document.getElementById("resultIcon");
const resultName = document.getElementById("resultName");
const confidenceText = document.getElementById("confidenceText");
const confidenceBar = document.getElementById("confidenceBar");
const resultMessage = document.getElementById("resultMessage");


// VERIFICAR ELEMENTOS
if (
!video ||
!startCameraButton ||
!detectButton ||
!stopCameraButton ||
!statusIcon ||
!statusTitle ||
!statusText ||
!cameraMessage ||
!resultIcon ||
!resultName ||
!confidenceText ||
!confidenceBar ||
!resultMessage
) {
console.error("ERROR: Falta uno o más elementos HTML.");
}


// ACTUALIZAR ESTADO
function updateStatus(type, icon, title, text) {
    if (!statusIcon || !statusTitle || !statusText) {
        return;
    }

    statusIcon.className = "status-icon " + type;
    statusIcon.textContent = icon;
    statusTitle.textContent = title;
    statusText.textContent = text;
}

// CARGAR MODELO
async function loadModel() {
    try {
        updateStatus(
            "loading",
            "⏳",
            "Cargando modelo...",
            "Inicializando el modelo de Inteligencia Artificial."
        );

        
        console.log("CARGANDO MODELO");

        console.log("Ruta:", MODEL_PATH);

        if (typeof tf === "undefined") {
            throw new Error("TensorFlow.js no está cargado.");
        }

        console.log("TensorFlow.js:", tf.version.tfjs);

        model = await tf.loadGraphModel(MODEL_PATH);

        console.log("✅ Modelo cargado correctamente");
        console.log("Entradas:", model.inputs);
        console.log("Salidas:", model.outputs);

        updateStatus(
            "success",
            "✅",
            "Modelo cargado correctamente",
            "La Inteligencia Artificial está lista para detectar objetos."
        );

        if (detectButton) {
            detectButton.disabled = !cameraActive;
        }

    } catch (error) {
        console.error("❌ ERROR AL CARGAR MODELO");
        console.error(error);

        model = null;

        updateStatus(
            "error",
            "❌",
            "Error al cargar el modelo",
            "No se pudo cargar model.json. Revisa la carpeta del modelo."
        );

        if (resultMessage) {
            resultMessage.textContent =
                "Error: no se pudo cargar el modelo.";
        }
    }
}


// ACTIVAR CÁMARA
async function startCamera() {
    try {
        
        console.log("ACTIVANDO CÁMARA");

        if (!navigator.mediaDevices ||
            !navigator.mediaDevices.getUserMedia) {

            throw new Error(
                "El navegador no permite acceder a la cámara."
            );
        }

        if (!video) {
            throw new Error("No se encontró el elemento video.");
        }

        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop();
            });

            stream = null;
        }

        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: {
                    ideal: "environment"
                },
                width: {
                    ideal: 1280
                },
                height: {
                    ideal: 720
                }
            },
            audio: false
        });

        video.srcObject = stream;

        await video.play();

        cameraActive = true;

        if (cameraMessage) {
            cameraMessage.style.display = "none";
        }

        if (startCameraButton) {
            startCameraButton.disabled = true;
        }

        if (stopCameraButton) {
            stopCameraButton.disabled = false;
        }

        if (detectButton) {
            detectButton.disabled = model === null;
        }

        updateStatus(
            "success",
            "📷",
            "Cámara activada",
            model
                ? "Cámara y modelo listos para detectar."
                : "Cámara activa. Esperando el modelo."
        );

        console.log("✅ Cámara activada");

    } catch (error) {
        console.error("❌ ERROR DE CÁMARA");
        console.error(error);

        cameraActive = false;

        if (cameraMessage) {
            cameraMessage.style.display = "block";
        }

        if (startCameraButton) {
            startCameraButton.disabled = false;
        }

        if (stopCameraButton) {
            stopCameraButton.disabled = true;
        }

        if (detectButton) {
            detectButton.disabled = true;
        }

        updateStatus(
            "error",
            "❌",
            "No se pudo activar la cámara",
            "Permite el acceso a la cámara y vuelve a intentarlo."
        );

        alert(
            "No se pudo activar la cámara.\n\n" +
            "Asegúrate de permitir el acceso cuando el navegador lo solicite."
        );
    }
}


// DETENER CÁMARA
function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => {
            track.stop();
        });

        stream = null;
    }

    if (video) {
        video.srcObject = null;
    }

    cameraActive = false;

    if (cameraMessage) {
        cameraMessage.style.display = "block";
    }

    if (startCameraButton) {
        startCameraButton.disabled = false;
    }

    if (stopCameraButton) {
        stopCameraButton.disabled = true;
    }

    if (detectButton) {
        detectButton.disabled = true;
    }

    updateStatus(
        "success",
        "⏹",
        "Cámara detenida",
        "Presiona 'Activar cámara' para comenzar nuevamente."
    );

    if (resultIcon) {
        resultIcon.textContent = "❓";
    }

    if (resultName) {
        resultName.textContent = "Esperando detección...";
    }

    if (confidenceText) {
        confidenceText.textContent = "0%";
    }

    if (confidenceBar) {
        confidenceBar.style.width = "0%";
    }

    if (resultMessage) {
        resultMessage.textContent =
            "Activa la cámara y coloca un objeto frente a ella.";
    }
}


// PREPARAR IMAGEN
function prepareImage() {
    return tf.tidy(() => {
        let image = tf.browser.fromPixels(video);

        image = tf.image.resizeBilinear(
            image,
            [224, 224]
        );

        image = image.toFloat();

        // Normalización 0 - 1
        image = image.div(127.5).sub(1);

        image = image.expandDims(0);

        return image;
    });
}


// DETECTAR OBJETO
async function detectObject() {
    if (!model) {
        alert("El modelo todavía no está cargado.");
        return;
    }

    if (!cameraActive) {
        alert("Primero debes activar la cámara.");
        return;
    }

    try {
        detectButton.disabled = true;

        resultMessage.textContent =
            "🔍 Analizando la imagen...";

        console.log("DETECTANDO OBJETO");
        
        const image = prepareImage();

        console.log("Imagen preparada:", image.shape);

        let prediction;

        if (typeof model.executeAsync === "function") {
            prediction = await model.executeAsync(image);
        } else {
            prediction = model.execute(image);
        }

        let output;

        if (Array.isArray(prediction)) {
            output = prediction[0];
        } else {
            output = prediction;
        }

        if (!output) {
            image.dispose();
            throw new Error(
                "El modelo no devolvió ninguna salida."
            );
        }

        const probabilities =
            await output.data();

        console.log(
            "Probabilidades:",
            Array.from(probabilities)
        );

        // Liberar imagen
        image.dispose();

        // Liberar predicción
        if (Array.isArray(prediction)) {
            prediction.forEach(tensor => {
                if (
                    tensor &&
                    typeof tensor.dispose === "function"
                ) {
                    tensor.dispose();
                }
            });
        } else if (
            prediction &&
            typeof prediction.dispose === "function"
        ) {
            prediction.dispose();
        }

        // VERIFICAR RESULTADO
        if (!probabilities ||
            probabilities.length === 0) {

            throw new Error(
                "El modelo no devolvió probabilidades."
            );
        }

        console.log(
            "Número de clases:",
            probabilities.length
        );

        // BUSCAR MAYOR PROBABILIDAD
        let maxIndex = 0;
        let maxProbability = probabilities[0];

        for (
            let i = 1;
            i < probabilities.length;
            i++
        ) {
            if (
                probabilities[i] >
                maxProbability
            ) {
                maxProbability =
                    probabilities[i];

                maxIndex = i;
            }
        }

        if (maxIndex >= CLASSES.length) {
            throw new Error(
                "El modelo devuelve " +
                probabilities.length +
                " valores, pero solamente existen " +
                CLASSES.length +
                " clases."
            );
        }

        const detectedClass =
            CLASSES[maxIndex];

        const confidence =
            maxProbability * 100;

        console.log(
            "Clase:",
            detectedClass
        );

        console.log(
            "Índice:",
            maxIndex
        );

        console.log(
            "Confianza:",
            confidence.toFixed(2) + "%"
        );


        // MOSTRAR RESULTADO
        resultIcon.textContent =
            EMOJIS[detectedClass] || "🔍";

        resultName.textContent =
            detectedClass;

        confidenceText.textContent =
            confidence.toFixed(2) + "%";

        confidenceBar.style.width =
            Math.min(confidence, 100) + "%";

        if (confidence >= 80) {
            resultMessage.textContent =
                "✅ El modelo reconoce este objeto con alta confianza.";
        } else if (confidence >= 50) {
            resultMessage.textContent =
                "⚠️ El modelo tiene una confianza moderada.";
        } else {
            resultMessage.textContent =
                "⚠️ El modelo no está completamente seguro del resultado.";
        }

    } catch (error) {
        console.error(
            "❌ ERROR DURANTE LA DETECCIÓN"
        );

        console.error(error);

        resultIcon.textContent = "❌";

        resultName.textContent =
            "Error de detección";

        confidenceText.textContent = "0%";

        confidenceBar.style.width = "0%";

        resultMessage.textContent =
            "Ocurrió un error al procesar la imagen.";

    } finally {
        detectButton.disabled =
            !cameraActive || !model;
    }
}


// EVENTOS
if (startCameraButton) {
    startCameraButton.addEventListener(
        "click",
        startCamera
    );
}

if (detectButton) {
    detectButton.addEventListener(
        "click",
        detectObject
    );
}

if (stopCameraButton) {
    stopCameraButton.addEventListener(
        "click",
        stopCamera
    );
}


// INICIAR APLICACIÓN
console.log("EL DETECTOR MÁGICO");

if (typeof tf !== "undefined") {
    console.log(
        "TensorFlow.js:",
        tf.version.tfjs
    );
} else {
    console.error(
        "TensorFlow.js no está disponible."
    );
}

console.log(
    "Categorías:",
    CLASSES
);

loadModel();