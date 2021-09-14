import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import '../styles/Detail.css'
import { GiDogBowl, GiDogHouse, GiSittingDog } from 'react-icons/gi'

export default function Detail(props) {
    const dispatch = useDispatch();

    const id = props.match.params.id; // Para acceder al id del Detail

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    const myDog = useSelector((state) => state.detail);

    

    return (
        <div className='divDetail'>
            <Link to='/home'><button className='buttonHome1' id='home' >Home <GiDogHouse /></button></Link>
            <Link to='/dogs' >
                <button className='buttonHome1' >
                    Create pupper <GiSittingDog />
                </button>
            </Link>
            {
                myDog.length > 0 ?
                    <div>
                        <h1 className='name'>{myDog[0].name}</h1>
                        <ul className='asd'>
                            <li>
                                <div>
                                    <img src={myDog[0].image} alt={myDog[0].name} className='image' />
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h4 className='caracts'>Temperaments:</h4>
                                    <ul className='allTemps'>
                                        {myDog[0].createdInDb ?
                                            (myDog[0].temperaments !== [] ?
                                                myDog[0].temperaments.map(el => {
                                                    return <li key={el}><label>{el.name}</label></li>
                                                }) :
                                                'No temperaments provided for this breed') :
                                            myDog[0].temperaments ?
                                                myDog[0].temperaments.split(', ').map(el => {
                                                    return <li key={el}><label>{el}</label></li>
                                                }) :
                                                '🤷‍♂️ No temperaments provided for this breed 🤷‍♀️'}
                                    </ul>
                                    <h4 className='caracts'>Height</h4>
                                    <p>{myDog[0].heightMin} - {myDog[0].heightMax} cm</p>
                                    <h4 className='caracts'>Weight</h4>
                                    <p>{myDog[0].weightMin} - {myDog[0].weightMax} kg</p>
                                    <h4 className='caracts'>Life span</h4>
                                    <p className='last'>{myDog[0].life_span}</p>
                                </div>
                            </li>
                        </ul>
                    </div> :
                    <div className='loading'>
                        <h1><strong>Come here boy...<GiDogBowl /></strong></h1>
                    </div>
            }
        </div>
    )
}

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from "react-router-dom";
// import { getDetail } from '../actions';

// class Detail extends Component{

//     componentDidMount(){
//         const dogId = this.props.match.params.id;
//         this.props.getDetail(dogId);
//     };


//     render(){
//         return (
//             <div>
//             <Link to='/home'><button>Home</button></Link>
//             {
//                 this.props.detail.length > 0 ?
//                 <div>
//                     <h1>{this.props.detail[0].name}</h1>
//                     <img src={this.props.detail[0].image} alt={this.props.detail[0].name} />
//                     <p>Temperaments:</p>
//                     <ul>
//                         {this.props.detail[0].createdInDb ?
//                             this.props.detail[0].temperaments?.map(el => {
//                                 return <li>{el.name}</li>
//                             }) :
//                             this.props.detail[0].temperaments.split(', ').map(el => {
//                                 return <li>{el}</li>
//                             })}
//                     </ul>
//                     <h4>{`Height: ${this.props.detail[0].heightMin} - ${this.props.detail[0].heightMax} cm`}</h4>
//                     <h4>{`Weight: ${this.props.detail[0].weightMin} - ${this.props.detail[0].weightMax} kg`}</h4>
//                     <h4>{`Life span: ${this.props.detail[0].life_span}`}</h4>
//                 </div> :
//                 <p>Come here boy...</p>
//             }
//         </div>
//         )
//     }
// };

// function mapStateToProps(state){
//     return {
//         dog: state.detail,
//     };
// };

// function mapDispatchToProps(dispatch){
//     return {
//         getDetail: id => dispatch(getDetail(id)),
//     };
// };

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Detail);