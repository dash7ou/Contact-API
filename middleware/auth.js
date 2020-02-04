const jwt = require("jsonwebtoken");
const config = require("config");
const ErrorRespose = require("../utils/errorResponse");
const  asyncFun =require("./async");
const User = require("../models/User");

module.exports = asyncFun(function(req,res, next){
    const token = req.header('x-auth-token');
    let error
    if(!token){
        error={
            type: 'onlyMessage',
            statusCode: 401,
            message: "No token, authorization denied"
        }
        throw new ErrorRespose("", error);
    }
    try{
        const decode = jwt.verify(token, config.get("jwtSecret"));
        // const user = await User.findById(decode._id)
        req.userId = decode._id;
        next();
    }catch(err){
        error = {
            type: 'onlyMessage',
            statusCode: 401,
            message: 'Not authorize to access this route'
        }
        return next(new ErrorRespose("", error))
    }

})