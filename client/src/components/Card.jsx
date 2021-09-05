import React from "react";

export default function Card({ image, name, temperament, weight, id}){
    return (
        <div>
            <h3>{name}</h3>
            <h5>{temperament}</h5>
            <p>{weight}</p>
            <img src={image} alt={`${name} image`} width='250px' heigth='200px' />
        </div>
    )
}

// [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
// [ ] Altura
// [ ] Peso
// [ ] Años de vida