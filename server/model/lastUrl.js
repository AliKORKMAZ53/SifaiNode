const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    baseURL: String
    
})

const lastUrldb = mongoose.model('lastUrldb', schema);

module.exports = lastUrldb;