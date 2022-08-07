import "../css/App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import NoteState from "../context/notes/NoteState";
import Alert from "./Alert";
import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }
  return (
    <>
      <div id="parent">
        <NoteState>
          <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path = "/login" element = {<><Alert  key = "1" alert={alert}/><Login key="3" showAlert={showAlert} /></> }/>
                <Route path = "/signup" element = {<><Alert key = "2" alert={alert}/><Signup  key="4" showAlert={showAlert} /></> }/>
                <Route path="/" element={<Home showAlert={showAlert} />} />
                {/* <Route path="/about" element={<About />} /> */}
            </Routes>
          </BrowserRouter>
        </NoteState>
      </div>
    </>
  );
}


export default App;
