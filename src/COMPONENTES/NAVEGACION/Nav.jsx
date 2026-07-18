import "../../SCC/navegacion.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import whatsapp from "../../BANCO DE DATOS/IMG/LOGOS/BORRAR.jpeg";
import instagram from "../../BANCO DE DATOS/IMG/LOGOS/BORRAR.jpeg";
import linkedin from "../../BANCO DE DATOS/IMG/LOGOS/BORRAR.jpeg";

function Navegacion() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="barranav">

            {/* IZQUIERDA */}
            <div className="izquierda">
                <Link to="/">
                    <img src={whatsapp} alt="Inicio" />
                </Link>
            </div>

            {/* CENTRO */}
            <div className="centro">
                <div
                    className="dropdown"
                    onMouseEnter={() => setMenuOpen(true)}
                    onMouseLeave={() => setMenuOpen(false)}
                >
                    <div className="boton">
                        Servicios
                    </div>

                    <div className={`menu ${menuOpen ? "activo" : ""}`}>

                        <Link to="/servicios/1" className="boton2">
                            <p className="fuente-verdana">Texto de descripción</p>
                            <h2 className="fuente-impact">  VIABILIZACIÓN Y OPTIMIZACIÓN</h2>
                        </Link>

                        <Link to="/servicios/2" className="boton2">
                            <p className="fuente-verdana">Texto de descripción</p>
                            <h2 className="fuente-impact">DESARROLLO TÉCNICO Y EJECUCIÓN</h2>
                        </Link>

                        <Link to="/servicios/3" className="boton2">
                            <p className="fuente-verdana">Texto de descripción</p>
                            <h2 className="fuente-impact">ASESORIA INMOBILIARIA</h2>
                        </Link>
                    </div>
                </div>

                <Link to="/nosotros" className="boton">
                    Nosotros
                </Link>
                <a
                    href="https://wa.me/573171507082?text=Hola,%20quisiera%20agendar%20una%20cita%20para%20hablar%20sobre%20mi%20proyecto"
                    className="boton"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Contáctanos
                </a>
            </div>

            {/* DERECHA */}
            <div className="derecha">

                <a href="#" className="icon whatsapp">
                    <img src={whatsapp} alt="WhatsApp" />
                </a>

                <a href="#" className="icon instagram">
                    <img src={instagram} alt="Instagram" />
                </a>

                <a href="#" className="icon linkedin">
                    <img src={linkedin} alt="LinkedIn" />
                </a>
                <a href="#" className="icon linkedin">
                    <img src={linkedin} alt="LinkedIn" />
                </a><a href="#" className="icon linkedin">
                    <img src={linkedin} alt="LinkedIn" />
                </a>
            </div>

        </div>
    );
}

export default Navegacion;