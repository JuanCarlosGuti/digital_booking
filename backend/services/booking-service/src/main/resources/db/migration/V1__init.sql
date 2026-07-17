-- booking-service — schema inicial (booking_db)
-- Sin FKs físicas a product_id (property_db) ni user_id (auth_db) — cross-schema, ver ADR-0001.
-- El dump original (ddbb/sprint 3/backend_integrador4.sql) tenía la tabla `reservation` vacía,
-- así que no hay datos que migrar acá, solo el esquema.

CREATE TABLE reservation (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    check_in   DATE   NOT NULL,
    check_out  DATE   NOT NULL,
    product_id BIGINT NOT NULL,
    user_id    BIGINT NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE INDEX idx_reservation_product ON reservation (product_id);
CREATE INDEX idx_reservation_user ON reservation (user_id);
