FROM eclipse-temurin:25-jdk AS build
WORKDIR /app

COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw && ./mvnw -B dependency:resolve dependency:resolve-plugins

COPY src ./src
RUN ./mvnw -B clean package -DskipTests

FROM eclipse-temurin:25-jre AS runtime
WORKDIR /app
RUN useradd --system --create-home --shell /usr/sbin/nologin appuser \
    && mkdir -p /data/uploads \
    && chown -R appuser:appuser /data/uploads
USER appuser

COPY --from=build /app/target/property-service-*.jar app.jar

EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
