const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


const users = require('./routs/api/users');
const posts = require('./routs/api/posts');
const profile = require('./routs/api/profile');

const app = express();

mongoose.set('useNewUrlParser', true)
//mongoose.set('useFindAndModify', true)
//mongoose.set('useCreateIndex', true)



//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());  

//passport config
require('./config/passport')(passport);

//use routes
app.use('/api/users',users);
app.use('/api/posts',posts);
app.use('/api/profile',profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running on port ${port}`));