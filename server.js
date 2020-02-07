const express = require('express');
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

connectDB();

const users = require("./routes/users.js");
const auth = require('./routes/auth');
const contacts = require("./routes/contacts");

app.use(express.json({ extended: false }))

app.use('/api/v1/auth',auth)
app.use('/api/v1/users', users)
app.use('/api/v1/contacts', contacts)

// server static assets in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder...
    app.use(express.static('client/build'))

    app.use('*', (req, res)=> res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

// handle errors
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
});