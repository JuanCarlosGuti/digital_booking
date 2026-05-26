package DH.back_integrador.config;

import DH.back_integrador.model.*;
import DH.back_integrador.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired private RolRepository rolRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private CategoryRepository categoryRepository;
    @Autowired private CityRepository cityRepository;
    @Autowired private FeatureRepository featureRepository;
    @Autowired private ProductRepository productRepository;
    @Autowired private ImageRepository imageRepository;
    @Autowired private ProductFeatureRepository productFeatureRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        if (categoryRepository.count() > 0) return;

        // --- Roles ---
        Roles adminRole = rolRepository.save(new Roles("ADMIN"));
        Roles userRole  = rolRepository.save(new Roles("USER"));

        // --- Usuarios ---
        Users admin = new Users("Admin", "Digital", "admin@digitalbooking.com",
                passwordEncoder.encode("admin123"));
        admin.setRol(adminRole);
        userRepository.save(admin);

        Users user1 = new Users("Juan", "García", "juan@gmail.com",
                passwordEncoder.encode("password123"));
        user1.setRol(userRole);
        userRepository.save(user1);

        Users user2 = new Users("María", "López", "maria@gmail.com",
                passwordEncoder.encode("password123"));
        user2.setRol(userRole);
        userRepository.save(user2);

        // --- Categorías ---
        Category hoteles    = categoryRepository.save(new Category("Hoteles",
                "Los mejores hoteles con todas las comodidades para tu estadía",
                "https://picsum.photos/seed/hoteles/400/300"));
        Category apartamentos = categoryRepository.save(new Category("Apartamentos",
                "Apartamentos completamente equipados, ideales para estadías largas",
                "https://picsum.photos/seed/apartamentos/400/300"));
        Category hostels    = categoryRepository.save(new Category("Hostels",
                "Alojamientos económicos perfectos para viajeros y mochileros",
                "https://picsum.photos/seed/hostel/400/300"));
        Category resorts    = categoryRepository.save(new Category("Resorts",
                "Resorts de lujo con piscina, spa y experiencias únicas",
                "https://picsum.photos/seed/resort/400/300"));

        // --- Ciudades ---
        City buenosAires = cityRepository.save(new City("Buenos Aires", "Argentina"));
        City bogota      = cityRepository.save(new City("Bogotá", "Colombia"));
        City lima        = cityRepository.save(new City("Lima", "Perú"));
        City santiago    = cityRepository.save(new City("Santiago", "Chile"));
        City cdmx        = cityRepository.save(new City("Ciudad de México", "México"));

        // --- Características ---
        Feature wifi      = featureRepository.save(new Feature("WiFi gratis", "wifi"));
        Feature pool      = featureRepository.save(new Feature("Piscina", "pool"));
        Feature parking   = featureRepository.save(new Feature("Estacionamiento", "local_parking"));
        Feature ac        = featureRepository.save(new Feature("Aire acondicionado", "ac_unit"));
        Feature breakfast = featureRepository.save(new Feature("Desayuno incluido", "free_breakfast"));
        Feature gym       = featureRepository.save(new Feature("Gimnasio", "fitness_center"));
        Feature pets      = featureRepository.save(new Feature("Mascotas permitidas", "pets"));
        Feature spa       = featureRepository.save(new Feature("Spa", "spa"));

        // --- Productos (Hoteles) ---
        Product h1 = new Product();
        h1.setName("Hotel Grand Palace");
        h1.setTitle("Hotel de lujo en el corazón de Buenos Aires");
        h1.setDescription("Un oasis de elegancia y confort en plena ciudad. Habitaciones amplias con vista panorámica, servicio de primera clase y ubicación privilegiada a pasos de los principales atractivos turísticos.");
        h1.setAddress("Av. 9 de Julio 1234, Buenos Aires");
        h1.setRoomNumber(120);
        h1.setNumberOfBathrooms(2);
        h1.setExtraDescription1("Desayuno buffet incluido todos los días de 7 a 10 hs.");
        h1.setExtraDescription2("Piscina climatizada, spa y gimnasio disponibles las 24 hs.");
        h1.setExtraDescription3("A 5 minutos caminando del Obelisco y Teatro Colón.");
        h1.setCategory(hoteles);
        h1.setCity(buenosAires);
        productRepository.save(h1);
        addImages(h1, "grandpalace", 5);
        addFeatures(h1, wifi, pool, parking, ac, breakfast, gym, spa);

        Product h2 = new Product();
        h2.setName("Hotel Boutique Andino");
        h2.setTitle("Encanto colonial con vistas a los Andes");
        h2.setDescription("Hotel boutique de diseño en el centro histórico de Bogotá, con decoración que fusiona arte colombiano y modernidad. Ideal para viajeros que buscan una experiencia cultural auténtica.");
        h2.setAddress("Calle 93 #15-23, Bogotá");
        h2.setRoomNumber(40);
        h2.setNumberOfBathrooms(1);
        h2.setExtraDescription1("Cada habitación está decorada por artistas locales colombianos.");
        h2.setExtraDescription2("Restaurante gourmet con cocina de fusión colombo-francesa.");
        h2.setExtraDescription3("Tours guiados gratuitos por La Candelaria disponibles los fines de semana.");
        h2.setCategory(hoteles);
        h2.setCity(bogota);
        productRepository.save(h2);
        addImages(h2, "andinohotel", 4);
        addFeatures(h2, wifi, ac, breakfast, gym);

        Product h3 = new Product();
        h3.setName("Hotel Miraflores");
        h3.setTitle("Frente al Pacífico con vista al mar inigualable");
        h3.setDescription("Ubicado en el exclusivo distrito de Miraflores, este hotel de 5 estrellas ofrece vistas espectaculares al océano Pacífico. Habitaciones lujosas, gastronomía peruana de autor y spa de clase mundial.");
        h3.setAddress("Malecón Cisneros 1490, Lima");
        h3.setRoomNumber(85);
        h3.setNumberOfBathrooms(2);
        h3.setExtraDescription1("Vistas panorámicas al Pacífico desde todas las habitaciones superiores.");
        h3.setExtraDescription2("Restaurante reconocido con chef galardonado con estrella Michelin.");
        h3.setExtraDescription3("A 10 minutos del Parque Kennedy y Larcomar.");
        h3.setCategory(hoteles);
        h3.setCity(lima);
        productRepository.save(h3);
        addImages(h3, "miraflores", 5);
        addFeatures(h3, wifi, pool, parking, ac, breakfast, gym, spa);

        // --- Productos (Apartamentos) ---
        Product a1 = new Product();
        a1.setName("Loft Moderno Palermo");
        a1.setTitle("Loft de diseño en el barrio más cool de Buenos Aires");
        a1.setDescription("Espectacular loft de dos ambientes en pleno Palermo Soho. Completamente equipado, con cocina gourmet, terraza privada y decoración de autor. A metros de los mejores restaurantes y galerías de arte.");
        a1.setAddress("Thames 1780, Palermo, Buenos Aires");
        a1.setRoomNumber(1);
        a1.setNumberOfBathrooms(1);
        a1.setExtraDescription1("Terraza privada con parrilla y vista a los jardines del barrio.");
        a1.setExtraDescription2("Cocina completamente equipada con electrodomésticos de alta gama.");
        a1.setExtraDescription3("A 3 cuadras del Parque Las Heras y 5 min del subte.");
        a1.setCategory(apartamentos);
        a1.setCity(buenosAires);
        productRepository.save(a1);
        addImages(a1, "loftpalermo", 5);
        addFeatures(a1, wifi, parking, ac, pets);

        Product a2 = new Product();
        a2.setName("Apartamento Vista Cordillera");
        a2.setTitle("Amplio departamento con vista a la cordillera");
        a2.setDescription("Moderno apartamento de 3 dormitorios en Las Condes con impresionante vista a la cordillera de los Andes. Edificio con piscina, gym y seguridad 24 horas. Ideal para familias o viajes de negocios prolongados.");
        a2.setAddress("Av. Apoquindo 4501, Las Condes, Santiago");
        a2.setRoomNumber(3);
        a2.setNumberOfBathrooms(2);
        a2.setExtraDescription1("Piso 15 con vista despejada a la cordillera nevad.");
        a2.setExtraDescription2("Edificio con conserjería, piscina y sala de eventos.");
        a2.setExtraDescription3("A 2 cuadras del metro Tobalaba y centros comerciales.");
        a2.setCategory(apartamentos);
        a2.setCity(santiago);
        productRepository.save(a2);
        addImages(a2, "cordilleradept", 4);
        addFeatures(a2, wifi, pool, parking, ac, gym);

        Product a3 = new Product();
        a3.setName("Studio Polanco");
        a3.setTitle("Studio ejecutivo en la zona más exclusiva de CDMX");
        a3.setDescription("Elegante studio totalmente amueblado en Polanco, a pasos de los mejores restaurantes, bares y tiendas de la ciudad. Perfecto para viajeros de negocios que buscan comodidad y ubicación insuperable.");
        a3.setAddress("Emilio Castelar 120, Polanco, Ciudad de México");
        a3.setRoomNumber(1);
        a3.setNumberOfBathrooms(1);
        a3.setExtraDescription1("Cocina equipada con cafetera Nespresso y electrodomésticos premium.");
        a3.setExtraDescription2("Smart TV 55, internet de alta velocidad y escritorio de trabajo.");
        a3.setExtraDescription3("A 5 min caminando del Parque Lincoln y Antara Fashion Hall.");
        a3.setCategory(apartamentos);
        a3.setCity(cdmx);
        productRepository.save(a3);
        addImages(a3, "studiopolanco", 4);
        addFeatures(a3, wifi, parking, ac);

        // --- Productos (Hostels) ---
        Product hs1 = new Product();
        hs1.setName("Hostel El Viajero");
        hs1.setTitle("La comunidad de viajeros más vibrante de Bogotá");
        hs1.setDescription("Hostel acogedor y social en el corazón de La Candelaria. Cocina compartida totalmente equipada, eventos nocturnos, intercambios de idiomas y tours gratuitos por la ciudad. El mejor lugar para hacer amigos.");
        hs1.setAddress("Carrera 5 #12-58, La Candelaria, Bogotá");
        hs1.setRoomNumber(8);
        hs1.setNumberOfBathrooms(4);
        hs1.setExtraDescription1("Opciones de habitaciones privadas y dormitorios mixtos o femeninos.");
        hs1.setExtraDescription2("Bar y cocina común abiertos las 24 horas.");
        hs1.setExtraDescription3("Organización de tours gratuitos y actividades culturales diarias.");
        hs1.setCategory(hostels);
        hs1.setCity(bogota);
        productRepository.save(hs1);
        addImages(hs1, "viajerhostel", 4);
        addFeatures(hs1, wifi, breakfast, pets);

        Product hs2 = new Product();
        hs2.setName("Wild Rover Hostel Lima");
        hs2.setTitle("El hostel más animado del centro histórico de Lima");
        hs2.setDescription("Famoso hostel con más de 15 años recibiendo viajeros del mundo entero. Ambiente festivo, rooftop con vista a Lima, tours incluidos y el mejor pisco sour del barrio. Ideal para mochileros y viajeros jóvenes.");
        hs2.setAddress("Jr. de la Unión 834, Cercado de Lima, Lima");
        hs2.setRoomNumber(20);
        hs2.setNumberOfBathrooms(8);
        hs2.setExtraDescription1("Rooftop bar con vistas panorámicas al centro histórico de Lima.");
        hs2.setExtraDescription2("Tours incluidos al Circuito Mágico del Agua y Miraflores.");
        hs2.setExtraDescription3("Cocina equipada, lockers con candado incluidos y Wi-Fi de alta velocidad.");
        hs2.setCategory(hostels);
        hs2.setCity(lima);
        productRepository.save(hs2);
        addImages(hs2, "wildrover", 4);
        addFeatures(hs2, wifi, gym);

        Product hs3 = new Product();
        hs3.setName("Casa Condesa Hostel");
        hs3.setTitle("Bohemio y artístico en la Colonia Condesa");
        hs3.setDescription("Hostel boutique en una casona porfiriana restaurada en la Condesa. Ambiente artístico único, jardín interior, clases de salsa y yoga matutino. El punto de encuentro de creativos y viajeros con estilo.");
        hs3.setAddress("Ámsterdam 43, Colonia Condesa, Ciudad de México");
        hs3.setRoomNumber(12);
        hs3.setNumberOfBathrooms(5);
        hs3.setExtraDescription1("Jardín interior con hamacas y espacio de trabajo colaborativo.");
        hs3.setExtraDescription2("Clases de salsa los jueves y yoga al amanecer los sábados.");
        hs3.setExtraDescription3("A pasos del Parque México y los mejores cafés de la Condesa.");
        hs3.setCategory(hostels);
        hs3.setCity(cdmx);
        productRepository.save(hs3);
        addImages(hs3, "casacondesa", 4);
        addFeatures(hs3, wifi, pets);

        // --- Productos (Resorts) ---
        Product r1 = new Product();
        r1.setName("Resort & Spa Los Andes");
        r1.setTitle("Lujo y naturaleza en la precordillera de Santiago");
        r1.setDescription("Exclusivo resort de montaña a sólo 45 minutos de Santiago. Habitaciones suite con chimenea, spa termal con aguas volcánicas, gastronomía de autor y actividades al aire libre durante todo el año.");
        r1.setAddress("Km 45 Ruta G-25, Cajón del Maipo, Santiago");
        r1.setRoomNumber(30);
        r1.setNumberOfBathrooms(2);
        r1.setExtraDescription1("Piscinas termales naturales y tratamientos de spa con minerales andinos.");
        r1.setExtraDescription2("Actividades incluidas: trekking, cabalgatas, rappel y kayak.");
        r1.setExtraDescription3("Pension completa disponible con cocina de montaña de autor.");
        r1.setCategory(resorts);
        r1.setCity(santiago);
        productRepository.save(r1);
        addImages(r1, "losandesresort", 5);
        addFeatures(r1, wifi, pool, parking, ac, breakfast, gym, spa);

        Product r2 = new Product();
        r2.setName("Playa Azul Resort");
        r2.setTitle("All-inclusive de lujo frente al mar en Lima");
        r2.setDescription("Resort todo incluido frente a la playa, a sólo 1 hora al sur de Lima. Múltiples piscinas, deportes acuáticos, shows nocturnos y gastronomía internacional. La escapada perfecta para familias y parejas.");
        r2.setAddress("Km 60 Panamericana Sur, Lima");
        r2.setRoomNumber(200);
        r2.setNumberOfBathrooms(2);
        r2.setExtraDescription1("Todo incluido: comidas, bebidas, actividades acuáticas y entretenimiento.");
        r2.setExtraDescription2("5 piscinas temáticas, toboganes y área exclusiva para adultos.");
        r2.setExtraDescription3("Club infantil con animación, teatro y actividades para niños.");
        r2.setCategory(resorts);
        r2.setCity(lima);
        productRepository.save(r2);
        addImages(r2, "playaazul", 5);
        addFeatures(r2, wifi, pool, parking, ac, breakfast, gym, spa, pets);

        Product r3 = new Product();
        r3.setName("Hacienda San Carlos Resort");
        r3.setTitle("Hacienda colonial convertida en resort de lujo");
        r3.setDescription("Majestuosa hacienda del siglo XVII completamente restaurada a las afueras de Ciudad de México. Jardines históricos, capilla colonial, spa holístico y gastronomía mexicana de vanguardia en un entorno de película.");
        r3.setAddress("Carretera México-Querétaro Km 55, Hidalgo, México");
        r3.setRoomNumber(60);
        r3.setNumberOfBathrooms(1);
        r3.setExtraDescription1("Arquitectura colonial original del siglo XVII declarada patrimonio histórico.");
        r3.setExtraDescription2("Spa holístico con tratamientos prehispánicos con barro volcánico y cacao.");
        r3.setExtraDescription3("A 1 hora de CDMX: ideal para bodas, eventos y retiros corporativos.");
        r3.setCategory(resorts);
        r3.setCity(cdmx);
        productRepository.save(r3);
        addImages(r3, "haciendasancarlos", 5);
        addFeatures(r3, wifi, pool, parking, ac, breakfast, gym, spa);
    }

    private void addImages(Product product, String seed, int count) {
        String[] titles = {"Vista principal", "Habitación", "Baño", "Área común", "Exterior"};
        for (int i = 1; i <= count; i++) {
            Image img = new Image();
            img.setTitle(titles[Math.min(i - 1, titles.length - 1)]);
            img.setUrl("https://picsum.photos/seed/" + seed + i + "/800/600");
            img.setProduct(product);
            imageRepository.save(img);
        }
    }

    private void addFeatures(Product product, Feature... features) {
        for (Feature feature : features) {
            ProductFeature pf = new ProductFeature(product, feature);
            productFeatureRepository.save(pf);
        }
    }
}
