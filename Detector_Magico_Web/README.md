# El Detector Mágico

El Detector Mágico es una aplicación web que utiliza Inteligencia Artificial para reconocer objetos mediante la cámara del dispositivo.

El modelo fue desarrollado utilizando Transfer Learning con MobileNetV2 y posteriormente convertido a TensorFlow.js para poder utilizarlo directamente en el navegador.

## Objetos que reconoce

* Caja
* Celular
* Lentes
* Manzana
* Mouse
* Plátano
* Reloj
* Tijeras

## Tecnologías utilizadas

* Python
* TensorFlow
* Keras
* MobileNetV2
* TensorFlow.js
* HTML
* CSS
* JavaScript
* Google Colab

## Estructura del proyecto

```text
El-Detector-Magico/
│
├── index.html
├── style.css
├── app.js
├── README.md
│
└── modelo_web_FINAL_tfjs_2/
    ├── model.json
    ├── group1-shard1of3.bin
    ├── group1-shard2of3.bin
    └── group1-shard3of3.bin
```

## Cómo ejecutar

1. Descargar el proyecto o clonarlo desde GitHub.

```bash
git clone https://github.com/AndySauiro/El-Detector-Magico.git
```

2. Abrir la carpeta del proyecto en Visual Studio Code.

3. Ejecutar el archivo `index.html` utilizando un servidor local, por ejemplo, Live Server.

4. Abrir la aplicación en el navegador.

5. Permitir el acceso a la cámara.

6. Presionar **Activar cámara** y luego **Detectar objeto**.

## Modelo

El modelo utilizado fue entrenado con ocho categorías de objetos y posteriormente convertido a TensorFlow.js.

Los archivos del modelo se encuentran en:

```text
modelo_web_FINAL_tfjs_2/
```

## Autores

Andrés Caiza
Frank Cueva
Anderson Pachacama

**Asignatura:** Introducción a la Inteligencia Artificial
**Docente:** Ing. Danny Páez
**Período:** 2026
