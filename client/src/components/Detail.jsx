import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Detail(props){
    console.log(props);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch]);

    const myDog = useSelector((state) => state.detail);

    return (
        <div>
            <Link to='/home'><button>Home</button></Link>
            {
                myDog.length > 0 ?
                <div>
                    <h1>{myDog[0].name}</h1>
                    <img src={myDog[0].image} alt={myDog[0].name} />
                    <p>Temperaments:</p>
                    <ul>
                        {myDog[0].createdInDb ?
                            myDog[0].temperaments?.map(el => {
                                return <li>{el.name}</li>
                            }) :
                            myDog[0].temperaments.split(', ').map(el => {
                                return <li>{el}</li>
                            })}
                    </ul>
                    <h4>{`Height: ${myDog[0].heightMin} - ${myDog[0].heightMax} cm`}</h4>
                    <h4>{`Weight: ${myDog[0].weightMin} - ${myDog[0].weightMax} kg`}</h4>
                    <h4>{`Life span: ${myDog[0].life_span}`}</h4>
                </div> :
                <p>Come here boy...</p>
            }
        </div>
    )
}