import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
  //estado del form
  const [search, setSearch] = useState("");

  //estado de la respuesta
  const [imagenes, setImagenes] = useState([]);

  // Pagina en la que nos encontramos
  const [paginaActual, setPaginaActual] = useState(1);

  // Total de páginas
  const [totalPaginas, setTotalPaginas] = useState(1);

  //consultar la API
  useEffect(() => {
    const consultarAPI = async () => {
      if (search === "") return;
      const imgByPage = 30;
      const KEY = "18206311-1836487428f0f2a3322f725c1";
      const url = `https://pixabay.com/api/?key=${KEY}&q=${search}&per_page=${imgByPage}&page=${paginaActual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      setImagenes(resultado.hits);

      //calcular num de paginas
      setTotalPaginas(Math.ceil(resultado.totalHits / imgByPage));
      //Mover la página hacia arriba
      document
        .querySelector(".jumbotron")
        .scrollIntoView({ behavior: "smooth" });
    };
    consultarAPI();
  }, [search, paginaActual]);

  //Definir la página anterior
  const paginaAnterior = () => {
    if (paginaActual === 1) return;
    setPaginaActual(paginaActual - 1);
  };

  //Definir la página siguiente
  const paginaSiguiente = () => {
    if (paginaActual === totalPaginas) return;
    setPaginaActual(paginaActual + 1);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Formulario setSearch={setSearch} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />
        {/* BOTON IZQUIERDO */}
        {paginaActual === 1 ? (
          <button
            type="button"
            className="bbtn btn-info mr-1 bg-secondary"
            onClick={paginaAnterior}
            disabled
          >
            &laquo; Anterior
          </button>
        ) : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
          >
            &laquo; Anterior
          </button>
        )}

        {/* BOTON DERECHO */}
        {paginaActual === totalPaginas ? (
          <button
            type="button"
            className="bbtn btn-info mr-1 bg-secondary"
            onClick={paginaSiguiente}
            disabled
          >
            &raquo; Siguiente
          </button>
        ) : (
          <button
            type="button"
            className="bbtn btn-info mr-1 "
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
