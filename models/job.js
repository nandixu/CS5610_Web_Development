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
    salary: {
        type: String,
        require: true
    },
}, {
    collection: 'jobs'
})


module.exports = mongoose.model('Job', jobSchema)