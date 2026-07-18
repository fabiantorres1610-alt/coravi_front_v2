import { useParams } from "react-router-dom";

function Servicios() {

    const { id } = useParams();

    const data = {
        1: {
            titulo: "SERVICIO 1",
            texto: "Descripción del servicio 1"
        },
        2: {
            titulo: "SERVICIO 2",
            texto: "Descripción del servicio 2"
        },
        3: {
            titulo: "SERVICIO 3",
            texto: "Descripción del servicio 3"
        }
    };

    const servicio = data[id];

    if (!servicio) {
        return <h2>Servicio no encontrado</h2>;
    }

    return (
        <div className="App-header">
        <div className="servicio-detalle">

            <h1>{servicio.titulo}</h1>
            <p>{servicio.texto}</p>

        </div>
        </div>
    );
}

export default Servicios;