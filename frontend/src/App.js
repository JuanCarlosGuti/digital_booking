import React, { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import {} from "react-router";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import Login from "./components/Body/Login/Login";
import Register from "./components/Body/Register/Register";
import { useState } from "react";
import EmailContext from "./context/Context";
import Product from "./components/Body/Product";
import NotFound from "./components/NotFound";
import FetchExample from "./components/fetchExample";
import SearchResults from "./components/SearchResults";
import ScrollToTop from "./components/ScrollToTop";
import Booking from "./components/Body/Booking";
import BookingResults from "./components/Body/Booking/BookingResults";
import MyBookings from "./components/Body/MyBookings/MyBookings"
import NewProduct from "./components/Body/NewProduct";


function App() {
  const [email, setEmail] = useState("");
  const value = useMemo(() => ({ email, setEmail }), [email]);

  return (
    <EmailContext.Provider value={value}>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Body />}></Route>
        <Route exact path="/home" element={<Body />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/admin" element={<NewProduct />}></Route>
        <Route exact path="/registration" element={<Register />}></Route>
        <Route path="/products/:id" element={<Product />}></Route>
        <Route path="/product/:id/booking" element={<Booking />}></Route>
        <Route
          path="/:type/:id/:topic/results"
          element={<BookingResults />}
        ></Route>
        <Route path="/:type/:param" element={<SearchResults />}></Route>
        <Route path="/:userId/bookings" element={<MyBookings />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/fetch" element={<FetchExample />}></Route>
      </Routes>
      <Footer />
    </EmailContext.Provider>
  );
}

export default App;
