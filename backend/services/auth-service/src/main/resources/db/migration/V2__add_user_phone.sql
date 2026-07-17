-- Teléfono opcional del usuario — habilita el botón "Contactar por WhatsApp" en el detalle
-- de un inmueble (celular colombiano de 10 dígitos, formato 3XXXXXXXXX; el frontend arma
-- https://wa.me/57{phone}). Nullable a propósito: sin teléfono, el botón no aparece.
ALTER TABLE users ADD COLUMN phone VARCHAR(20) NULL;

-- Teléfono demo para el admin semilla (dueño de las 28 propiedades del catálogo de demo).
UPDATE users SET phone = '3001234567' WHERE id = 1;
