const express = require('express');
const app = express();


const users = require("./routes/users.js");
const auth = require('./routes/auth');
const contacts = require("./routes/contacts");


app.use('/api/v1/auth',users)
app.use('/api/v1/users', auth)
app.use('/api/v1/contacts', contacts)


const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
});