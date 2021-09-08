import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getTemperaments, postDog } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function DogCreate() {

    const dispatch = useDispatch();
    const history = useHistory();
    const allTemperaments = useSelector((state) => state.temperaments);

    const [input, setInput] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_span: '',
        image: '',
        temperaments: [],
    });

    useEffect(() => {
        dispatch(getTemperaments());
    });

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        console.log(input);
    }
    // Esta función hace lo siguiente:
    // cada vez que modifique agregue algo, a mi estado input, además de lo que tiene, agregale
    // el value de lo que esté modificando. La idea es que a medida que vaya llenando los inputs
    // del formulario, me vaya modificando el estado inicial, que tiene todas las propiedades vacías.

    function handleSelect(e) {
        setInput({
            ...input,
            temperaments: [...input.temperaments, e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        dispatch(postDog(input));
        alert('Pichicho creado 👏');
        setInput({
            name: '',
            heightMin: '',
            heightMax: '',
            weightMin: '',
            weightMax: '',
            life_span: '',
            image: '',
            temperaments: [],
        });
        history.push('/home');
    }

    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>🐕 Crea tu raza de perro 🐶</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre</label>
                    <input type='text' value={input.name} name='name' onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>Altura mínima (cm)</label>
                    <input type='text' value={input.heightMin} name='heightMin' onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>Altura máxima (cm)</label>
                    <input type='text' value={input.heightMax} name='heightMax' onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>Peso mínimo (kg)</label>
                    <input type='text' value={input.weightMin} name='weightMin' onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>Peso máximo (kg)</label>
                    <input type='text' value={input.weightMax} name='weightMax' onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>Años de vida</label>
                    <input type='text' value={input.life_span} name='life_span' onChange={e => handleChange(e)} />
                </div>
                <div>
                    <label>Imagen</label>
                    <input type='text' value={input.image} name='image' onChange={e => handleChange(e)} />
                </div>
                <div>
                    <select onChange={e => handleSelect(e)}>
                        {allTemperaments?.map(temp => {
                            return (
                                <option value={temp.name} key={temp.id}>{temp.name}</option>
                            )
                        })}
                    </select>
                    <ul><li>{input.temperaments.map(el => el + ', ')}</li></ul>
                </div>
                <button type='submit'>Crear firulais</button>

            </form>
        </div>
    )
}
// Nombre
// Altura (Diferenciar entre altura mínima y máxima)
// Peso (Diferenciar entre peso mínimo y máximo)
// Años de vida
// [ ] Posibilidad de seleccionar/agregar uno o más temperamentos
// [ ] Botón/Opción para crear una nueva raza de perro