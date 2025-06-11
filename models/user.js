const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
    },
    phoneNo :{
        type : String,
        required : true,
    },
    book :{
        type : String,
        required : true,
    }
})

module.exports = mongoose.model('user',userSchema);