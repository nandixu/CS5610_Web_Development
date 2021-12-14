require('dotenv').config()
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path');

const mongoString = 'mongodb://localhost/jobboard_app'
mongoose.connect(mongoString, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const jobsRouter = require('./routes/jobs')
const usersRouter = require('./routes/users')

app.use(cors());
app.use(cookieParser());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: mongoString }),
//   cookie: { 
//       maxAge: 1000 * 60,
//       secure: true 
//     }
}))

app.use('/api/users', usersRouter)
app.use('/api/jobs', jobsRouter)

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8000, () => {
    console.log("Starting server on port 8000");
})