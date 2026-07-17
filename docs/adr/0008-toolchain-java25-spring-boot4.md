# ADR-0008: Notas de toolchain — Java 25 + Spring Boot 4.1 + Maven 3.9

## Estado
Aceptado (documenta hallazgos reales de construir `auth-service`, `property-service`, `booking-service` y `api-gateway`, no decisiones de diseño de negocio). Todos los hallazgos de este documento están **resueltos** en el código actual — queda como referencia para `notification-service` y para no repetir la misma investigación.

## Contexto
Al construir los primeros cuatro microservicios sobre Java 25 / Spring Boot 4.1.0 / Maven wrapper 3.9.16 aparecieron varias fallas concretas que costaron tiempo de debugging porque el síntoma no apuntaba a la causa real. Quedan documentadas acá para que no se repita la investigación en `notification-service`, y para dejar explícito qué es "así funciona Spring Boot 4 ahora" (permanente) versus "workaround a revisar más adelante" (temporal).

## Hallazgo 1 — Lombok no genera código, sin error (temporal, a revisar)

**Síntoma:** `mvn compile` fallaba con `cannot find symbol` en cada getter/setter esperado de una clase anotada con `@Getter`/`@Setter` de Lombok 1.18.46. La anotación processing corría sin errores ni warnings — Lombok simplemente no generaba nada.

**Causa probable:** Lombok todavía no parchea correctamente los internals del compilador de JDK 25 (no confirmado con certeza, no se investigó más a fondo).

**Decisión tomada:** se sacó Lombok por completo de los tres servicios. Entidades JPA con getters/setters escritos a mano; DTOs como `record` de Java (no necesitan generación de código).

**Cuándo revisar esto:** si una versión de Lombok más nueva que 1.18.46 declara soporte explícito para Java 25, vale la pena reintentarlo con una clase de prueba aislada antes de reintroducirlo en un servicio completo. Mientras tanto, **no usar Lombok en `notification-service` ni `api-gateway`**.

## Hallazgo 2 — Spring Boot 4 partió varias autoconfiguraciones en módulos aparte (permanente, no es un bug)

**Síntoma A (Flyway):** con `flyway-core` + `flyway-mysql` en el `pom.xml`, las migraciones nunca corrían (cero líneas de log de Flyway) y la app fallaba recién al validar el schema de Hibernate con `SchemaManagementException: missing table [roles]` — un error que parece "la migración no corrió bien", cuando en realidad Flyway ni se había activado.

**Síntoma B (RestClient):** al inyectar `RestClient.Builder` en `booking-service` para llamar a property-service, el arranque fallaba con `No qualifying bean of type 'org.springframework.web.client.RestClient$Builder'`, a pesar de tener `spring-boot-starter-web`.

**Causa real:** a partir de Spring Boot 4, varias autoconfiguraciones que antes venían incluidas en un starter "de siempre" ahora son módulos Maven separados que hay que declarar explícitamente:
- `org.springframework.boot:spring-boot-flyway`
- `org.springframework.boot:spring-boot-restclient`

Ambos son artefactos reales publicados en Maven Central, versionados igual que Spring Boot (ej. `4.1.0`).

**Decisión tomada:** agregar el módulo explícito correspondiente apenas se usa una feature que antes "venía gratis" — ya aplicado en `auth-service`/`property-service` (Flyway) y `booking-service` (Flyway + RestClient).

**Cómo aplicarlo de acá en adelante:** antes de asumir que un starter de Spring Boot 3.x sigue trayendo todo en Spring Boot 4, chequear si existe un módulo `org.springframework.boot:spring-boot-<feature>` dedicado:

```bash
curl -s https://repo.maven.apache.org/maven2/org/springframework/boot/spring-boot-<feature>/maven-metadata.xml
```

Esto **no es deuda técnica ni un workaround a revertir** — es cómo Spring Boot 4 está diseñado ahora (más modular). No hace falta "volver" a nada; simplemente hay que declarar la dependencia correcta la primera vez.

## Hallazgo 3 — Spring Cloud Gateway Server MVC es nuevo y su documentación pública es escasa

Al construir `api-gateway` con `spring-cloud-starter-gateway-server-webmvc:5.0.2` (la variante MVC/servlet del gateway, no la reactiva — ver ADR-0003), no había forma confiable de adivinar el shape exacto de la configuración YAML (`spring.cloud.gateway.server.webmvc.routes`) ni la API funcional Java (`GatewayRouterFunctions`, `HandlerFunctions`, `BeforeFilterFunctions.uri(...)`) solo a partir de lo conocido del gateway reactivo clásico — son paquetes y convenciones distintas.

**Qué funcionó:** en vez de adivinar y iterar a fuerza de errores de arranque, se extrajo el `.jar` ya descargado en el repositorio Maven local y se inspeccionaron sus clases con `javap -p` directamente (`unzip` del `.class` + `javap`) para confirmar los métodos y firmas reales antes de escribir una sola línea de código. Con eso, `GatewayRoutesConfig.java` compiló y funcionó a la primera, sin ciclos de prueba y error.

**Cómo aplicarlo:** cuando se use una librería nueva o poco documentada (o una versión muy reciente cuya documentación pública todavía no está actualizada), preferir inspeccionar el `.jar` real con `javap` antes de escribir código a partir de memoria o de suposiciones — más rápido y más confiable que iterar contra errores de compilación/arranque.

## Hallazgo 4 — No hay un bean `com.fasterxml.jackson.databind.ObjectMapper` inyectable por defecto (permanente)

