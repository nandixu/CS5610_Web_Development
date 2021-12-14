import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function () {
    return(
        <div class="navbar">

            <Link className="jobboardtitle" to="/">
                <div>JobBoard</div>
            </Link>
            <Link to="/register">
                <a className='button2'>Sign Up</a>
            </Link>
            <Link to="/login">
                <a className='button2'>Log In</a>
            </Link>
        </div>
    )
}