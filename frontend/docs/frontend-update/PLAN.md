# Plan de trabajo - actualización del frontend

## Objetivo
Revisar el frontend paso por paso, documentar el estado actual y preparar una actualización segura y progresiva sin romper el comportamiento existente.

## Alcance inicial
- Revisar la estructura general del frontend.
- Detectar deuda técnica visible en la entrada principal de la app.
- Revisar el sistema global de estilos.
- Identificar cambios pequeños y de bajo riesgo antes de modificar componentes más sensibles.

## Hallazgos iniciales
- `App.js` tiene imports sobrantes y una estructura de rutas que puede simplificarse.
- El estilo global vive en `src/sass/general.scss` y puede modernizarse sin tocar cada componente individual.
- Hay componentes con patrones antiguos de estado y acceso directo al DOM, pero eso se revisará después de esta primera pasada.

## Secuencia de revisión
1. Confirmar el punto de entrada y el layout global.
2. Revisar estilos compartidos y variables globales.
3. Revisar componentes principales visibles en navegación y autenticación.
4. Definir cambios mínimos y seguros.
5. Implementar cambios de forma incremental.
6. Validar con build y tests focalizados.

## Próximo paso
Antes de editar código, revisaré los archivos clave uno por uno y documentaré qué cambio propuesto responde a cada hallazgo.
