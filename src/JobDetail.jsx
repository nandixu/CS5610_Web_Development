import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { useNavigate } from 'react-router';
import './style.css'


function JobDetail() {
    const isLoggedIn = useSelector(state => state.LogInState)
    const username = useSelector(state => state.UserNameState)

    const jobTitle = useParams().jobtitle
    const navigate = useNavigate()
    const [addFavData, setAddFavData] = useState({
        username: username,
        jobtitle: jobTitle
    })
    const [deleteJobData, setDeleteJobData] = useState({
        jobtitle: jobTitle
    })

    console.log("jobtitle: " + jobTitle)

    const [job, setJob] = useState("default")
    useEffect(findJobDetail, [])

    function findJobDetail() {
        axios.get("/api/jobs/findexact/" + jobTitle)
            .then(response => {
                setJob(response.data)
            })
            .catch(error => console.log("Could not find that Job"));
    }

    function addFavorite() {
        setAddFavData({
            ...addFavData,
            username: username
        })
        axios.post("/api/users/addfav", addFavData)
            .then(response => {
                alert("Favorite Job Added.")
            })
            .catch(error => console.log(error))
    }

    function deleteJob() {
        setDeleteJobData({
            jobtitle: jobTitle
        })
        axios.delete("/api/jobs/delete", deleteJobData)
        .then(response => {
            alert("Job Deleted.")
        })
        .catch(error => console.log(error))
    }

    const [sectionCompo, setSectionCompo] = useState(
        <div>
        </div>
    )

    useEffect( () => {
        changesection()
    }, [isLoggedIn])

    function changesection () {
        if (isLoggedIn) {
            if (job.creator == username) {
                setSectionCompo(
                    <div>
                        <div>
                        <a className="button3" onClick={
                            () => {
                                addFavorite()
                            }
                        }>Add to Favorite</a>

                        <a className="button3" onClick={
                            () => {
                                deleteJob()
                                navigate('/')
                            }
                        }>Delete the Job</a>
                        </div>
                    </div>)
            }else {
                setSectionCompo(
                    <div>
                        <a className="button3" onClick={
                        () => {
                            addFavorite()
                        }
                    }>Add to Favorite</a>
                    </div>)
            }

        }else{
            setSectionCompo(
            <div>
            </div>)
        }
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
    </div>
    <div>
        Creator: {job.creator} 
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
            <div>
                {sectionCompo}
            </div>
        </div>
    )
}

export default JobDetail