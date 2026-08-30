# El Detector Mágico

## Descripción

**El Detector Mágico** es una aplicación web capaz de reconocer diferentes objetos mediante la cámara del dispositivo.

El sistema utiliza un modelo de clasificación de imágenes desarrollado. El modelo fue entrenado para reconocer ocho categorías de objetos:

* Caja
* Celular
* Lentes
* Manzana
* Mouse
* Plátano
* Reloj
* Tijeras

El modelo entrenado fue convertido a un formato compatible con **TensorFlow.js**, permitiendo realizar las predicciones directamente desde el navegador.

### Descripción de los archivos

| Archivo                    | Descripción                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------- |
| `index.html`               | Contiene la estructura principal de la aplicación web.                                |
| `style.css`                | Contiene los estilos y diseño visual de la aplicación.                                |
| `app.js`                   | Contiene la lógica de la aplicación, el acceso a la cámara y la ejecución del modelo. |
| `modelo_web_FINAL_tfjs_2/` | Contiene el modelo convertido para ser utilizado con TensorFlow.js.                   |
| `model.json`               | Contiene la estructura del modelo y las referencias a sus pesos.                      |
| `*.bin`                    | Contienen los pesos necesarios para realizar las predicciones.                        |


## Cómo ejecutar el proyecto

### 1. Descargar o clonar el repositorio

Descarga el proyecto desde GitHub o utiliza Git:

```bash
git clone https://github.com/AndySauiro/El-Detector-Magico.git
```

Después ingresa a la carpeta del proyecto:

```bash
cd El-Detector-Magico
```

### 2. Ejecutar un servidor local

Debido al uso de la cámara y la carga del modelo, se recomienda ejecutar la aplicación mediante un servidor local.

Una opción sencilla es utilizar **Visual Studio Code** con la extensión **Live Server**.

Pasos:

1. Abrir la carpeta `El-Detector-Magico` en Visual Studio Code.
2. Instalar la extensión Live Server.
3. Abrir el archivo `index.html`.
4. Presionar **Go Live**.
5. La aplicación se abrirá automáticamente en el navegador.

También se puede utilizar cualquier otro servidor local compatible con archivos HTML, CSS y JavaScript.

---

## Uso de la aplicación

Una vez abierta la aplicación:

1. Esperar a que el modelo de Inteligencia Artificial se cargue.
2. Presionar el botón **Activar cámara**.
3. Permitir el acceso a la cámara cuando el navegador lo solicite.
4. Colocar uno de los objetos reconocidos frente a la cámara.
5. Presionar **Detectar objeto**.
6. La aplicación mostrará el objeto identificado y el porcentaje de confianza.
7. Presionar **Detener cámara** cuando se termine de utilizar la aplicación.

---

## Funcionamiento del sistema

El funcionamiento general de la aplicación es el siguiente:

```text
Cámara
   ↓
Captura de imagen
   ↓
Preprocesamiento
   ↓
TensorFlow.js
   ↓
Modelo MobileNetV2
   ↓
Predicción
   ↓
Objeto detectado
   ↓
Porcentaje de confianza
```

La imagen obtenida desde la cámara es redimensionada al tamaño requerido por el modelo antes de realizar la predicción.

El modelo genera probabilidades para las ocho categorías disponibles y la aplicación selecciona la categoría con el valor más alto.

---

## Categorías reconocidas

El modelo puede reconocer los siguientes objetos:

| Índice | Categoría |
| ------ | --------- |
| 0      | Caja      |
| 1      | Celular   |
| 2      | Lentes    |
| 3      | Manzana   |
| 4      | Mouse     |
| 5      | Plátano   |
| 6      | Reloj     |
| 7      | Tijeras   |

---

## Modelo de Inteligencia Artificial

El modelo fue desarrollado utilizando **Transfer Learning** con **MobileNetV2** como arquitectura base.

Posteriormente, el modelo fue convertido a TensorFlow.js para permitir su ejecución directamente desde el navegador.

El archivo `model.json` define la estructura del modelo, mientras que los archivos `.bin` contienen los pesos necesarios para realizar las predicciones.


## Autores

* Andrés Caiza
* Frank Cueva
* Anderson Pachacama
