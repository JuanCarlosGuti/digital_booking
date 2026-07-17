-- property-service — schema inicial (property_db)

CREATE TABLE category (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255),
    description VARCHAR(255),
    image_url   VARCHAR(255)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- Municipio + departamento: el alcance de la plataforma es local/departamental (Cesar y
-- La Guajira), no internacional. latitude/longitude son del municipio (para el mapa del detalle).
CREATE TABLE city (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    city       VARCHAR(255),
    department VARCHAR(255),
    latitude   DOUBLE NULL,
    longitude  DOUBLE NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE feature (
    id             BIGINT AUTO_INCREMENT PRIMARY KEY,
    name           VARCHAR(255),
    reference_icon VARCHAR(255)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE product (
    id                   BIGINT AUTO_INCREMENT PRIMARY KEY,
    title                VARCHAR(255),
    description          VARCHAR(1000),
    address              VARCHAR(255),
    room_number          INT,
    number_of_bathrooms  INT,
    extra_description_1  VARCHAR(255),
    extra_description_2  VARCHAR(255),
    extra_description_3  VARCHAR(255),
    -- Sin FK física a auth_db.users (schema distinto, ver ADR-0001 y ADR-0004) — se valida en la app.
    owner_id             BIGINT NULL,
    category_id          BIGINT NOT NULL,
    city_id              BIGINT NOT NULL,
    CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES category (id),
    CONSTRAINT fk_product_city FOREIGN KEY (city_id) REFERENCES city (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE INDEX idx_product_owner ON product (owner_id);

CREATE TABLE product_feature (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    feature_id  BIGINT NOT NULL,
    product_id  BIGINT NOT NULL,
    CONSTRAINT fk_product_feature_feature FOREIGN KEY (feature_id) REFERENCES feature (id),
    CONSTRAINT fk_product_feature_product FOREIGN KEY (product_id) REFERENCES product (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE image (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    title      VARCHAR(255),
    url        VARCHAR(500),
    product_id BIGINT NOT NULL,
    CONSTRAINT fk_image_product FOREIGN KEY (product_id) REFERENCES product (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
