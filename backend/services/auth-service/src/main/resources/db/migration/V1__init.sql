-- auth-service — schema inicial (auth_db)

CREATE TABLE roles (
    id   BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    CONSTRAINT uk_roles_name UNIQUE (name)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE users (
    id       BIGINT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(120) NOT NULL,
    lastname VARCHAR(120) NOT NULL,
    email    VARCHAR(190) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role_id  BIGINT       NOT NULL,
    CONSTRAINT uk_users_email UNIQUE (email),
    CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO roles (name) VALUES ('USER'), ('ADMIN');

-- Usuario admin semilla (id=1): property-service usa este id para el backfill de
-- Product.owner_id de las propiedades existentes del monolito (ver ADR-0004).
-- Contraseña de desarrollo: "CesarTravel#2026" — cambiarla antes de cualquier uso real.
INSERT INTO users (name, lastname, email, password, role_id)
VALUES ('Admin', 'CesarTravel', 'admin@cesartravel.co',
        '$2b$10$foEcw.3OCDQFyPKgiZ4/jekuYIGO551h3EVTcauZylA2n9CXjg9o2',
        (SELECT id FROM roles WHERE name = 'ADMIN'));
