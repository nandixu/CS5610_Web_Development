import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { Change, SaveUserName } from './action';

function LogIn () {

    let userNameState = useSelector(state => state.userNameState)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        password: '',
        username: '',
    })
    

    return(
        <div>
            <h3>Log In</h3>
            <h5>UserName:</h5>
            <input value={userData.username} onChange={(e) => {
                const username = e.target.value;
                setUserData({
                    ...userData,
                    username:username
                })
            }}/>
            <h5>Password:</h5>
            <input value={userData.password} onChange={(e) => {
                const password = e.target.value;
                setUserData({
                    ...userData,
                    password: password
                })
            }}/>
            <button onClick = {
                () => {
                    console.log("You clicked log in button!")
                    axios.post("/api/users/login", userData)
                    .then(response => {
                        
                        console.log(response)
                        console.log("You logged in!")
                        alert("You logged in! " + response.data.username)
                        dispatch(Change())
                        dispatch(SaveUserName(response.data.username))
                        console.log("UserNameState is :" + userNameState)
                        navigate('/dashboard/' + response.data.username)
                    })
                    .catch(error => {
                        alert(error.response.data.message)
                        console.log(error)
                    });
                }
            }
                >Log In</button>
                
        </div>
    )
}

export default LogIn;