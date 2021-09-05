import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from "../actions";
import { Link } from 'react-router-dom';
import Card from "./Card";

export default function Home() {
    const dispatch = useDispatch(); // para usar esa constante para ir despachando mis acciones.
    const allDogs = useSelector((state) => state.dogs);
    // Esto es lo mismo que hacer el mapStateToProps.
    // Es mas facil porque de esta manera me declaro una constante y con useSelector me traigo en esa constante
    // todo lo que está en el estado de dogs.

    // Ahora voy a traerme del estado los perros cuando el componente se monta:
    useEffect(() => {
        dispatch(getDogs()) // Este dispatch es lo mismo que hacer el mapDispatchToProps
    }, [dispatch]) // El segundo parámetro del useEffect es un array donde va todo de lo que depende el useEffect para ejecutarse.
    // Como no depende de nada se pasa vacío.

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs())
    }

    return (
        <div>
            <Link to='/dogs' >Crear perro</Link>
            <h1>PI DOGS</h1>
            <button onClick={e => { handleClick(e) }} >
                Volver a cargar todos los perros
            </button>
            <div>
                <select>
                    <option value='alf' >Orden alfabético</option>
                    <option value='inv' >Orden alfabético inverso</option>
                    {/* El value me permite después cuando haga la lógica decir, si el option tiene value alf, hacé
                        tal cosa; si tiene value inv, hacé tal otra*/}
                </select>
                <select>
                    <option value='asc'>Peso ascendente</option>
                    <option value='desc'>Peso descendente</option>
                </select>
                <select>
                    <option value='temp'>Temperamento</option>
                </select>
                <select>
                    <option value='existent'>Razas existentes</option>
                    <option value='created'>Razas creadas</option>
                </select>
                {
                    allDogs?.map((el) => {
                        return (
                            <fragment>
                                <Link to={'/home/' + el.id}>
                                    <Card name={el.name} image={el.image} temperament={el.temperament} weigth={el.weight} key={el.id} />
                                </Link>
                            </fragment>
                        )
                    })
                }
            </div>
        </div>
    )

}
