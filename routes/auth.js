
module.exports = function (req, res, next) {

    console.log("The session username is : " + req.session.username)

    const username = req.session.username;
    if (!username) {
        res.status(401).send('Unauthorized: No session available');
    }else {
        req.username = username;
        next();
    }

}