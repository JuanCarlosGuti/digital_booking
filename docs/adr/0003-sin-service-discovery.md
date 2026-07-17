# ADR-0003: Sin service discovery (Eureka) — rutas estáticas en el gateway

## Estado
Aceptado

## Contexto
Con varios servicios backend, hace falta que el frontend (a través del gateway) y los servicios entre sí sepan dónde encontrarse.

## Decisión
`api-gateway` (Spring Cloud Gateway) usa rutas **estáticas** definidas en su `application.yml` (`/api/auth/**`, `/api/properties/**`, `/api/bookings/**`). En desarrollo local, el DNS interno de Docker Compose ya resuelve los nombres de servicio (`http://auth-service:8081`, `http://property-service:8082`, etc.) sin necesitar un registro dinámico.

## Alternativas consideradas
- **Eureka / Consul (service discovery dinámico)**: útil cuando el número de instancias por servicio escala horizontalmente y cambia en runtime (autoscaling). Con 4 servicios de instancia única en Compose, agregar un servidor de registro es complejidad operativa sin beneficio real hoy.

## Consecuencias
- Si más adelante se despliega con autoscaling real (más de una instancia por servicio, IPs que cambian), esta decisión se revisita — es la señal concreta para introducir Eureka/Consul o pasar a un orquestador con service mesh (ej. Kubernetes + su propio DNS de servicio), no antes.
