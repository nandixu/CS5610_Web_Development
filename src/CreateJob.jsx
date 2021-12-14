import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import './style.css'

function CreateJob() {

    const username = useParams().username
    const navigate = useNavigate()

    const [jobData, setJobData] = useState({
        jobtitle: '',
        companyname: '',
        location: '',
        decription: '',
        employeremailcontact: '',
        companywebsite: ''
    })

    return(
        <div>
            <h3>Creating a new Job</h3>

            <h5>Job Title: <input value={jobData.jobtitle} onChange={ (e) => {
                const inputval = e.target.value;
                setJobData({
                    ...jobData,
                    jobtitle: inputval
                })
            }}></input></h5>

            <h5>Company name: <input value={jobData.companyname} onChange={ (e) => {
                const inputval = e.target.value;
                setJobData({
                    ...jobData,
                    companyname: inputval
                })
            }}></input></h5>

            <h5>Location: <input value={jobData.location} onChange={ (e) => {
                const inputval = e.target.value;
                setJobData({
                    ...jobData,
                    location: inputval
                })
            }}></input></h5>

            <h5>Description: <input value={jobData.description} onChange={ (e) => {
                const inputval = e.target.value;
                setJobData({
                    ...jobData,
                    description: inputval
                })
            }}></input></h5>

            <h5>Employer email contact: <input value={jobData.employeremailcontact} onChange={ (e) => {
                const inputval = e.target.value;
                setJobData({
                    ...jobData,
                    employeremailcontact: inputval
                })
            }}></input></h5>

            <h5>Company website(optional): <input value={jobData.companywebsite} onChange={ (e) => {
                const inputval = e.target.value;
                setJobData({
                    ...jobData,
                    companywebsite: inputval
                })
            }}></input></h5>

            <a className="button3" onClick = {
                    () => {
                        axios.post('http://localhost:8000/api/jobs/create', jobData)
                        .then(response => {
                            console.log(response.message)

                            console.log("New Job Created")
                            alert("New Job Created")
                            navigate("/dashboard/" + username)
                        })
                        .catch(error => {
                            console.log(error.response.data.message)
                            alert(error.response.data.message)
                        });
                    }
                }>Submit</a>


            <a className="button3" onClick={
                () => {
                    navigate('/dashboard/' + username)
                }
            }>Back</a>
            
        </div>
    )
}

export default CreateJob;