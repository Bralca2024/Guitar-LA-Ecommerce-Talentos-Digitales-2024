## Breve explicación

Este es un proyecto de eCommerce de guitarras que permite a los usuarios explorar y comprar una amplia variedad de guitarras. La plataforma ofrece funciones como filtrado de productos por precio, adición al carrito y pagos seguros, lo que facilita una experiencia de compra fluida y confiable.
Además, el sitio cuenta con un blog que incluye guías de compra, reseñas, tutoriales y noticias musicales, ayudando a los usuarios a tomar decisiones informadas y a conectarse con la comunidad de guitarristas. Los administradores pueden gestionar el contenido del sitio, asegurando que la información esté siempre actualizada.

## Clonar repositorio

Para comenzar a trabajar con este proyecto, sigue los siguientes pasos para clonar el repositorio:

### 1. Copia la URL del Repositorio

- Ve a la página del repositorio en GitHub.
- Haz clic en el botón **Code**.
- Copia la URL del repositorio.

### 2. Abre tu Terminal

- Si estás en **Windows**, puedes usar Git Bash o cualquier terminal compatible con Git.
- En **macOS** y **Linux**, puedes usar la terminal predeterminada.

### 3. Escribe el Comando para Clonar

- En la terminal, navega hasta el directorio donde deseas clonar el repositorio. Por ejemplo:
  ```bash
  cd "C:\Users\Usuario\Desktop\GitHub Clone"
  ```
- Usa el siguiente comando, reemplanzando la URL_DEL_REPOSITORIO por la URL que copiaste:

```bash
  `git clone URL_DEL_REPOSITORIO`
```

### 4.- Accede al repositorio clonado

- Después de clonar, ingresa al directorio del proyecto clonado con el comando:

```bash
`cd "nombre_del_repositorio"`
```

Una vez dentro del directorio, puedes comenzar a trabajar con el proyecto y utilizar otros comandos de Git para gestionar el código.

## Instalar dependencias

Estos son los pasos a seguir para instalar todas las dependencias necesarias para que el proyecto se ejecute adecuadamente.

### 1. Abrir el Proyecto en tu Editor de Código

- Si utilizas **Visual Studio Code (VSCode)**, puedes abrir el editor y arrastrar la carpeta del proyecto seleccionado directamente a la ventana del editor.

- Otra forma de hacerlo es acceder a la carpeta donde está ubicado el proyecto. Selecciona la ruta correspondiente y escribe `cmd` en la barra de direcciones del explorador de archivos. Esto abrirá la terminal en esa ubicación. Una vez abierta la terminal, simplemente escribe el siguiente comando:
  ```bash
  code .
  ```

### 2. Abrir la terminal

- Una vez dentro del editor, accede a la terminal. Para ello, localízate en la parte superior de VSCode y haz clic en el menú `...`. Selecciona la opción `Terminal > Nueva Terminal`.

- Otra opción más práctica es utilizar el atajo de teclado `Ctrl + Shift + ñ`.

- Es importante tener en cuenta que debes repetir este proceso dos veces, ya que las dependencias se instalarán tanto en el backend como en el frontend.

### 3. Ubicar e instalar las dependencias

- Primero, ubica la carpeta del frontend con el siguiente comando:

```bash
  cd frontend
```

- Abre otra terminal y repite el mismo proceso para acceder a la carpeta del backend:

```bash
  cd backend
```

- Una vez que hayas realizado los pasos anteriores en ambas terminales, simplemente instala los paquetes necesarios ejecutando el siguiente comando en cada una de ellas:

```bash
  npm i
```

## Configuración de las Variables de Entorno

Para que el sitio funcione correctamente, es necesario configurar adecuadamente las variables de entorno.

### Uso de Cloudinary para Alojar Imágenes

Este proyecto utiliza **Cloudinary** como servicio de alojamiento de imágenes. Cloudinary permite cargar, almacenar y optimizar imágenes de manera eficiente, mejorando la velocidad de carga y la gestión del contenido visual. Para utilizarlo, necesitas crear una cuenta en Cloudinary y obtener las credenciales necesarias, que deben incluirse en el archivo `.env`.

### Accede a la Raíz del Backend

- En primera instancia, localízate en la carpeta del backend y crea el archivo `.env` correspondiente. Este archivo debe contener los siguientes datos:

```bash
  PORT=3000 # Puerto en el que se ejecuta el backend
  ATLAS_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database_name> # URI de conexión a MongoDB
  CLOUD_NAME=your_cloud_name # Identificador de la cuenta
  CLOUD_API_KEY=your_api_key # Clave pública que permite la autenticación
  CLOUD_API_SECRET=your_api_secret # Clave privada que autentica de manera segura tu aplicación
  GOOGLE_CLIENT_ID=1066042711336-lvg9d3i38dlr2nedmeq39410qrpmrk9p.apps.googleusercontent.com
  GOOGLE_CLIENT_SECRET=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
```

### Accede a la Raíz del Frontend

- Repite el paso anterior y crea el .env en la carpeta del Frontend. Este archivo simplemente contará con los siguientes datos.

```bash
VITE_BASE_URL=http://localhost:3000/api # URL Base para las peticiones API
```
