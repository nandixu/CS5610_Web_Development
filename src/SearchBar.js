import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import { Link } from 'react-router-dom';
import "./style.css"

export default function () {
    const [formInput, setFormInput] = useState('');
    const [jobFound, setJobFound] = useState({
        jobtitle: 'No job Found',
        companyname: '',
        location: '',
        description: '',
        employeremailcontact: '',
        companywebsite: '',
    })
    const [errorMsg, setErrorMsg] = useState(null);

    const [allJobs, setAllJobs] = useState([]);
    const [foundJobs, setFoundJobs] = useState([]);

    // function findAllJobs(){
    //     axios.get("http://localhost:8000/api/jobs/findall")
    //         .then(response => {
    //             setAllJobs(response.data)
    //         })
    //         .catch(error => console.error(error));
    // }

    // useEffect(findAllJobs, [])

    // const jobListComponent = allJobs.map(job => {
    //     return (
    //         <div>
    //             <Link to={"/jobs/find/" + job.jobtitle}>{job.jobtitle}</Link>
    //         </div>
    //     )
    // })

    function findJobs(){
        if (!formInput) {
            setErrorMsg("You must type in a single word text.")
            return;
        }
        axios.get("/api/jobs/find/" + formInput)
        .then(response => {
            console.log(response.data)
            setFoundJobs(response.data)
        })
        .catch(error => console.error(error));
    }

    const jobListComponent = foundJobs.map(job => {
        return (
            <div>
                <Link className='searchResult' to={"/jobs/findexact/" + job.jobtitle}>{job.jobtitle}</Link>
            </div>
        )
    })

    function onSearchButtionClick() {

        if (!formInput) {
            setErrorMsg("You must type in a single word text.")
            return;
        }

        axios.get('/api/jobs/search/' + formInput)
        .then(response => {
            console.log(allJobs)
        })
        .catch(error => setJobFound({
            jobtitle: 'No job Found',
            companyname: '',
            location: '',
            description: '',
            employeremailcontact: '',
            companywebsite: '',
        }))

        console.log("You clicked search bar button.")
    }

    // function clickTest() {
    //     console.log("You clicked search bar button.")
    // }

    return (
        <div>
            <input type='text' value = {formInput}
            onChange = {(e) => {
                setErrorMsg(null)
                setFormInput(e.target.value)
            }} ></input>
            <button onClick={findJobs}>Search</button>
            <div>
                <h3>Search Results:</h3>
                {jobListComponent}
            </div>
        </div>
    )
}