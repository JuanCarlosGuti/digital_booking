-- Reseñas de inmuebles. Viven en booking_db (no en property_db) porque la regla de negocio
-- "solo puede reseñar quien tuvo una reserva ya finalizada" se valida con un query local a
-- reservation — en property-service obligaría a una llamada property→booking, invirtiendo la
-- dirección de dependencia actual (booking→property).
--
-- Sin FK física a product (otro schema, ver ADR-0001): la existencia de la reserva previa ya
-- garantiza que el producto existía. reviewer_name va denormalizado (tomado de los claims del
-- JWT al crear) para listar reseñas sin N llamadas a auth-service.
CREATE TABLE review (
    id            BIGINT        AUTO_INCREMENT PRIMARY KEY,
    product_id    BIGINT        NOT NULL,
    user_id       BIGINT        NOT NULL,
    rating        INT           NOT NULL,
    comment       VARCHAR(1000) NULL,
    reviewer_name VARCHAR(255)  NOT NULL,
    created_at    DATETIME      NOT NULL,
    CONSTRAINT uk_review_product_user UNIQUE (product_id, user_id),
    CONSTRAINT ck_review_rating CHECK (rating BETWEEN 1 AND 5)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE INDEX idx_review_product ON review (product_id);
