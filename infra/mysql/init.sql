-- Se ejecuta una sola vez, cuando el contenedor de MySQL arranca con un volumen de datos vacío
-- (comportamiento estándar de la imagen oficial de MySQL para todo lo que esté en
-- /docker-entrypoint-initdb.d/). Crea los 3 schemas de ADR-0001 y un usuario por servicio,
-- cada uno con permisos solo sobre su propio schema — ninguno puede tocar el de otro.
--
-- Las contraseñas de acá son de desarrollo local únicamente (ver .env.example) — nunca usar
-- estos valores fuera de un docker-compose local.

CREATE DATABASE IF NOT EXISTS auth_db;
CREATE DATABASE IF NOT EXISTS property_db;
CREATE DATABASE IF NOT EXISTS booking_db;
CREATE DATABASE IF NOT EXISTS chat_db;

CREATE USER IF NOT EXISTS 'auth_service'@'%' IDENTIFIED BY 'auth_service_pw';
GRANT ALL PRIVILEGES ON auth_db.* TO 'auth_service'@'%';

CREATE USER IF NOT EXISTS 'property_service'@'%' IDENTIFIED BY 'property_service_pw';
GRANT ALL PRIVILEGES ON property_db.* TO 'property_service'@'%';

CREATE USER IF NOT EXISTS 'booking_service'@'%' IDENTIFIED BY 'booking_service_pw';
GRANT ALL PRIVILEGES ON booking_db.* TO 'booking_service'@'%';

CREATE USER IF NOT EXISTS 'chat_service'@'%' IDENTIFIED BY 'chat_service_pw';
GRANT ALL PRIVILEGES ON chat_db.* TO 'chat_service'@'%';

FLUSH PRIVILEGES;
