import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'

export default function LandingPage(){
    return(
        <div className='lp'>
            <h1>Welcome to my DOG PI</h1>
            <Link to='/home'>
                <button>Enter</button>
            </Link>
        </div>
    )
}