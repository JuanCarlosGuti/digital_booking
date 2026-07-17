# Despliegue de demo en Oracle Cloud (Always Free)

Guía para levantar Cesar Travel completo (8 contenedores) en una VM gratuita de Oracle,
con **un solo puerto público (80)**. Tiempo estimado: ~30-40 min la primera vez.

> El plan Always Free da hoy **2 OCPU / 12GB RAM en ARM (Ampere A1)** — de sobra: el stack
> usa ~4-5GB. Todas las imágenes base del proyecto (temurin, mysql, node, nginx) son
> multi-arquitectura, así que en ARM compilan y corren sin cambios.

## 1. Crear la VM

1. Cuenta en <https://www.oracle.com/cloud/free/> (pide tarjeta solo para verificar — el
   plan Always Free no cobra). Elegí una *home region* con capacidad (si al crear la VM dice
   "out of capacity", probá en otro momento — es lista de espera, no error).
2. **Compute → Instances → Create instance**:
   - Image: **Ubuntu 24.04** (aarch64).
   - Shape: **Ampere → VM.Standard.A1.Flex**, `2 OCPU / 12 GB` (el máximo Always Free).
   - Networking: dejá la VCN/subnet por defecto con **IP pública asignada**.
   - SSH: subí tu clave pública (o generá el par y guardá la privada).
3. Anotá la **IP pública** de la instancia.

## 2. Abrir el puerto 80 (dos lugares — este es el paso que todos se saltan)

**a) En la nube** — VCN → subnet → **Security List** → Add Ingress Rule:
   - Source `0.0.0.0/0`, protocolo TCP, destination port `80`.

**b) En la propia VM** — las imágenes Ubuntu de Oracle traen iptables con una regla REJECT
   que bloquea todo salvo SSH (esto NO es ufw; confunde a todo el mundo):

```bash
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo netfilter-persistent save
```

## 3. Instalar Docker y clonar el repo

```bash
ssh ubuntu@<IP_PUBLICA>

curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker ubuntu
exit   # salir y volver a entrar para que el grupo docker aplique

ssh ubuntu@<IP_PUBLICA>
git clone https://github.com/JuanCarlosGuti/digital_booking.git
cd digital_booking
```

## 4. Configurar secretos

```bash
cp .env.example .env
nano .env
```

- `JWT_SECRET`: generarlo con `openssl rand -base64 32` (obligatorio).
- `MYSQL_ROOT_PASSWORD`: poné una contraseña propia (no dejar `rootpass` en una VM pública).
- Bloque SMTP: opcional — sin él todo funciona, solo no salen emails.

## 5. Levantar

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

La primera vez tarda **10-20 min** (compila 6 servicios Java + el frontend dentro de Docker).
Ver progreso: `docker compose logs -f --tail 20`. Cuando termine:

```bash
docker compose ps         # 8 contenedores "Up"
curl -s localhost/api/properties | head -c 200   # catálogo responde
```

Abrí **`http://<IP_PUBLICA>`** en el navegador — eso es todo: el nginx del frontend proxya
`/api` y `/uploads` al gateway por la red interna (same-origin, sin CORS), y todos los demás
puertos quedaron en loopback (el compose base los ata a `127.0.0.1`), así que MySQL y los
servicios individuales **no** son alcanzables desde internet.

## 6. Después del primer arranque

- **Cambiá la contraseña del admin semilla** (`admin@cesartravel.co` / `CesarTravel#2026` es
  pública en el repo). Hasta que exista "cambiar contraseña" en la UI, directo en la base:
  registrá un usuario nuevo desde la web y usalo, o actualizá el hash por SQL.
- Actualizar la app tras un push a GitHub:
  ```bash
  cd ~/digital_booking && git pull
  docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
  ```
- Apagar/prender la demo sin perder datos: `docker compose stop` / `start`
  (los volúmenes `mysql-data` y `property-uploads` persisten).

## Limitaciones conocidas de este despliegue de demo

- **HTTP sin TLS** — suficiente para pruebas; para HTTPS hace falta un dominio (aunque sea
  gratuito, p.ej. DuckDNS) + Caddy o certbot delante. Candidato natural de fase 3.
- Las contraseñas de los usuarios de MySQL por servicio siguen siendo las de desarrollo
  (solo alcanzables desde dentro de la VM, pero conviene rotarlas si la demo crece).
- El deploy es manual (`git pull` + rebuild) — el pipeline automático es fase 3 del
  [ROADMAP](ROADMAP.md).
