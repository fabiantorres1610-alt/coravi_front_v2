import { useState, useEffect, useRef } from "react";
import sonidoEtapa from "../../ASSETS/SONIDOS/TROLLEADO.mp3";
import sonidoFinal from "../../ASSETS/SONIDOS/SILV.mp3";
import "../../SCC/nosotros.css";

function Nosotros() {
  // Ahora manejamos estados independientes para minutos y segundos en la interfaz
  const [nuevosMinutos, setNuevosMinutos] = useState("");
  const [nuevosSegundos, setNuevosSegundos] = useState("");
  
  const [tiempos, setTiempos] = useState([]);
  const [tiempo, setTiempo] = useState(0);
  const [etapaActual, setEtapaActual] = useState(0);
  const [activo, setActivo] = useState(false);

  const audioEtapa = useRef(new Audio(sonidoEtapa));
  const audioFinal = useRef(new Audio(sonidoFinal));
  const timeoutSonido = useRef(null);

  useEffect(() => {
    audioEtapa.current.loop = false;
    audioFinal.current.loop = false;
  }, []);

  const reproducir = (audio) => {
    clearTimeout(timeoutSonido.current);

    audio.pause();
    audio.currentTime = 0;
    audio.play().catch(() => {});

    timeoutSonido.current = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 5000);
  };

  useEffect(() => {
    let intervalo;

    if (activo && tiempo > 0) {
      intervalo = setInterval(() => {
        setTiempo((t) => t - 1);
      }, 1000);
    }

    if (activo && tiempo === 0) {
      if (etapaActual < tiempos.length - 1) {
        reproducir(audioEtapa.current);

        const siguiente = etapaActual + 1;
        setEtapaActual(siguiente);
        setTiempo(tiempos[siguiente]);
      } else {
        reproducir(audioFinal.current);
        setActivo(false);
      }
    }

    return () => clearInterval(intervalo);

  }, [activo, tiempo, etapaActual, tiempos]);

  const agregarTiempo = () => {
    // Convertimos ambos valores a números (si están vacíos, pasan a ser 0)
    const minutos = Number(nuevosMinutos) || 0;
    const segundos = Number(nuevosSegundos) || 0;

    // Calculamos el total de segundos de la etapa
    const totalSegundos = (minutos * 60) + segundos;

    // Solo lo agregamos si el tiempo total es mayor a cero
    if (totalSegundos > 0) {
      setTiempos((lista) => [...lista, totalSegundos]);
      setNuevosMinutos("");
      setNuevosSegundos("");
    }
  };

  const eliminarTiempo = (indice) => {
    setTiempos((lista) => lista.filter((_, i) => i !== indice));
  };

  const iniciarSesion = () => {
    if (tiempos.length === 0) return;

    clearTimeout(timeoutSonido.current);

    audioEtapa.current.pause();
    audioEtapa.current.currentTime = 0;

    audioFinal.current.pause();
    audioFinal.current.currentTime = 0;

    setEtapaActual(0);
    setTiempo(tiempos[0]);
    setActivo(true);
  };

  const pausarSesion = () => {
    setActivo(false);
  };

  const reiniciarSesion = () => {
    setActivo(false);
    setEtapaActual(0);

    if (tiempos.length > 0) {
      setTiempo(tiempos[0]);
    } else {
      setTiempo(0);
    }

    clearTimeout(timeoutSonido.current);

    audioEtapa.current.pause();
    audioEtapa.current.currentTime = 0;

    audioFinal.current.pause();
    audioFinal.current.currentTime = 0;
  };

  const formatear = (s) => {
    const min = Math.floor(s / 60);
    const seg = s % 60;

    return `${String(min).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;
  };

  return (
    <div className="App-header">
      <div className="contenedor-principal">
        
        {/* COLUMNA IZQUIERDA: Cronómetro y Botones */}
        <div className="columna-izquierda">
          <div className="cronometro-card">
            <p className="titulo">CRONÓMETRO</p>
            <h1 className="cronometro">
              {formatear(tiempo)}
            </h1>
            <div className="estado">
              {tiempos.length > 0
                ? `Etapa ${etapaActual + 1} de ${tiempos.length}`
                : "Sin etapas"}
            </div>
          </div>

          <div className="acciones">
            <button
              className="btn iniciar"
              onClick={iniciarSesion}
              disabled={tiempos.length === 0}
            >
              ▶ Iniciar
            </button>
            <button
              className="btn pausar"
              onClick={pausarSesion}
            >
              ❚❚ Pausar
            </button>
            <button
              className="btn reiniciar"
              onClick={reiniciarSesion}
            >
              ↺ Reiniciar
            </button>
          </div>
        </div>

        {/* COLUMNA DERECHA: Configuración y Lista de Etapas */}
        <div className="columna-derecha">
          <div className="panel">
            <h3>Programar etapas</h3>
            <div className="agregar">
              <input
                type="number"
                min="0"
                placeholder="Minutos"
                value={nuevosMinutos}
                onChange={(e) => setNuevosMinutos(e.target.value)}
              />
              <input
                type="number"
                min="0"
                max="59"
                placeholder="Segundos"
                value={nuevosSegundos}
                onChange={(e) => setNuevosSegundos(e.target.value)}
              />
              <button
                className="btn agregar-btn"
                onClick={agregarTiempo}
              >
                + Agregar
              </button>
            </div>
          </div>

          <div className="panel">
            <h3>Etapas</h3>
            <div className="lista-etapas">
              {tiempos.length === 0 && (
                <div className="vacio">
                  No hay etapas programadas
                </div>
              )}

              {tiempos.map((t, index) => (
                <div
                  key={index}
                  className={`etapa ${
                    index === etapaActual && activo
                      ? "actual"
                      : index < etapaActual
                      ? "completa"
                      : ""
                  }`}
                >
                  <div className="info">
                    <span className="icono">
                      {index < etapaActual
                        ? "✓"
                        : index === etapaActual && activo
                        ? "▶"
                        : "○"}
                    </span>
                    <div>
                      <strong>Etapa {index + 1}</strong>
                      <p>{formatear(t)}</p>
                    </div>
                  </div>
                  <button
                    className="eliminar"
                    onClick={() => eliminarTiempo(index)}
                    disabled={activo}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Nosotros;