const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require("../models/user");

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
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(500).send({message: "Incorrect password"})
    }
    console.log("Username and password match, I am logging you in.")
    
    req.session.username = username

    return res.status(200).send(user)
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

module.exports = router