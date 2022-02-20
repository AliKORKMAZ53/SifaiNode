const mongoose = require('mongoose');


var schema = new mongoose.Schema({
    kitapAdi: String,
	sayfa : Number,
	ibareMetni : {
        type : String,
        required: true
    },
	terkipSoru : [String],
	kelimeSoru : [String]
	
    
    
});

const ibaredb = mongoose.model('ibaredb', schema);

module.exports = ibaredb;