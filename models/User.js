const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true,
        minlength: 6,
        select: false
    }
},{
    timestamps: true 
});

UserSchema.pre('save', async function(next){
    const { password } = this;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


UserSchema.methods.getUserToken = function (){
    return jwt
    .sign(
        { _id: this._id.toString() },
            config.get('jwtSecret'),{
           expiresIn: +config.get('jwtExpire')       }
      );

}


UserSchema.methods.matchPassword = function(enterPassword){
    return bcrypt.compare(enterPassword, this.password);
}


module.exports = mongoose.model('User', UserSchema)