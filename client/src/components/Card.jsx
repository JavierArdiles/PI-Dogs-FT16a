import React from "react";

export default function Card({ image, name, temperaments, weight }) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{function(temperaments){
                if(typeof(temperaments) === 'string'){
                    return temperaments;
                }
                if(Array.isArray(temperaments)){
                    let temps = temperaments.map(el => el.name);
                    return temps.join(', ');
                }
            }(temperaments)}</h5>
            <p>{weight}</p>
            <img src={image} alt={`${name}`} width='250px' heigth='200px' />
        </div>
    )
}
