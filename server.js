const express = require('express');
const mongoose = require('mongoose');

const users = require('./routs/api/users');
const posts = require('./routs/api/posts');
const profile = require('./routs/api/profile');

const app = express();

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.get('/',(req,res) => res.send('Hellow '));


//use routes
app.use('/api/users',users);
app.use('/api/posts',posts);
app.use('/api/profile',profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Running on port ${port}`));