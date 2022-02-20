const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    userName : {
        type : String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    yurt : String
	})


const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;