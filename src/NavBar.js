import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Change } from './action';
import './style.css';

export default function () {

    //This is test part
    const [token, setToken] = useState("1")

    const [tokenCompo, setTokenCompo] = useState(<div>
        Test Token Compo
    </div>)

    function change() {
        if (token == "1") {
            setToken("2")
            setTokenCompo(<div>
                <h3>It is One</h3>
            </div>)
            // tokenCompo = 
            // <div>
            //     <h3>It is One</h3>
            // </div>
        }else{
            setToken("1")
            setTokenCompo(<div>
                <h3>It is Two</h3>
            </div>)
            // tokenCompo = 
            // <div>
            //     <h3>It is Two</h3>
            // </div>
        }
    }
    //Test part ends


    const isLoggedIn = useSelector(state => state.LogInState)
    const username = useSelector(state => state.UserNameState)
    console.log("UserNameState in dashboard is :" + username)
    const dispatch = useDispatch();

    useEffect( () => {
        changesection()
    }, [isLoggedIn, username])


    const [sectionCompo, setSectionCompo] = useState(
        <div>
            <Link to="/register">
                <a className='button2'>Sign Up</a>
            </Link>
            <Link to="/login">
                <a className='button2'>Log In</a>
            </Link>
        </div>
    )

    function changesection () {
        if (isLoggedIn) {
            setSectionCompo(
            <div>
                <Link to={"/dashboard/" + username}>
                    <a className='button2'>{username}</a>
                </Link>
            </div>)

        }else{
            setSectionCompo(
            <div>
                <Link to="/register">
                <a className='button2'>Sign Up</a>
                </Link>
                <Link to="/login">
                <a className='button2'>Log In</a>
                </Link>
            </div>)
        }
    }

    function changeGlobal () {
        console.log(isLoggedIn)
        dispatch(Change())
        console.log("You cliecked the change Global button")
    }

    function showUserName() {
        console.log(username)
    }


    return(
        <div class="navbar">

            <Link className="jobboardtitle" to="/">
                <div>JobBoard</div>
            </Link>
            <div>
                {sectionCompo}
            </div>

            <button onClick = {showUserName}>
                Show
            </button>

            <button onClick = {changeGlobal}>
                change global state
            </button>

            <div>
                {tokenCompo}
            </div>


        </div>
    )
}