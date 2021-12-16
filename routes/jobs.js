const express = require('express')
const router = express.Router()
const Job = require('../models/job')
const authentication = require('./auth.js')


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

router.post('/create', authentication, (req, res) => {
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
        creator: req.session.username
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

router.delete('/delete', (req, res) => {
    const {jobtitle} = req.body
    const job = Job.find({jobtitle: jobtitle})
    if (!job) {
        return res.status(404).send("Job Not Found")
    }

    console.log(jobtitle)

    return Job.deleteOne({jobtitle: jobtitle})
    .then(res.status(200).send(jobtitle + " is deleted."))
    .catch(error => response.status(400).send(error))
})


module.exports = router