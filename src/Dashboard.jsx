import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import './style.css';

function Dashboard () {

    const navigate = useNavigate();

    const username = useParams().username;

    const createLink = "/dashboard/" + username + "/create"

    console.log(username)


    return(
        <div>
            <h2>DashBoard Page {username}</h2>
            <Link to= {createLink} >
                <div>Create New Job</div>
            </Link>
            <button onClick ={
                () => {
                    axios.get('http://localhost:8000/api/users/logout')
                    .then(response => {
                        alert('You logged out!')
                        navigate('/')
                    })
                    .catch(error => console.log(error));
                }
            }>Log Out</button>

            <button onClick = {
                () => {
                    axios.get('http://localhost:8000/api/users/auth')
                    .then(
                        alert("UserInfo is " + username)
                    )
                    .catch(error => console.log(error))
                }
            }>Auth</button>
        </div>
    )
}

export default Dashboard;