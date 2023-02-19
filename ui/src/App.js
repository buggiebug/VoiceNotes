import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/Login";
import UseContextAPI from "./Context/useContextAPI";

function App() {
  return (
    <>
      <UseContextAPI>
        <BrowserRouter>
          <Navbar />
          <ToastContainer position="top-right" autoClose={2000} />
          <Routes>
            <Route exect path="/" element={<Home />} />
            <Route exect path="/about" element={<About />} />
            <Route exect path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UseContextAPI>
    </>
  );
}

export default App;
