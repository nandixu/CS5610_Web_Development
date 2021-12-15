import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './style.css'


function JobDetail() {
    const jobTitle = useParams().jobtitle
    const navigate = useNavigate()
    const [addFavData, setAddFavData] = useState({
        username: "",
        jobtitle: jobTitle
    })

    console.log("jobtitle: " + jobTitle)

    const [job, setJob] = useState("default")
    useEffect(findJobDetail, [])

    function findJobDetail() {
        axios.get("http://localhost:8000/api/jobs/findexact/" + jobTitle)
            .then(response => {
                console.log("resposne:" + response.data)
                setJob(response.data)
            })
            .catch(error => console.log("Could not find that Job"));
    }

    function addFavorite() {
        setAddFavData({
            ...addFavData,
            username: "nandi1"
        })
        axios.post("http://localhost:8000/api/users/addfav", addFavData)
            .then(response => {
                alert("Favorite Job Added.")
            })
            .catch(error => console.log(error))
    }

    const jobComponent = job ? 
    (<><div>
        Job Title: {job.jobtitle}
    </div>
    <div>
        Company Name: {job.companyname} 
    </div>
    <div>
        Location: {job.location} 
    </div>
    <div>
        Description: {job.description} 
    </div>
    <div>
        Employer Email Contact: {job.employeremailcontact} 
    </div>
    <div>
        Company Webite: {job.companywebsite} 
    </div>
    <div>
        Posted Date: {job.posteddate} 
    </div></>) :
    (<div> No Job found </div>);

    return(
        <div>
            <h3>Job Detail:</h3>
            {jobComponent}
            <a className="button3" onClick={
                () => {
                    navigate(-1)
                }
            }>Back</a>
            <a className="button3" onClick={
                () => {
                    addFavorite()
                }
            }>Add to Favorite</a>
        </div>
    )
}

export default JobDetail