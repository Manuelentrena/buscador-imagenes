import React from "react";
import Imagen from "./Imagen";

const ListadoImagenes = ({ imagenes }) => {
  return (
    <div className="col-12 p-5 row">
      {imagenes &&
        imagenes.map((imagen) => <Imagen imagen={imagen} key={imagen.id} />)}
    </div>
  );
};

export default ListadoImagenes;
