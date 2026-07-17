-- chat-service — schema inicial (chat_db). Chat interno huésped↔dueño por inmueble
-- (reemplaza el contacto por WhatsApp — decisión del usuario por privacidad, ver ADR-0009).
--
-- Sin FKs a otros schemas (ver ADR-0001): product_id/guest_id/owner_id se validan en la app
-- (chat-service confirma el inmueble y su dueño contra property-service al abrir el chat).
-- Nombres y título denormalizados al crear la conversación: listar chats no llama a nadie.

CREATE TABLE conversation (
    id            BIGINT       AUTO_INCREMENT PRIMARY KEY,
    product_id    BIGINT       NOT NULL,
    product_title VARCHAR(255) NOT NULL,
    guest_id      BIGINT       NOT NULL,
    guest_name    VARCHAR(255) NOT NULL,
    owner_id      BIGINT       NOT NULL,
    owner_name    VARCHAR(255) NOT NULL,
    created_at    DATETIME     NOT NULL,
    CONSTRAINT uk_conversation_product_guest UNIQUE (product_id, guest_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE INDEX idx_conversation_guest ON conversation (guest_id);
CREATE INDEX idx_conversation_owner ON conversation (owner_id);

CREATE TABLE message (
    id              BIGINT        AUTO_INCREMENT PRIMARY KEY,
    conversation_id BIGINT        NOT NULL,
    sender_id       BIGINT        NOT NULL,
    body            VARCHAR(1000) NOT NULL,
    is_read         BOOLEAN       NOT NULL DEFAULT FALSE,
    created_at      DATETIME      NOT NULL,
    CONSTRAINT fk_message_conversation FOREIGN KEY (conversation_id) REFERENCES conversation (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE INDEX idx_message_conversation ON message (conversation_id);
