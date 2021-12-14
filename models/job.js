const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    companyname: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    employeremailcontact: {
        type: String,
        require: true
    },
    companywebsite: {
        type: String,
    },
}, {
    collection: 'jobs'
})


module.exports = mongoose.model('Job', jobSchema)