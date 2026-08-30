# El Detector Mágico

El Detector Mágico es una aplicación web que utiliza Inteligencia Artificial para reconocer objetos mediante la cámara del dispositivo.

El proyecto utiliza Transfer Learning con MobileNetV2 y TensorFlow.js para realizar la detección directamente desde el navegador.

## Objetos que reconoce

Caja
Celular
Lentes
Manzana
Mouse
Plátano
Reloj
Tijeras

## Tecnologías utilizadas

Python
TensorFlow
Keras
MobileNetV2
TensorFlow.js
HTML
CSS
JavaScript
Google Colab

## Estructura del proyecto

El proyecto está organizado de la siguiente manera:

El-Detector-Magico/
├── index.html
├── style.css
├── app.js
├── README.md
└── modelo_web_FINAL_tfjs_2/
    ├── model.json
    ├── group1-shard1of3.bin
    ├── group1-shard2of3.bin
    └── group1-shard3of3.bin

## Cómo ejecutar el proyecto

Primero se debe descargar el proyecto desde GitHub o clonarlo utilizando:

git clone https://github.com/AndySauiro/El-Detector-Magico.git

Después se abre la carpeta del proyecto en Visual Studio Code.

Para ejecutar la aplicación se recomienda utilizar Live Server. Se abre el archivo index.html y se selecciona la opción "Open with Live Server".

Cuando se abra la aplicación en el navegador, se debe permitir el acceso a la cámara.

Finalmente, se presiona el botón "Activar cámara" y luego "Detectar objeto" para realizar la detección.

## Modelo

El modelo fue entrenado para reconocer ocho categorías de objetos. Después del entrenamiento fue convertido a TensorFlow.js para poder utilizarlo en la aplicación web.

Los archivos del modelo se encuentran dentro de la carpeta modelo_web_FINAL_tfjs_2.

## Autores

Andrés Caiza
Frank Cueva
Anderson Pachacama

Asignatura: Introducción a la Inteligencia Artificial

Docente: Ing. Danny Páez

Período académico: 2026
