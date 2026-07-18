import { Routes, Route } from "react-router-dom";
import "./App.css";

import Nav from "./COMPONENTES/NAVEGACION/Nav";
import Inicio from "./VISTAS/INICIO/inicio";
import Nosotros from "./VISTAS/NOSOTROS/nosotros";
import Servicios from "./VISTAS/SERVICIOS/servicios";

function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/servicios/:id" element={<Servicios />} />
      </Routes>
    </>
  );
}

export default App;