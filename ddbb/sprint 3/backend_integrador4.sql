-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 21-11-2022 a las 18:54:45
-- Versión del servidor: 8.0.31-0ubuntu0.20.04.1
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `backend_integrador`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id` bigint NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id`, `description`, `image_url`, `title`) VALUES
(1, 'Apartamentos', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Apartamentos'),
(2, 'Casas', 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Casas'),
(3, 'descripcionUpdate', 'urlUpdate', 'CategoriaUpdate'),
(4, 'Cabañas...', 'https://images.pexels.com/photos/128303/pexels-photo-128303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Cabañas'),
(5, 'descripcionUpdate', 'urlUpdate', 'CategoriaUpdate');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category_generator`
--

CREATE TABLE `category_generator` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `category_generator`
--

INSERT INTO `category_generator` (`next_val`) VALUES
(6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `city`
--

CREATE TABLE `city` (
  `id` bigint NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `city`
--

INSERT INTO `city` (`id`, `city`, `country`) VALUES
(1, 'Buenos Aires', 'Argentina'),
(2, 'Córdoba', 'Argentina'),
(3, 'Bogotá', 'Colombia'),
(4, 'Medellin', 'Colombia'),
(5, 'Bariloche', 'Argentina'),
(6, 'Cartagena', 'Colombia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `city_generator`
--

CREATE TABLE `city_generator` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `city_generator`
--

INSERT INTO `city_generator` (`next_val`) VALUES
(2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `feature`
--

CREATE TABLE `feature` (
  `id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `reference_icon` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `feature`
--

INSERT INTO `feature` (`id`, `name`, `reference_icon`) VALUES
(1, 'Wifi', 'wifi'),
(2, 'Cocina', 'cocina'),
(3, 'Lavadora', 'lavadora'),
(4, 'Televisor', 'televisor'),
(5, 'Piscina', 'piscina'),
(6, 'Jacuzzi', 'jacuzzi'),
(7, 'Estacionamiento', 'estacionamiento'),
(8, 'Gimnasio', 'gimnasio'),
(9, 'Detector de humo', 'detector'),
(10, 'Aire acondicionado', 'aire');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `feature_generator`
--

CREATE TABLE `feature_generator` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `feature_generator`
--

INSERT INTO `feature_generator` (`next_val`) VALUES
(1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `image`
--

CREATE TABLE `image` (
  `id` bigint NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `product_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `image`
--

INSERT INTO `image` (`id`, `title`, `url`, `product_id`) VALUES
(1, 'apt buenos aires ', 'https://a0.muscache.com/im/pictures/7c788516-9a54-41ca-99a1-d9006719677e.jpg?im_w=1200', 1),
(2, 'apt buenos aires ', 'https://a0.muscache.com/im/pictures/d29ba3bb-17e6-47fc-834d-f6436d8c5e87.jpg?im_w=1200', 1),
(3, 'apt buenos aires ', 'https://a0.muscache.com/im/pictures/8c59ea81-54b5-401e-ac86-e7a9c15483c6.jpg?im_w=1200', 1),
(4, 'apt buenos aires', 'https://a0.muscache.com/im/pictures/85b9a885-aa32-49f2-a28f-77850171c276.jpg?im_w=1200', 1),
(5, 'apt buenos aires', 'https://a0.muscache.com/im/pictures/a08c77e2-401e-470c-ab07-49c96cf3a44a.jpg?im_w=1200', 1),
(6, 'apt bogota', 'https://a0.muscache.com/im/pictures/7de34810-5412-41f5-978c-bb100ec58d11.jpg?im_w=1200', 2),
(7, 'apt bogota', 'https://a0.muscache.com/im/pictures/miso/Hosting-33186477/original/ac13d934-a49c-4653-8833-be8e19ab7180.jpeg?im_w=1200', 2),
(8, 'apt bogota', 'https://a0.muscache.com/im/pictures/29a51b1b-6a8e-4788-984e-ad7a756cc8c8.jpg?im_w=1200', 2),
(9, 'apt bogota', 'https://a0.muscache.com/im/pictures/ba694acb-41ba-4064-bc48-b3ef76791615.jpg?im_w=1200', 2),
(10, 'apt bogota', 'https://a0.muscache.com/im/pictures/miso/Hosting-33186477/original/6a74fccd-af3e-4379-b1a4-69839f912c41.jpeg?im_w=1200', 2),
(11, 'casa cordoba', 'https://a0.muscache.com/im/pictures/miso/Hosting-751447725472870615/original/deb29194-49cc-4164-91dc-d53d7dec2326.jpeg?im_w=960', 3),
(12, 'casa cordoba', 'https://a0.muscache.com/im/pictures/miso/Hosting-751447725472870615/original/6fe2390e-e1a9-4403-8316-7308d49f9ad7.jpeg?im_w=1200', 3),
(13, 'casa cordoba', 'https://a0.muscache.com/im/pictures/miso/Hosting-751447725472870615/original/b8c7cf19-f4bf-42c5-9e15-943b6d669bcc.jpeg?im_w=1200', 3),
(14, 'casa cordoba', 'https://a0.muscache.com/im/pictures/miso/Hosting-751447725472870615/original/e9129155-6475-4e7f-bade-37d6f8b8cf4e.jpeg?im_w=1200', 3),
(15, 'casa cordoba', 'https://a0.muscache.com/im/pictures/miso/Hosting-751447725472870615/original/687791b0-700e-4ec5-b117-1a13147dcf24.jpeg?im_w=1200', 3),
(16, 'casa medellin', 'https://a0.muscache.com/im/pictures/miso/Hosting-739791489565979249/original/2374c4c7-f3ba-4b7e-8d0c-1d767a028725.jpeg?im_w=960', 4),
(17, 'casa medellin', 'https://a0.muscache.com/im/pictures/342e1ac5-3b0d-43e5-b523-bfd5bfa9caf2.jpg?im_w=1200', 4),
(18, 'casa medellin', 'https://a0.muscache.com/im/pictures/miso/Hosting-739791489565979249/original/87c82b86-7587-46e0-868d-b7c765bc6374.jpeg?im_w=1200', 4),
(19, 'casa medellin', 'https://a0.muscache.com/im/pictures/ce1cab0a-14f7-4a50-9569-3121d5cfce1e.jpg?im_w=1200', 4),
(20, 'casa medellin', 'https://a0.muscache.com/im/pictures/miso/Hosting-751447725472870615/original/e9a1c57a-4881-4380-acc1-b4a9ac3b6060.jpeg?im_w=1200', 4),
(21, 'loft bariloche', 'https://a0.muscache.com/im/pictures/miso/Hosting-750539402664925220/original/cb42a45b-4a28-4a7e-91c6-dcd188942fe4.jpeg?im_w=960', 5),
(22, 'loft bariloche', 'https://a0.muscache.com/im/pictures/miso/Hosting-750539402664925220/original/1541ad38-9c53-431e-833a-dc4d125df7c3.jpeg?im_w=1200', 5),
(23, 'loft bariloche', 'https://a0.muscache.com/im/pictures/miso/Hosting-750539402664925220/original/2252d65a-8eaa-4bca-a473-7edd7ff14878.jpeg?im_w=1200', 5),
(24, 'loft bariloche', 'https://a0.muscache.com/im/pictures/miso/Hosting-750539402664925220/original/2554beab-8f75-4e2b-8b28-8be338f193bf.jpeg?im_w=1200', 5),
(25, 'loft bariloche', 'https://a0.muscache.com/im/pictures/miso/Hosting-750539402664925220/original/4d77cf01-007f-41e7-9cf2-30bb4881c1d9.jpeg?im_w=1200', 5),
(26, 'loft cartagena', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-681766185031392241/original/fc306fec-762f-49ff-9df1-5c5ebd14d423.jpeg?im_w=960', 6),
(27, 'loft cartagena', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-681766185031392241/original/613117ae-dcfa-4dbd-93ff-aa72758e0503.jpeg?im_w=1200', 6),
(28, 'loft cartagena', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-681766185031392241/original/c632b300-e953-4eb9-a98e-41eb582c3cbf.jpeg?im_w=1200', 6),
(29, 'loft cartagena', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-681766185031392241/original/9d8560fa-0044-449d-8bc8-5e6c09f230d6.jpeg?im_w=1200', 6),
(30, 'loft cartagena', 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-681766185031392241/original/e8e843a7-0c6e-4a5c-9063-2ccfbf4cd0ef.jpeg?im_w=1200', 6),
(31, 'cabaña cordoba', 'https://a0.muscache.com/im/pictures/1694460b-0d5c-4ed5-92fb-a16fec73e261.jpg?im_w=960', 7),
(32, 'cabaña cordoba', 'https://a0.muscache.com/im/pictures/94e85af9-6f3c-425b-8790-b73ce68c5962.jpg?im_w=1200', 7),
(33, 'cabaña cordoba', 'https://a0.muscache.com/im/pictures/bd195e77-08cc-4a35-ad37-bfa2fee77368.jpg?im_w=1200', 7),
(34, 'cabaña cordoba', 'https://a0.muscache.com/im/pictures/7ecac6e8-d773-4a7c-a3cf-1024cf0dc47d.jpg?im_w=1200', 7),
(35, 'cabaña cordoba', 'https://a0.muscache.com/im/pictures/28a554a1-c315-45f7-a22f-d41e88ea9c3c.jpg?im_w=1200', 7),
(36, 'cabaña medellin', 'https://a0.muscache.com/im/pictures/miso/Hosting-38129047/original/894bbb3b-7286-4131-9a7b-edd3c2971723.jpeg?im_w=960', 8),
(37, 'cabaña medellin', 'https://a0.muscache.com/im/pictures/miso/Hosting-38129047/original/e029f158-93d1-4e6b-bd51-b284a77f7d49.jpeg?im_w=1200', 8),
(38, 'cabaña medellin', 'https://a0.muscache.com/im/pictures/miso/Hosting-38129047/original/931fc299-5e96-4b72-9166-eee0ea8882b2.png?im_w=1200', 8),
(39, 'cabaña medellin', 'https://a0.muscache.com/im/pictures/eed4cb33-2592-4ae5-812a-b5c8d9fb67dd.jpg?im_w=1200', 8),
(40, 'cabaña medellin', 'https://a0.muscache.com/im/pictures/068c7bfd-e1c2-41f4-bb62-87fd067c257a.jpg?im_w=1200', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `image_generator`
--

CREATE TABLE `image_generator` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `image_generator`
--

INSERT INTO `image_generator` (`next_val`) VALUES
(1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `number_of_bathrooms` int DEFAULT NULL,
  `room_number` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category_id` bigint NOT NULL,
  `city_id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `address`, `description`, `number_of_bathrooms`, `room_number`, `title`, `category_id`, `city_id`, `name`) VALUES
(1, 'ABG', 'Fantástico dúplex de un dormitorio con sala de estar enorme y una linda terraza en el dormitorio. Perfecta Ubicación en lo mejor de Recoleta\r\nOtros aspectos a destacar\r\nEn general aceptamos mascotas\r\nGracias', 1, 1, 'Duplex de diseño en lo mejor de Recoleta', 1, 1, NULL),
(2, 'Barrios unidos', 'Zonas Comunes:\r\n- Gimnasio, Salón de Yoga, TRX, Rooftop, Lounge,  Billar Pool, Ping Pong. \r\n-  Piscina, Jacuzzy y Sauna\r\nPodrás usar las zonas comunes del edificio con reservación previa sujeta a disponibilidad y aforo por protocolos de bioseguridad', 1, 2, 'Acogedor apartamento con gran vista, gimnasio y azotea', 1, 3, NULL),
(3, 'villa allende', 'Hermosa Casa de Veraneo en el balneario mas importante de Villa Carlos Paz! Está a unas pocas cuadras del río San Antonio, el bado de tala huasi o el río de Icho Cruz. A 10\" de Carlos Paz, y a pocas cuadras de la calle principal del pueblo.', 2, 3, 'Casa de vacaciones en las Sierras de Córdoba!', 2, 2, NULL),
(4, 'casa medellin', 'Esta espectacular vivienda te brinda una experiencia local y esta cerca de hermosos lugares naturales que visitar con cercanía a deliciosos restaurantes. Es muy cómoda, cuenta con todo lo necesario de primera mano para que sientas que llegaste a tu hogar.', 2, 3, 'Hermosa casa céntrica, espaciosa y dotada para 6', 2, 4, NULL),
(5, 'San Carlos de Bariloche', 'Disfrutá de una experiencia con estilo en este alojamiento céntrico.', 1, 2, 'BAM | Depto Studio en el centro con vista al lago', 3, 5, NULL),
(6, 'Cartagena de indias', 'Disfrute de las mejores vacaciones de lujo en esta impresionante casa frente a la playa, ubicada en el exclusivo barrio de Cartagena. Cada detalle ha sido diseñado profesionalmente para una vida familiar activa y el máximo confort desde hace 53 años', 2, 3, 'Casa Porto por Huespedia. Casa de lujo frente a la playa', 3, 6, NULL),
(7, 'Villa General Belgrano', '\"VIlla natural\", Ambiente Natural , cabaña de tronco , muy cómoda, zona residencial,  cerca del centro.', 2, 3, 'CABAÑA EN VILLA GENERAL BELGRANO \"Villa Natural\"', 4, 2, NULL),
(8, 'Antioquia', 'Tu casa en la naturaleza.   En la bella región de Santa Elena,  lindando con la reserva forestal del Parque Arví,  a solo 40 minutos de Medellín,  pero con la tranquilidad del campo.', 2, 3, 'La naturaleza es tu casa', 2, 4, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_feature`
--

CREATE TABLE `product_feature` (
  `id` bigint NOT NULL,
  `feature_id` bigint NOT NULL,
  `product_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product_feature`
--

INSERT INTO `product_feature` (`id`, `feature_id`, `product_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 4, 1),
(4, 6, 1),
(5, 8, 1),
(6, 9, 1),
(7, 2, 2),
(8, 3, 2),
(9, 5, 2),
(10, 7, 2),
(11, 8, 2),
(12, 10, 2),
(13, 1, 3),
(14, 2, 3),
(15, 3, 3),
(16, 4, 3),
(17, 5, 3),
(18, 8, 3),
(19, 1, 4),
(20, 2, 4),
(21, 3, 4),
(22, 4, 4),
(23, 5, 4),
(24, 9, 4),
(25, 1, 5),
(26, 2, 5),
(27, 3, 5),
(28, 4, 5),
(29, 7, 5),
(30, 8, 5),
(31, 1, 6),
(32, 2, 6),
(33, 3, 6),
(34, 4, 6),
(35, 5, 6),
(36, 6, 6),
(37, 1, 7),
(38, 2, 7),
(39, 3, 7),
(40, 4, 7),
(41, 8, 7),
(42, 10, 7),
(43, 1, 8),
(44, 2, 8),
(45, 3, 8),
(46, 4, 8),
(47, 6, 8),
(48, 7, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_feature_generator`
--

CREATE TABLE `product_feature_generator` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product_feature_generator`
--

INSERT INTO `product_feature_generator` (`next_val`) VALUES
(1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_generator`
--

CREATE TABLE `product_generator` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product_generator`
--

INSERT INTO `product_generator` (`next_val`) VALUES
(6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservation`
--

CREATE TABLE `reservation` (
  `id` int NOT NULL,
  `check_in` date DEFAULT NULL,
  `check_out` date DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'USER'),
(2, 'ADMIN');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `roles_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `email`, `lastname`, `name`, `password`, `roles_id`) VALUES
(5, 'ab@mail.com', 'grillo', 'pepe', '$2a$10$6N3wakK.Jtj59N7/TJlrgefyjLufNJP3IIkKAwIuGBSjuR0HyTJBW', 1),
(6, 'abc@mail.com', 'grillo', 'pepe', '$2a$10$LHbua6lHaX7M1JFs8M.5meIEW83Ekj65Rz/3BFofkXAWZTVv3yzW.', 2),
(7, 'abcd@mail.com', 'grillo', 'pepe', '$2a$10$Nyoc2oZZ1dA5gKSbKgREnuo1dqqxUlIQ9utAV8H11apv284tTD6hS', 1),
(8, 'email@mail.com', 'grillo', 'pepe', '$2a$10$Hu6qs7jzfY4FNGs8ECElluPs9iun7jnyT10kcWX3Z2NhFBBVj5Z4O', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `feature`
--
ALTER TABLE `feature`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKgpextbyee3uk9u6o2381m7ft1` (`product_id`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
  ADD KEY `FKh788ivjgngf4jvk4e5h4u8dkm` (`city_id`);

--
-- Indices de la tabla `product_feature`
--
ALTER TABLE `product_feature`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKgv1xq970xwg0q5k3jn9i23cc1` (`feature_id`),
  ADD KEY `FKp5iv62sge9f7yw66e5w2i2rhx` (`product_id`);

--
-- Indices de la tabla `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKgoouhtuwwm277879njd9atahw` (`product_id`),
  ADD KEY `FKrea93581tgkq61mdl13hehami` (`user_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKbgvg7xuekkcqmpvi3tgkxk85j` (`roles_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `FKgpextbyee3uk9u6o2381m7ft1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Filtros para la tabla `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `FKh788ivjgngf4jvk4e5h4u8dkm` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`);

--
-- Filtros para la tabla `product_feature`
--
ALTER TABLE `product_feature`
  ADD CONSTRAINT `FKgv1xq970xwg0q5k3jn9i23cc1` FOREIGN KEY (`feature_id`) REFERENCES `feature` (`id`),
  ADD CONSTRAINT `FKp5iv62sge9f7yw66e5w2i2rhx` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Filtros para la tabla `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `FKgoouhtuwwm277879njd9atahw` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FKrea93581tgkq61mdl13hehami` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FKbgvg7xuekkcqmpvi3tgkxk85j` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
