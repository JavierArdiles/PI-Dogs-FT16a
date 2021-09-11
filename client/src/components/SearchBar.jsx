import React from "react";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../actions";

export default function SearchBar(){

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameDogs(name));
        setName('');
    }

    return (
        <div>
            <input
                type='text'
                placeholder='Search by breed...'
                onChange={e => handleInputChange(e)}
                value={name}
            />
            <button type='submit' onClick={e => handleSubmit(e)}>Fetch! 🥏</button>
        </div>
    )
}