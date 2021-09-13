import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getTemperaments, postDog } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import '../styles/DogCreate.css'
import { GiDogHouse } from 'react-icons/gi';
import { IoPaw } from 'react-icons/io5'
import '../styles/DogCreate.css'

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Your breed must have a name.';
    }
    else if (input.name.length > 30) {
        errors.name = 'That´s way too long a name. Keep it simple!!';
    }
    else if (!input.heightMin) {
        errors.heightMin = 'Minimum height is required!!';
    }
    else if (isNaN(parseInt(input.heightMin))) {
        errors.heightMin = 'Height should be a number.';
    }
    else if (input.heightMin <= 0) {
        errors.heightMin = 'Your breed can´t be shorter than 0.';
    }
    else if (parseInt(input.heightMin) >= parseInt(input.heightMax)) {
        errors.heightMin = 'Minimum height should be lower than maximum height.';
    }
    else if (!input.heightMax) {
        errors.heightMax = 'Maximum height is required!!';
    }
    else if (isNaN(parseInt(input.heightMax))) {
        errors.heightMax = 'Height should be a number.';
    }
    else if (input.heightMax > 150) {
        errors.heightMax = 'I think 150cm is enough for a dog´s height, don´t you? 📏';
    }
    else if (!input.weightMin) {
        errors.weightMin = 'Minimum weight is required!!';
    }
    else if (isNaN(parseInt(input.weightMin))) {
        errors.weightMin = 'Weight should be a number.';
    }
    else if (input.weightMin <= 0) {
        errors.weightMin = 'Your breed must weight at least more than nothingness.';
    }
    else if (!input.weightMax) {
        errors.weightMax = 'Maximum weight is required!!';
    }
    else if (isNaN(parseInt(input.weightMax))) {
        errors.weightMax = 'Weight should be a number.';
    }
    else if (input.weightMax <= input.weightMin) {
        errors.weightMax = 'Maximum weight should be higher than minimum weight.';
    }
    else if (input.weightMax > 200) {
        errors.weightMax = 'We are creating a dog, not an elephant 🐘!! Keep your weight under 200.';
    }
    else if (!input.life_span) {
        errors.life_span = 'Life span is required!!';
    }
    else if (isNaN(parseInt(input.life_span))) {
        errors.life_span = 'Life span should be a number.';
    }
    else if (input.life_span > 50) {
        errors.life_span = 'Saddly, dogs don´t live that long 😥';
    }
    else if (input.life_span <= 0) {
        errors.life_span = 'You don´t want your dog to live???? 😮';
    }

    return errors;
}

export default function DogCreate() {

    const dispatch = useDispatch();
    const history = useHistory();
    const allTemperaments = useSelector((state) => state.temperaments);

    const [errors, setErrors] = useState({});

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
        // Esta función hace lo siguiente:
        // cada vez que modifique o agregue algo, a mi estado input, además de lo que tiene, agregale
        // el value de lo que esté modificando. La idea es que a medida que vaya llenando los inputs
        // del formulario, me vaya modificando el estado inicial, que tiene todas las propiedades vacías.

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));

        console.log(input)
    }

    function handleSelect(e) {
        if (!input.temperaments.includes(e.target.value)) {
            setInput({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            });
            console.log(input);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(errors);
        if (!Object.getOwnPropertyNames(errors).length && input.name && input.heightMin && input.heightMax && input.weightMin && input.weightMax && input.life_span && input.temperaments.length) {
            dispatch(postDog(input));
            alert('Doggie created 👏');
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
            history.push('/home'); // Metodo del router que me redirige a la ruta que le paso. Functiona como Link.
        } else {
            alert('Doggie can´t be created with these data 🤷‍♂️')
        }
    }

    function handleDeleteTemperament(el) {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(temp => temp !== el)
        })
    }

    return (
        <div className='divCreate'>
            <Link to='/home'><button className='buttonHome'>Home <GiDogHouse /></button></Link>
            <h1 className='title'>🐕 Create your own dog breed 🐶</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label><strong>Name: </strong></label>
                    <input type='text' value={input.name} name='name' onChange={e => handleChange(e)} />
                    {errors.name && (
                        <p className='error'><strong>{errors.name}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Minimum height: </strong></label>
                    <input type='text' value={input.heightMin} name='heightMin' onChange={e => handleChange(e)} />
                    <label><strong> cm</strong></label>
                    {errors.heightMin && (
                        <p className='error'><strong>{errors.heightMin}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Maximum height: </strong></label>
                    <input type='text' value={input.heightMax} name='heightMax' onChange={e => handleChange(e)} />
                    <label><strong> cm</strong></label>
                    {errors.heightMax && (
                        <p className='error'><strong>{errors.heightMax}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Minimum weight: </strong></label>
                    <input type='text' value={input.weightMin} name='weightMin' onChange={e => handleChange(e)} />
                    <label><strong> kg</strong></label>
                    {errors.weightMin && (
                        <p className='error'><strong>{errors.weightMin}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Maximum weight: </strong></label>
                    <input type='text' value={input.weightMax} name='weightMax' onChange={e => handleChange(e)} />
                    <label><strong> kg</strong></label>
                    {errors.weightMax && (
                        <p className='error'><strong>{errors.weightMax}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Expected life span: </strong></label>
                    <input type='text' value={input.life_span} name='life_span' onChange={e => handleChange(e)} />
                    <label><strong> years</strong></label>
                    {errors.life_span && (
                        <p className='error'><strong>{errors.life_span}</strong></p>
                    )}
                </div>
                <div>
                    <label><strong>Image: </strong></label>
                    <input type='text' value={input.image} name='image' onChange={e => handleChange(e)} />
                </div>
                <div>
                    <select onChange={e => handleSelect(e)} >
                        <option value='' disabled selected hidden >Temperaments</option>
                        {allTemperaments?.sort(function (a, b) {
                            if (a.name < b.name) return -1;
                            if (a.name > b.name) return 1;
                            return 0;
                        }).map(temp => {
                            return (
                                <option value={temp.name} key={temp.id}>{temp.name}</option>
                            )
                        })}
                    </select>

                    {input.temperaments.map(el => {
                        return (
                            
                                <ul className='allTemps'>
                                    <li>
                                        <p className='temp'><strong>{el}</strong></p>
                                        <button onClick={() => handleDeleteTemperament(el)} className='x' >X</button>
                                    </li>
                                </ul>
                            
                        )
                    })}

                </div>
                <button type='submit' className='boop' ><strong>Boop  <IoPaw/></strong></button>

            </form>

        </div>
    )
}
