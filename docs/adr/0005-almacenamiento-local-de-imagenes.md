# ADR-0005: Almacenamiento local de imágenes, no S3/Cloudinary

## Estado
Aceptado

## Contexto
Hoy no existe carga real de imágenes: `Image` solo tiene `title`/`url`, y el frontend simplemente pega una URL externa a mano (`NewProductUploadMedia.jsx`). Se necesita un endpoint real de upload de archivos para los inmuebles.

## Decisión
property-service expone un endpoint multipart (`POST /api/properties/{id}/images`) que guarda los archivos en un volumen local en disco (`/data/uploads`) y los sirve como recurso estático. Decisión explícita del usuario del proyecto: sin AWS S3 ni Cloudinary por ahora.

## Consecuencias
- El almacenamiento local **no sobrevive al pipeline de deploy actual**: `.gitlab-ci.yml` hoy copia el jar por SCP a la instancia EC2, lo cual pisaría cualquier archivo que no esté en un volumen persistente fuera del path que toca el CI. Esto se resuelve montando un volumen persistente en el EC2 antes de activar el upload real en producción (fase 2/3 — ver [ROADMAP.md](../ROADMAP.md)), no se puede dejar para el final.
- Si el proyecto necesita escalar horizontalmente (más de una instancia de property-service), el disco local deja de alcanzar y hay que migrar a almacenamiento compartido (S3 u otro) — es la señal concreta para revisitar esta decisión, no antes.
