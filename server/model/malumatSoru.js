const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    kitapAdi: String,
	malumatSual : [String]
    
})

const malumatdb = mongoose.model('malumatdb', schema);

module.exports = malumatdb;