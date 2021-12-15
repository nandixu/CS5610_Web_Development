const express = require('express')
const router = express.Router()
const Job = require('../models/job')


router.get('/', async (req, res) => {
    try{
        const jobs = await Job.find()
        res.json(jobs)
    }catch(err){
        res.status(500).json({message: err.message})
    }
}) 

router.get('/find/:jobtitle', (req, res) => {
    const jobQuery = req.params.jobtitle
    return Job.find({ "jobtitle": { "$regex": jobQuery, "$options": "i" } }).exec()
    .then(response => res.status(200).send(response))
    .catch(error => response.status(400).send(error))
})

router.get('/findexact/:jobtitle', (req, res) => {
    const jobQuery = req.params.jobtitle
    return Job.findOne({ "jobtitle": jobQuery}).exec()
    .then(response => res.status(200).send(response))
    .catch(error => response.status(400).send(error))
})

router.post('/create', (req, res) => {
    const {jobtitle, companyname, location, description, employeremailcontact, companywebsite} = req.body;

    if (!jobtitle || !companyname || !location || !description || !employeremailcontact) {
        return res.status(422).send("Missing necessary information.")
    }

    return Job.create({
        jobtitle: jobtitle,
        companyname: companyname,
        location: location,
        description: description,
        employeremailcontact: employeremailcontact,
        companywebsite: companywebsite,
        posteddate: Date.now(),
    })
    .then(
        res.status(200).send("New Job Created.")
    )
    .catch(error => res.status(422).send(error))
})

router.get('/findall', (req, res) => {
    return Job.find().exec()
    .then(response => res.status(200).send(response))
    .catch(error => response.status(400).send(error))
})


module.exports = router