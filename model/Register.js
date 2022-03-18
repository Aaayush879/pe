const mongoose = require('mongoose');
const registerSchema = new mongoose.Schema({
    namee: {
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
    
})
const Register = new mongoose.model('Register',registerSchema);
module.exports = Register;
