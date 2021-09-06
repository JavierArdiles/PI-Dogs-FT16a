import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments, filterDogsByTemperament } from "../actions";
import { Link } from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {
    const dispatch = useDispatch(); // para usar esa constante para ir despachando mis acciones.
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments);
    // Esto es lo mismo que hacer el mapStateToProps.
    // Es mas facil porque de esta manera me declaro una constante y con useSelector me traigo en esa constante
    // todo lo que está en el estado de dogs.
    const [currentPage, setCurrentPage] = useState(1); // En una constante me guardo el estado actual y la otra me setea el estado actual. El state inicial es 1 porque empiezo en la primer página.
    const [dogsPerPage, setDogsPerPage] = useState(8); // Me guardo cuantos perros quiero por página.
    const indexOfLastDog = currentPage * dogsPerPage; // El índice del último perro de cada página va a ser el numero de la página multiplicado por la cantidad de perros por página.
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; // El índice del primer perro de cada página va a ser el índice del último de esa página menos la cantidad de perros por página.
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); // Los perros mostrados en cada página serán los que estén en la porción que va desde el primero hasta el último de cada página, de la lista total de perros.

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    // Ahora voy a traerme del estado los perros cuando el componente se monta:
    useEffect(() => {
        dispatch(getDogs()) // Este dispatch es lo mismo que hacer el mapDispatchToProps
    }, [dispatch]) // El segundo parámetro del useEffect es un array donde va todo de lo que depende el useEffect para ejecutarse.
    // Como no depende de nada se pasa vacío.
    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs())
    }

    function handleFilterTemperaments(e) {
        dispatch(filterDogsByTemperament(e.target.value))
    }

    return (
        <div>
            <Link to='/dogs' >CREAR UNA RAZA</Link>
            <h1>PI DOGS</h1>
            <button onClick={e => { handleClick(e) }} >
                Volver a cargar todos los perros
            </button>
            <div>
                <select>
                    <option value='sin' >Orden alfabético</option>
                    <option value='alf' >A - Z</option>
                    <option value='inv' >Z - A</option>
                    {/* El value me permite después cuando haga la lógica decir, si el option tiene value alf, hacé
                        tal cosa; si tiene value inv, hacé tal otra*/}
                </select>
                <select>
                    <option value='sin'>Orden por peso</option>
                    <option value='asc'>Peso ascendente</option>
                    <option value='desc'>Peso descendente</option>
                </select>
                <select onChange={e => handleFilterTemperaments(e)}>
                    <option key={0} value='all'>Todos los temperamentos</option>
                    {allTemperaments?.map(el => {
                        return (
                            <option key={el.id} value={el.name}>{el.name}</option>
                        )
                    })}
                </select>
                <select>
                    <option value='all'>Todas las razas</option>
                    <option value='existent'>Razas existentes</option>
                    <option value='created'>Razas creadas</option>
                </select>
                <hr/>

                <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
                <hr/>
                
                <div>
                    {
                        currentDogs?.map((el) => {
                            return (
                                <div key={el.id}>
                                    <Link to={'/home/' + el.id} >
                                        <Card name={el.name} image={el.image} temperament={el.temperament} weigth={el.weight} key={el.id} />
                                    </Link>
                                    <hr />
                                </div>
                            )
                        })
                    }
                </div>

                <Paginado dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado} />
            </div>
        </div>
    )

}
