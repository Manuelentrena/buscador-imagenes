import React, { useRef, useState } from "react";
import Error from "./Error";

const Formulario = ({ setSearch }) => {
  //referencia al input search
  const inputSearch = useRef(null);
  /* State del error */
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = inputSearch.current.value;

    if (data === "") {
      setError(true);
      return;
    }
    setError(false);
    setSearch(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen, ejemplo: futbol o café"
            ref={inputSearch}
          ></input>
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          ></input>
        </div>
      </div>
      {error ? <Error mensaje="El campo es obligatorio" /> : null}
    </form>
  );
};

export default Formulario;
