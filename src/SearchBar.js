import { useState } from 'react';
import axios, { Axios } from 'axios';

export default function () {
    const [formInput, setFormInput] = useState('');
    const [jobFound, setJobFound] = useState({
        name: 'No job Found',
        salary: 0,
    })
    const [errorMsg, setErrorMsg] = useState(null);

    function onSearchButtionClick() {

        // if (!formInput) {
        //     setErrorMsg("You must type in a single word text.")
        //     return;
        // }

        axios.get('/api/jobs')
        .then(response => setJobFound(response.data))
        .catch(error => setJobFound({
            name: "No Job Found",
            salary: 0,
        }))

        console.log("You clicked search bar button.")
    }

    return (
        <div>
            <input type='text' value = {formInput}
            onChange = {(e) => {
                setErrorMsg(null)
                setFormInput(e.target.value)
            }} />
            <button onClick={onSearchButtionClick}>
                Search
            </button>
            <div>
                Found Job Name: {jobFound.name}
            </div>
            <div>
                Found Job Salary: {jobFound.salary}
            </div>
        </div>
    )
}