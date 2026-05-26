# Análisis inicial del frontend

## Punto de entrada
- `src/App.js` concentra las rutas y el layout general.
- Hay imports sobrantes y una estructura que puede limpiarse sin cambiar el comportamiento.

## Estilos compartidos
- `src/sass/general.scss` funciona como base visual para gran parte del frontend.
- La base actual usa tipografía y colores correctos, pero el sistema visual es simple y puede modernizarse con variables y un fondo más consistente.

## Componentes sensibles
- `Header.jsx` usa acceso directo al DOM y `localStorage` dentro del render y del efecto.
- `Footer.jsx` tiene un nombre de función que no coincide con el componente exportado, aunque no rompe la app.

## Riesgo principal
- Cambios amplios en el header pueden alterar login, navegación y estado de usuario.
- Por eso conviene empezar por ajustes globales y de baja superficie.

## Revisión por componente

### Header
- Controla navegación, autenticación visual y menú móvil.
- Tiene lógica de visibilidad basada en `document.querySelector`, lo que duplica el estado de React.
- El test actual solo renderiza el componente y no verifica sesión, rutas ni menú responsive.
- Prioridad de mejora: reemplazar mutaciones directas por render condicional controlado por estado.

### Footer
- Su estructura es simple y es candidato para correcciones menores primero.
- El nombre de la función exportada debería alinearse con el componente para mejorar legibilidad.
- El archivo tiene pocos riesgos funcionales, así que es buen candidato para una limpieza mínima antes de tocar componentes más complejos.

### Body
- Es un contenedor de composición para `SearchBar`, `CategoryList` y `ProductList`.
- Su efecto sobre `prevUrl` alimenta flujos posteriores en `Login` y `Product`, así que no parece ser deuda aislada.
- El componente tiene poca lógica propia, por lo que el valor de cambio aquí es bajo en comparación con sus hijos.

### SearchBar
- Centraliza la selección de ciudad y fechas, así que tiene impacto directo en la navegación de búsqueda.
- El encabezado usa una combinación inválida de `h1` con `p`, lo que afecta la semántica del HTML.
- La carga de ciudades depende del backend y no muestra manejo de error o estado vacío.
- La acción principal navega mediante `HashLink`, por lo que conviene revisar bien que los parámetros armados coincidan con las rutas reales.

### CalendarInput
- Administra la selección de fechas y controla la cantidad de meses visibles según el ancho de pantalla.
- Registra un listener de `resize` en el montaje, pero no lo libera al desmontar el componente.
- Tiene lógica suficiente para un ajuste pequeño y seguro antes de refactorizar cualquier experiencia de calendario más amplia.

### CategoryList
- Consume la lista de categorías y la pinta sin lógica adicional compleja.
- Depende del backend para poblar la grilla, pero no introduce una deuda funcional evidente.
- Es un componente de bajo riesgo comparado con la búsqueda y los listados de productos.

### ProductList
- Hace shuffle de los productos en memoria antes de renderizarlos, lo que altera la respuesta original en lugar de trabajar sobre una copia.
- Maneja carga con una bandera extra (`ready`), lo que funciona pero agrega complejidad innecesaria.
- Es un buen candidato para una mejora pequeña de legibilidad y control de datos.

### Login
- Controla la autenticación y además decide el retorno después del login.
- Mezcla validación visual con `document.querySelector`, lo que hace el estado difícil de seguir.
- El botón principal está envuelto por un `Link` sin destino, lo que introduce una estructura semántica frágil.
- Tiene logs de depuración en producción y merece una limpieza antes de tocar el flujo de autenticación.

### Register
- Repite el patrón de validación imperativa con `document.querySelector`.
- El éxito de registro se controla ocultando el formulario y mostrando un bloque extra, en lugar de usar estado de React.
- Tiene reglas de validación directas y claras, pero la forma de mostrar errores y éxito merece una normalización.

### Product
- Es la pantalla de detalle y orquesta varios subcomponentes dependientes de datos remotos.
- El efecto que carga el producto solo corre al montar, así que si cambia el `id` sin desmontar, el contenido puede quedar desactualizado.
- Importa un archivo de datos que no usa, lo que indica limpieza pendiente.
- La lógica del detalle es el punto correcto para una revisión más cuidadosa antes de tocar los subcomponentes visuales.

### ProductCalendar
- Carga fechas reservadas y las combina con las fechas deshabilitadas base del calendario.
- El armado de `disabledDates` muta el array que vive en estado, así que una recarga puede duplicar fechas.
- La lógica depende de que `product` ya exista y de que el fetch responda sin errores, por lo que conviene cuidarla antes de ampliar la interacción.
