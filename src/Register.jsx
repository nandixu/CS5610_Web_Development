import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router';


function Register (props){

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        password: '',
        username: '',
    })

    return (
        <div>
            <h3>New User Registration</h3>
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
            <button
                onClick = {
                    () => {
                        axios.post('/api/users/register', userData)
                        .then(response => {
                            console.log(response.message)

                            console.log("Register successful")
                            alert("Registration Successful!")
                            navigate("/login")
                        })
                        .catch(error => {
                            console.log(error.response.data.message)
                            alert(error.response.data.message)
                        });
                    }
                }
            >Register New User</button>
        </div>
    )
}

export default Register;