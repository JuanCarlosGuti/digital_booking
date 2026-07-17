export const sampleCity = {
  id: 1,
  city: "Valledupar",
  department: "Cesar",
  latitude: 10.4631,
  longitude: -73.2532,
};

export const sampleCategory = {
  id: 1,
  title: "Hotel",
  imageUrl: "https://example.com/category.jpg",
};

export const sampleFeature = {
  id: 1,
  name: "Wifi",
  referenceIcon: "wifi",
};

export const sampleProduct = {
  id: 1,
  title: "Producto de prueba",
  description: "Descripcion de prueba",
  address: "Calle 1",
  roomNumber: 2,
  numberOfBathrooms: 1,
  extraDescription1: "No fumar",
  extraDescription2: "Camaras en zonas comunes",
  extraDescription3: "Cancelacion flexible",
  images: [{ id: 1, title: "img", url: "https://example.com/image.jpg" }],
  features: [sampleFeature],
  category: sampleCategory,
  city: sampleCity,
  ownerId: 1,
};

export const samplePolicies = {
  policy1: ["No fumar"],
  policy2: ["Camaras en zonas comunes"],
  policy3: "Cancelacion flexible",
};

export const sampleSession = {
  token: "test-token",
  id: 1,
  name: "Test",
  lastname: "User",
  email: "test@example.com",
  role: "USER",
};
