// "start": "npm run build && node dist/app.js"


# Clean Architecture

## Presentation
Todo lo que va a estar dentro de esta carpeta, va a ser lo más ``externo de nuestros círculos``, va a estar más cerca a los usuarios que van a terminar consumiendo nuestra API.

---

## Domain
En esta carpeta van a estar como las reglas que gobiernan la aplicación, se recomienda que el código que se coloque en esta carpeta no vaya a tener dependencias externas porque romperia el círulo o restricciones que debemos tener ya que los adaptadores entre otras cosas no deberian tener ingenencia aquí.

### Cracion de dtos
Son la estructura que nosotros queremos que tengan nuestras peticiones junto con sus respectivas validaciones

### Datasources
Aqui se van a crear las reglas de negocio de las cuales nos vamos a regir para la obtención de datos


### Repositories
Son los que se van a comunicar con nuestros ``datasources``

---

## Infrastructure
Es un punto intermedio entre los dos ``presentation`` y ``domain``.
Aqui se van a crear las implementaciones respectivas como los datasources, mappers


### datasources
Aqui se van a ``aplicar`` las reglas de negocio que hemos definido en ``domain``, aquí va la logica donde interactuamos con nuestra base de datos

### Repositories
Aquin se van a desenvoler los repositories que hemos difinido en domain, y solemos solicitar las abstracciones de los datasources

### Mappers
Son el puente entre la estructura de la base de datos y nuestra aplicacion, se encargan de transformar algo a nuestras identidades