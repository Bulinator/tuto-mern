const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");

// load route
const users = require("./routes/api/users");

const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database configuration
const db = require('./config/keys').mongoURI;
mongoose.connect(db, { 
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB successfully connected'))
    .catch(error => console.log('Error: ', error));



// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is up and running and port ${PORT}`)
});

