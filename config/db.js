const mongoose = require('mongoose');
const config = require('config');
const dbURI = config.get('mongoURI');

const connectDB = ()=>{
    try{
        const connection = await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });

        console.log(`connected to database...`)
    }catch(err){
        console.log('there are problem with connect to database...')
    }

}


module.exports = connectDB;