**Síntoma:** al inyectar `ObjectMapper` por constructor en `RestAuthenticationEntryPoint`/`RestAccessDeniedHandler` (clases de seguridad que escriben JSON a mano en el `HttpServletResponse`, fuera del ciclo normal de Spring MVC), el arranque fallaba con `No qualifying bean of type 'com.fasterxml.jackson.databind.ObjectMapper' available`, en los tres servicios.

**Causa real:** Spring Boot 4 / Spring Framework 7 migraron su serialización interna a Jackson 3 (paquete `tools.jackson.*`, ver los métodos `JsonMapperBuilderCustomizer` en `JacksonAutoConfiguration`), y ya no exponen automáticamente un bean del `ObjectMapper` clásico de Jackson 2 (`com.fasterxml.jackson.databind`) para inyectar — aunque Jackson 2 sigue en el classpath (lo traen `jjwt-jackson` y `springdoc`, que todavía no migraron a Jackson 3).

**Decisión tomada:** en vez de perseguir cuál es el bean/tipo exacto que Spring Boot 4 expone ahora, estas clases dejaron de depender de un `ObjectMapper` inyectado — usan uno propio (`private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();`). Es apropiado acá porque solo serializan un mapa plano de 4 campos y viven fuera del ciclo de vida de Spring MVC de todos modos (son `AuthenticationEntryPoint`/`AccessDeniedHandler`, no controllers).

**Cómo aplicarlo:** para clases que escriben JSON a mano fuera de un `@RestController` (filtros, entry points, handlers de seguridad), no asumir que un `ObjectMapper` de Spring va a estar disponible para inyectar en Spring Boot 4 — instanciar uno propio si el JSON a serializar es simple. Si en algún momento hace falta el `ObjectMapper` *configurado por la app* (con los mismos módulos/formato que usan los controllers), investigar primero cuál es el bean real que expone `JacksonAutoConfiguration` en vez de asumir el nombre clásico.

## Hallazgo 5 — Sin `AuthenticationEntryPoint`/`AccessDeniedHandler` propios, todo error de auth da 403 (no es un bug de Spring Boot, era nuestro)

**Síntoma:** tanto "no mandaste token" como "tu token es válido pero no tenés permiso" devolvían 403 Forbidden. Lo correcto en una API REST es 401 Unauthorized para lo primero (falta o es inválida la credencial) y 403 para lo segundo (hay sesión pero no alcanza) — Spring Security, sin un `AuthenticationEntryPoint` configurado, cae al comportamiento por defecto (`Http403ForbiddenEntryPoint`), que no distingue los dos casos.

**Decisión tomada:** se agregó `RestAuthenticationEntryPoint` (401) y `RestAccessDeniedHandler` (403) en los tres servicios, registrados vía `.exceptionHandling(...)` en cada `SecurityFilterChain`, con el mismo formato de cuerpo de error que usa cada `GlobalExceptionHandler`.

**Por qué importa para el frontend:** cuando se construya el frontend, un 401 debería disparar "llevar al login" y un 403 debería mostrar "no tenés permiso" — si ambos casos devuelven el mismo código, esa distinción de UX no se puede hacer sin inspeccionar el mensaje.

## Hallazgo 6 — Usuario en memoria autogenerado en servicios sin login propio (permanente, específico de este proyecto)

**Síntoma:** `property-service` y `booking-service` (que solo *validan* JWTs, nunca autentican por usuario/contraseña) imprimían en el log al arrancar `Using generated security password: <uuid>` — `spring-boot-starter-security` crea un usuario en memoria con contraseña aleatoria por defecto cuando no encuentra ningún `AuthenticationProvider`/`UserDetailsService`/`AuthenticationManager` bean propio, sin importar que el servicio nunca lo vaya a usar.

**Decisión tomada:** se excluyó `org.springframework.boot.security.autoconfigure.UserDetailsServiceAutoConfiguration` en `@SpringBootApplication` de ambos servicios — el paquete real de esta clase también cambió en Spring Boot 4 (antes `org.springframework.boot.autoconfigure.security.servlet`, ahora `org.springframework.boot.security.autoconfigure`), confirmado inspeccionando el jar con `javap` en vez de adivinar.

## Hallazgo 7 — booking-service no validaba solapamiento de fechas (deuda de negocio, ya resuelta)

Reportado inicialmente como paridad aceptable con el monolito original (que tampoco lo validaba). Se resolvió agregando `ReservationRepository.findOverlapping(...)` (rango `[checkIn, checkOut)`, `checkOut` exclusivo) y devolviendo `409 Conflict` si hay solape. **Limitación residual:** la validación no es a prueba de condiciones de carrera — dos requests concurrentes para las mismas fechas podrían pasar la validación antes de que cualquiera de las dos haga commit. Cubre el caso común; un lock pesimista o una constraint a nivel de base queda pendiente para cuando el volumen de reservas simultáneas lo justifique (documentado también en el código y en `backend/services/booking-service/README.md`).

## Consecuencias
- `notification-service` debe arrancar sin Lombok en el `pom.xml`, y si expone endpoints propios, replicar el patrón de `RestAuthenticationEntryPoint`/`RestAccessDeniedHandler` con `ObjectMapper` propio (no inyectado) y excluir `UserDetailsServiceAutoConfiguration` si no hace login por usuario/contraseña.
- Antes de agregar cualquier dependencia de Spring Boot que se use vía autoconfiguración implícita (scheduling, WebClient, mail, etc.), verificar si necesita su módulo `spring-boot-<feature>` explícito.
- Ante cualquier API de una versión muy nueva de una librería (Spring Cloud Gateway MVC fue el caso acá), preferir `javap` sobre el jar real antes de escribir código a ciegas.
- No asumir que Spring Boot expone un `ObjectMapper` de Jackson 2 inyectable — confirmar antes de depender de uno.
