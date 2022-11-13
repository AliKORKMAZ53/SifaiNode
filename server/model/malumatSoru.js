const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    kitapAdi: String,
	malumatSual : String,
	kategori: String
    
})

const malumatdb = mongoose.model('malumatdb', schema);

module.exports = malumatdb;