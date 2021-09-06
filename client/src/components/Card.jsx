import React from "react";

export default function Card({ image, name, temperament, weight }) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{temperament}</h5>
            <p>{weight}</p>
            <img src={image} alt={`${name}`} width='250px' heigth='200px' />
        </div>
    )
}
