const errorHandler = (err, req, res, next)=>{
    const {errorObj: {type, errors,message, statusCode}} = err;

    if(type === 'validationError'){
        res.status(statusCode).send({error: `${errors[0].msg}`})
    }
    if(type === 'onlyMessage'){
        res.status(statusCode).send({error: message})
    }
}


module.exports = errorHandler;