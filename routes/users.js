const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/user");
const Job = require("../models/job")
const authentication = require('./auth.js')

// const authentication = (req, res, next) => {
//     console.log(req.session)
//     console.log("Authenticating the action, current session.username is " + req.session.username)
//     const username = req.session.username
//     if (!username) {
//         res.status(401).send('Unauthorized: No session available');
//     }else {
//         req.username = username;
//         next();
//     }
// }

//Return all users
router.get('/', async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.status(500).json({message: err.message})
    }
}) 


//New User Registration
router.post('/register', async function(req, res){
    const { username, password } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);

    if (!username || !password) {
        return res.status(422).send("Missing username: " + username + "or password:" + password)
    }

    // let exist = await User.findOne({username});
    // if (exist) {
    //     return res.status(422).send({message: "Duplicated!"})
    // }

    const exist = User.findOne({username}).exec()
    .then((userResponse) => {
        if (userResponse) {
            return res.status(422).send({message: "Username already exist."})
        }

        return User.create({
            username: username,
            password: hashedpassword,
        })
        .then((userResponse) => {
            req.username = username;
            return res.status(200).send({username, password})
        })
        .catch(error => res.status(422).send(error))

    })
    .catch((error) => res.status(500).send("Error"))

})

// const isAuth = (req, res, next) => {
//     if (req.session.isAuth) {
//         next()
//     }else{
//         res.status(400).send("Auth Wrong")
//     }
// }

//LogIn
router.post('/login', async function (req, res){
    console.log("You are about to login")
    const {username, password} = req.body
    const user = await User.findOne({username})
    if (!user) {
        return res.status(404).send({message: "Username does not exist."})
        // return res.status(404).send({message: "Username does not exist."})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(500).send({message: "Incorrect password"})
    }
    console.log("Username and password match, I am logging you in.")
    
    req.session.username = username
    console.log("Hello, " + req.session.username)

    return res.status(200).send(user)
})





//Get favorites
router.get('/:username/findfav', authentication, async (req, res) => {
    const username = req.params.username
    console.log("hello: " + req.params.username)
    const user = await User.findOne({"username": username}).exec()
    if (!user) {
        return res.status(404).send("User Not Found")
    }

    return res.status(200).send(user.favorite)
})

//Add job as favorite
router.post('/addfav', authentication, async (req, res) => {
    const {username, jobtitle} = req.body

    const job = await Job.findOne({"jobtitle": jobtitle}).exec()
    if (!job) {
        console.log("Job Not Found")
        return res.status(404).send("Job Not Found")
    }

    const user = await User.findOne({"username": username}).exec()
    if (!user) {
        console.log("User Not Found")
        return res.status(404).send("User Not Found")
    }

    console.log(user.favorite)
    const newfav = user.favorite.push(job.jobtitle)
    console.log(user.favorite)


    return User.updateOne({username: username},
        {
            $set:
                {favorite: user.favorite}
        })
        .then(response => {
            return res.status(200).send("Successfully updated")
        })
        .catch(error => res.status(422).send(error))
})

//Delete favorite job
router.post('/deletefav', authentication, async (req, res) => {
    const {username, jobtitle} = req.body

    const job = await Job.findOne({"jobtitle": jobtitle}).exec()
    if (!job) {
        return res.status(404).send("Job Not Found")
    }

    const user = await User.findOne({"username": username}).exec()
    if (!user) {
        return res.status(404).send("User Not Found")
    }

    console.log(user.favorite)
    let index = user.favorite.indexOf(jobtitle)
    if (index !== -1) {
        user.favorite.splice(index, 1)
    }
    console.log(user.favorite)


    return User.updateOne({username: username},
        {
            $set:
                {favorite: user.favorite}
        })
        .then(response => {
            return res.status(200).send("Successfully deleted")
        })
        .catch(error => res.status(422).send(error))
})

//Auth
router.get('/auth', function(req, res) {
    console.log("You passed auth middleware")
    return res.status(200).send("Authorized")
}) 


//Delete one by userid
router.delete('/delete/:id', getUser, async function(req, res) {
    try{
        await res.user.remove()
        res.json({ message: "Deleted!" })
    }catch(err){
        res.status(500).json({ message: err.messgae })
    }
})


//Log Out
router.post('/logout', function(req, res) {
    req.session.destroy()
    return res.send("Ok");
})

async function getUser(req, res, next) {
    let user
    try{
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({messgae: "Cannot find user"})
        }
    }catch(err){
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

module.exports = router;