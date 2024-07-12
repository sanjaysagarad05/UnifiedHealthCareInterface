import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import Main from "./main";
import Doctordisplay from "./doctordisplay";
import Doctorlogin from "./doctorlogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/doctordisplay" element={<Doctordisplay />} />
        <Route path="/doctorlogin" element={<Doctorlogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
