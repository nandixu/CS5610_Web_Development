import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux'
import { Change } from './action';
import './style.css';

function Dashboard () {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const username = useParams().username;

    const createLink = "/dashboard/" + username + "/create"

    const [favorites, setFavorites] = useState([])

    //Security Check
    // function checkAuth () {
    //     axios.get("http://localhost:8000/api/users/auth")
    //         .then(response => {
    //             console.log("Auth check")
    //         })
    //         .catch(error => console.error(error));
    // }

    // useEffect(checkAuth(), [])

    function showFavorites() {
        axios.get("http://localhost:8000/api/users/" + username + "/findfav")
            .then(response => {
                setFavorites(response.data)
            })
            .catch(error => console.error(error));
    }

    const favoriteCompo = favorites.map(job => {
        return (
            <div>
                <Link to={"/jobs/findexact/" + job}>{job}</Link>
            </div>
        )
    })

    return(
        <div>
            <h3>Welcome back, {username}</h3>
            <Link to= {createLink} >
                <a className='button3'>Create New Job</a>
            </Link>
            <a className="button3" onClick ={
                () => {
                    axios.get('http://localhost:8000/api/users/logout')
                    .then(response => {
                        alert('You logged out!')
                        dispatch(Change())
                        navigate('/')
                    })
                    .catch(error => console.log(error));
                }
            }>Log Out</a>

            <a className="button3" onClick ={() => {
                showFavorites()
            }

            }>Favorite</a>
            <h3>My favorite Jobs: </h3>
            <div>
                {favoriteCompo}
            </div>
        </div>
    )
}

export default Dashboard;