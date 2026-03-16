# Clean Architecture

## Presentation
Todo lo que va a estar dentro de esta carpeta va a ser lo más `externo de nuestros círculos`. Es la capa que está más cerca a los usuarios o clientes que van a terminar consumiendo nuestra API (por ejemplo, los controladores y las rutas HTTP). Aquí se recibe la petición y se envía la respuesta, pero no se toma ninguna decisión de negocio.

---

## Application
Esta capa es la directora de orquesta de nuestra aplicación. Aquí residen los **Casos de Uso** (Use Cases) o servicios.
* Recibe las peticiones filtradas por la capa de `Presentation`, ejecuta los pasos lógicos de la aplicación y se comunica con la capa de `Domain` para hacer cumplir las reglas.
* Un caso de uso debe representar una acción o intención específica del sistema, con nombres claros como `CreateUserUseCase`.

---

## Domain
En esta carpeta van a estar las reglas núcleo que gobiernan la aplicación (Entidades o reglas empresariales). Se recomienda estrictamente que el código que se coloque en esta carpeta **no vaya a tener dependencias externas** (ni frameworks, ni bases de datos) porque rompería el círculo de restricciones. Es el corazón de tu software.

### DTOs (Data Transfer Objects)
Son la estructura que nosotros queremos que tengan nuestras peticiones de entrada o salida, junto con sus respectivas validaciones. Garantizan que a nuestros casos de uso solo llegue información limpia y correcta.

### Datasources
Aquí se van a crear los contratos (interfaces o clases abstractas) de las cuales nos vamos a regir para la obtención de datos. Definimos **qué** necesitamos, pero no el cómo se consigue.

### Repositories
Son los contratos que la capa de `Application` va a utilizar para comunicarse con nuestros `datasources`. Al igual que los anteriores, aquí solo definimos las firmas de los métodos.

---

## Infrastructure
Es un punto intermedio entre `Presentation` y `Domain`. Aquí se van a crear las implementaciones reales de los contratos que definimos en `Domain`. Si mañana cambiamos de base de datos o de proveedor de correos, solo tocamos esta carpeta.

### Datasources
Aquí se van a implementar las reglas de obtención de datos que hemos definido en `Domain`. Aquí va la lógica dura donde interactuamos con nuestra base de datos o APIs externas.

### Repositories
Aquí se van a desenvolver los repositorios que hemos definido en `Domain`. Suelen solicitar las abstracciones de los datasources mediante inyección de dependencias para coordinar la persistencia de la información.

### Mappers
Son el puente entre la estructura de la base de datos y nuestra aplicación. Se encargan de transformar algo "crudo" (como un registro de base de datos) a nuestras Entidades limpias de `Domain`, asegurando que el resto de la aplicación trabaje con objetos puros.

---

## Principio de Inyección de Dependencias
Para mantener el código limpio y desacoplado, **nuestro código no debe apuntar a clases concretas, sino a sus interfaces (abstracciones)**.

* **El problema:** Si un caso de uso instancia directamente algo como `new PostgresUserRepository()`, nuestra lógica central queda atada a esa tecnología específica.
* **La solución:** La capa de `Application` solo exige una interfaz (ej. `IUserRepository`). La capa de `Infrastructure` crea la clase concreta. Luego, al arrancar la aplicación, "inyectamos" esa clase en el caso de uso. ¡Así logramos que el centro de la aplicación no sepa qué base de datos estamos usando!