# ADR-0007: El frontend se moderniza en React, no se migra a Angular

## Estado
Aceptado

## Contexto
El frontend actual es React 18 sobre Create React App. Se evaluó migrar completamente a Angular 21 como parte de la modernización.

## Decisión
El frontend se queda en React, pero se moderniza a fondo: migración de Create React App (deprecado por Meta) a Vite, actualización a la última versión estable de React, conversión de los componentes de clase pendientes a hooks, `AuthContext` real con rutas protegidas, y limpieza de la deuda técnica que se había inventariado durante el análisis (documentos de trabajo ya eliminados del árbol al completarse la migración — ver historial de git).

## Alternativas consideradas
- **Reescritura completa en Angular 21**: es la opción que se evaluó inicialmente. Se descartó porque implica reescribir ~40 componentes desde cero por un framework nuevo, multiplicando el esfuerzo de la fase 1 sin cambiar el resultado funcional o visual para el usuario final. Queda como opción abierta a futuro si la motivación (ej. mercado laboral orientado a Angular) pesa más que el costo de una reescritura total — en ese caso, se revisita como su propia iniciativa, no mezclada con el resto de esta modernización.

## Consecuencias
- Se conserva el ecosistema de dependencias actual (react-router, react-date-range, etc.), reduciendo el riesgo de la fase 1 frente a una reescritura total.
- El rebrand visual (Cesar Travel) se hace sobre los mismos componentes React modernizados, no sobre componentes nuevos de Angular.
