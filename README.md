Decisiones técnicas:

1. Framework Web: Express
Paquete: express
Versión: ^4.21.1
Decisión técnica: Se ha elegido Express como el framework web para gestionar las rutas, controladores y la interacción con la base de datos. Express es un framework minimalista y flexible para Node.js, ampliamente utilizado por su simplicidad y facilidad de uso.
2. Base de Datos: MySQL
Paquete: mysql2
Versión: ^3.11.4
Decisión técnica: Se está utilizando MySQL como sistema de gestión de bases de datos, con el cliente mysql2, que es una librería popular para interactuar con bases de datos MySQL en Node.js, ofreciendo características como un mejor rendimiento y compatibilidad con promesas.
3. Middleware para Análisis de Cuerpo de Solicitudes: Body-Parser
Paquete: body-parser
Versión: ^1.20.3
Decisión técnica: Se ha decidido usar body-parser para analizar el cuerpo de las solicitudes HTTP, lo que permite manejar fácilmente los datos enviados en las solicitudes (como JSON) en las rutas de la API.
4. CORS (Cross-Origin Resource Sharing)
Paquete: cors
Versión: ^2.8.5
Decisión técnica: Se ha habilitado CORS (Cross-Origin Resource Sharing) en el backend para permitir que el servidor acepte solicitudes desde otros orígenes (por ejemplo, desde el frontend que corre en otro dominio o puerto). Esto es esencial cuando el frontend y el backend están en dominios diferentes durante el desarrollo.
5. Monitoreo y Reinicio Automático del Servidor: Nodemon
Paquete: nodemon
Versión: ^3.1.7
Decisión técnica: Se ha integrado Nodemon en el entorno de desarrollo para permitir que el servidor Node.js se reinicie automáticamente cada vez que se hagan cambios en los archivos del proyecto. Esto mejora la experiencia de desarrollo al eliminar la necesidad de reiniciar manualmente el servidor.
6. Gestión de Scripts
Decisión técnica: El archivo package.json incluye un script de inicio configurado con nodemon para que el servidor se reinicie automáticamente durante el desarrollo ("start": "nodemon server.js"). También hay un script de prueba definido, aunque no tiene un propósito específico en este momento ("test": "echo \"Error: no test specified\" && exit 1").
Resumen de las Decisiones Técnicas:
Express como framework web para la gestión de rutas y controladores.
MySQL2 como cliente de base de datos MySQL.
Body-parser para analizar el cuerpo de las solicitudes HTTP.
CORS habilitado para permitir solicitudes entre dominios.
Nodemon para reiniciar automáticamente el servidor durante el desarrollo.
Estas decisiones permiten construir una API robusta y eficiente para interactuar con una base de datos MySQL, con una configuración de desarrollo optimizada.

Cómo ejecutar el proyecto:


Para ejecutar el proyecto backend que utiliza Express y MySQL, sigue estos pasos:

1. Instalar las dependencias
Asegúrate de que tienes Node.js y npm (Node Package Manager) instalados en tu máquina. Si no los tienes, puedes descargarlos desde https://nodejs.org.

Una vez que tengas Node.js y npm instalados, navega a la carpeta del proyecto en tu terminal y ejecuta el siguiente comando para instalar todas las dependencias listadas en el archivo package.json:

npm install

Este comando descargará e instalará los siguientes paquetes:

express para manejar las rutas y servidores HTTP.
mysql2 para interactuar con la base de datos MySQL.
body-parser para analizar el cuerpo de las solicitudes HTTP.
cors para permitir solicitudes desde otros dominios.
nodemon para reiniciar automáticamente el servidor durante el desarrollo.

2. Configurar la base de datos MySQL
Asegúrate de tener una base de datos MySQL corriendo. Si aún no tienes MySQL instalado, puedes descargarlo desde MySQL Downloads.

Crear la base de datos: Según el archivo server.js, se está utilizando la base de datos task_test. Si aún no existe, puedes crearla ejecutando el siguiente comando en MySQL:

CREATE DATABASE task_test;
Configurar la tabla items: Asegúrate de tener la tabla items en la base de datos. Si no está, puedes crearla con una estructura simple:

CREATE TABLE task_test.items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150),
    description VARCHAR(150),
    status VARCHAR(150),
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL  
); 

3. Configurar la conexión a la base de datos
En el archivo server.js, la conexión a la base de datos está configurada con estos parámetros:
 
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // Cambia esto según tu configuración
  password: 'root',   // Cambia esto según tu configuración
  database: 'task_test'   // Asegúrate de que esta base de datos exista
});

Si tu base de datos MySQL está configurada con un usuario o contraseña diferente, modifica estos valores en el código antes de continuar.

4. Iniciar el servidor
Con las dependencias instaladas y la base de datos configurada, ahora puedes iniciar el servidor.

En la terminal, ejecuta el siguiente comando:

npm start

Este comando ejecuta el script definido en el archivo package.json:
 
"start": "nodemon server.js"
El comando Nodemon iniciará el servidor de Express y lo mantendrá en ejecución. Si haces cambios en el código, Nodemon reiniciará automáticamente el servidor.

Al iniciar el servidor, deberías ver un mensaje como este en la terminal:
 
Servidor corriendo en http://localhost:3001
Conectado a la base de datos MySQL
Esto indica que el servidor está corriendo en el puerto 3001 y que está conectado a la base de datos MySQL.

5. Probar el backend
Una vez que el servidor está en funcionamiento, puedes probar las rutas de la API utilizando herramientas como Postman o cURL.
 
Con estos pasos, el backend debería estar funcionando correctamente y listo para interactuar con el frontend o cualquier cliente que desee consumir la API.