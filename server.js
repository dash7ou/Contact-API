const express = require('express');
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

connectDB();

const users = require("./routes/users.js");
const auth = require('./routes/auth');
const contacts = require("./routes/contacts");

app.use(express.json({ extended: false }))

app.use('/api/v1/auth',users)
app.use('/api/v1/users', auth)
app.use('/api/v1/contacts', contacts)

// handle errors
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
});