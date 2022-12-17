//const mainRute = "http://localhost:8080";
const mainRute = "http://18.116.202.151:8080";

//Products ----------------------------------------------

export const getAllProducts = async () => {
  let response = await fetch(`${mainRute}/productos`, {
    method: "GET",
    // headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const getProduct = async (id) => {
  let response = await fetch(`${mainRute}/productos/${id}`, {
    method: "GET",
    // headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const getProductByCategory = async (category) => {
  let response = await fetch(`${mainRute}/productos/categoria=${category}`, {
    method: "GET",
    // headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const getProductByCity = async (city) => {
  let response = await fetch(`${mainRute}/productos/ciudad=${city}`, {
    method: "GET",
    // headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const getProductByDate = async (startDate, endDate) => {
  let response = await fetch(
    `${mainRute}/productos/findByDate/${startDate}/${endDate}`,
    {
      method: "GET",
      // headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};
export const getProductByCityAndDate = async (startDate, endDate, cityId) => {
  let response = await fetch(
    `${mainRute}/productos/findByDate/${startDate}/${endDate}/${cityId}`,
    {
      method: "GET",
      // headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};

export const createProduct = async (product) => {
  const p = {
    name: product.name,
    title: product.name,
    description: product.description,
    address: product.address,
    roomNumber: 3,
    numberOfBathrooms: 3,
    category: product.category,
    city: product.city,
    images: product.images,
    productFeatures: product.attributes,
    extraDescription1: product.policy1,
    extraDescription2: product.policy2,
    extraDescription3: product.policy3,
  };
  console.log(p);
  let response = await fetch(`${mainRute}/productos`, {
    method: "POST",
    body: JSON.stringify(p),
    headers: {
      "content-type": "application/json",
    },
  });

  return response.json();
};

//Bookings ----------------------------------------

export const getBookingDates = async (productId) => {
  let response = await fetch(
    `${mainRute}/reservation/findAll/product/${productId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.json();
};

export const postBooking = async (firstDate, secondDate, productId, userId) => {
  let response = await fetch(`${mainRute}/reservation/create`, {
    method: "POST",
    body: JSON.stringify({
      checkIn: firstDate,
      checkOut: secondDate,
      product: { id: productId },
      user: {
        id: userId,
      },
    }),
    headers: {
      "content-type": "application/json",
    },
  });
  return response.json(); //devuelve user con su id, la pass encriptada, y el rol
};

export const getAllBookings = async () => {
  let response = await fetch(`${mainRute}/reservation/findAll`, {
    method: "GET",
    // headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

//Category ----------------------------------------------

export const getAllCategory = async () => {
  let response = await fetch(`${mainRute}/categorias`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const getCategory = async (id) => {
  let response = await fetch(`${mainRute}/categorias/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

//Cities ----------------------------------------------

export const getAllCities = async () => {
  let response = await fetch(`${mainRute}/ciudades`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const getCity = async (id) => {
  let response = await fetch(`${mainRute}/ciudades/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

//Features

export const getFeaturesByProduct = async (id) => {
  let response = await fetch(`${mainRute}/productos/features=${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

//Users --------------------------------------------------------

export const authenticateUser = (email, password) => {
  return fetch(`${mainRute}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario: email,
      clave: password,
    }),
  });
};

export const postUser = async (
  nameImput,
  lastnameImput,
  emailImput,
  passwordImput
) => {
  return await fetch(`${mainRute}/auth/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nameImput,
      lastname: lastnameImput,
      email: emailImput,
      password: passwordImput,
    }),
  });
};

//Users ----------------------

export const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
};
