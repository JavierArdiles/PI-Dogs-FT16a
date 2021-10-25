<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Dogs

<p align="left">
  <img height="200" src="./dog.png" />
</p>


## Comenzando

Para poder ver el proyecto en ejecución:

 1. Forkear el repositorio para tener una copia del mismo en tu cuenta.
 2. Clonar el repositorio en tu computadora.
 3. En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:
    ```
    DB_USER=usuariodepostgres
    DB_PASSWORD=passwordDePostgres
    DB_HOST=localhost
    YOUR_API_KEY=4ef3b90f-ab14-4a75-9545-89c5bc01ef5a
    ```
    Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).
    Adicionalmente será necesario que crees desde psql una base de datos llamada `dogs`.
 4. Una vez completado este paso, desde la consola, y parado en la carpeta <strong>'api'</strong>, correr los comandos ```npm i``` o ```npm install``` para instalar las dependencias. Luego, ```npm start``` para levantar la base de datos y correr el Back-end.
 5. Repetir los comandos en otra consola, pero parado en la carpeta <strong>'client'</strong>.
 6. El proyecto debería estarse corriendo en tu <em>localhost:3000</em> en tu navegador.

## Enunciado

La idea general es crear una aplicación en la cual se puedan ver distintas razas de perro junto con información relevante de las mismas utilizando la api externa [the dog api](https://thedogapi.com/) y a partir de ella poder, entre otras cosas:

  - Buscar perros
  - Filtrarlos / Ordenarlos
  - Agregar nuevos perros



#### Tecnologías utilizadas:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

