# Cambios propuestos

## Fase 1 - limpieza segura
- Simplificar `src/App.js`.
- Quitar imports innecesarios.
- Encapsular las rutas dentro de un contenedor semántico.

## Fase 2 - actualización visual global
- Modernizar `src/sass/general.scss`.
- Introducir variables visuales de alcance global.
- Mejorar tipografía, contraste y fondo base.

## Fase 3 - revisión de estado y navegación
- Revisar `Header.jsx` para reducir mutaciones directas del DOM.
- Validar que login, logout y navegación móvil sigan funcionando.

## Orden de trabajo por componente
1. `Header`: documentar y decidir si se refactoriza la visibilidad de sesión.
2. `Footer`: limpiar nombres y detalles menores.
3. `Body` y componentes principales: revisar estructura y consistencia visual.
4. Componentes de búsqueda, producto y reservas: validar flujo y cobertura.

## Cambio mínimo definido para Footer
- Renombrar la función exportada a `Footer`.
- Retirar comentarios y mantener el archivo más claro.

## Cambio mínimo definido para Body
- No refactorizarlo por ahora.
- Revisarlo solo si se ajusta la forma en que `prevUrl` se comparte con `Login` y `Product`.

## Cambio mínimo definido para SearchBar
- Corregir la semántica del título.
- Agregar manejo básico de error o estado vacío para la carga de ciudades.
- Verificar que las rutas generadas sigan coincidiendo con el enrutado de `App.js`.

## Cambio mínimo definido para CalendarInput
- Agregar limpieza del listener de `resize`.
- Mantener la lógica de fechas actual, sin cambiar el formato de salida por ahora.

## Cambio mínimo definido para CategoryList
- No tocarlo todavía.

## Cambio mínimo definido para ProductList
- Hacer shuffle sobre una copia de la lista.
- Simplificar la lógica de carga si no cambia el comportamiento visible.

## Cambio mínimo definido para Login
- Quitar el `Link` envolvente del botón de submit.
- Cambiar la validación de errores a estado controlado por React.
- Eliminar logs de depuración y accesos directos al DOM.

## Cambio mínimo definido para Register
- Reemplazar la manipulación directa del DOM por estado de React.
- Mostrar error y éxito con render condicional en lugar de clases ocultas.

## Cambio mínimo definido para Product
- Hacer que la carga dependa del `id` de la ruta.
- Quitar imports que no se usan.

## Cambio mínimo definido para ProductCalendar
- Evitar la mutación directa del array de fechas deshabilitadas.
- Revisar la acumulación de fechas si el producto cambia.

## Fase 4 - validación
- Ejecutar build del frontend.
- Ejecutar tests focalizados si el cambio toca componentes cubiertos.
