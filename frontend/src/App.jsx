import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import Login from "./components/Body/Login/Login";
import Register from "./components/Body/Register/Register";
import Product from "./components/Body/Product";
import NotFound from "./components/NotFound";
import SearchResults from "./components/SearchResults";
import ScrollToTop from "./components/ScrollToTop";
import Booking from "./components/Body/Booking";
import BookingResults from "./components/Body/Booking/BookingResults";
import MyBookings from "./components/Body/MyBookings/MyBookings";
import MyProperties from "./components/Body/MyProperties/MyProperties";
import Messages from "./components/Body/Messages/Messages";
import ChatThread from "./components/Body/Messages/ChatThread";
import NewProduct from "./components/Body/NewProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Body />}></Route>
        <Route path="/home" element={<Body />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <NewProduct />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/registration" element={<Register />}></Route>
        {/* Antes del catch-all /:type/:param para que no las capture SearchResults. */}
        <Route
          path="/my-properties"
          element={
            <ProtectedRoute>
              <MyProperties />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/my-properties/edit/:id"
          element={
            <ProtectedRoute>
              <NewProduct />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/messages/:id"
          element={
            <ProtectedRoute>
              <ChatThread />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/products/:id" element={<Product />}></Route>
        <Route
          path="/product/:id/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/:type/:id/:topic/results"
          element={<BookingResults />}
        ></Route>
        <Route path="/:type/:param" element={<SearchResults />}></Route>
        <Route
          path="/:userId/bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
