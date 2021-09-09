import React from "react";

export default function Card({ image, name, temperaments, weightMin, weightMax }) {
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
            <img src={image} alt={`${name}`} width='250px' heigth='200px' />
            <p>Weight: {weightMin} - {weightMax} kg</p>
        </div>
    )
}
