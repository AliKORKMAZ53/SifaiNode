const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config( { path : '../config.env'} )

exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get(`${process.env.URL}/api/users`)
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        }) 
}

exports.homeIbare = (req, res) => {
	axios.get(`${process.env.URL}/api/ibare`)
	.then(function(response){
		res.render('ibare', { ibareler : response.data });
	})
	.catch(err=>{
		res.send(err);
	})
	
}

exports.homeMalumat = (req, res) => {
	axios.get(`${process.env.URL}/api/malumat`)
	.then(function(response){
		res.render('malumat', { malumatlar : response.data });
	})
	.catch(err=>{
		res.send(err);
	})
	
}

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.add_ibare = (req, res) =>{
    res.render('add_ibare');
}

exports.add_malumat = (req, res) =>{
    res.render('add_malumat');
}

exports.update_user = (req, res) =>{
    axios.get(`${process.env.URL}/api/users`, { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.update_ibare = (req, res) =>{
    axios.get(`${process.env.URL}/api/ibare`, { params : { id : req.query.id }})
        .then(function(response){
            res.render("update_ibare", { ibareler : response.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.update_malumat = (req, res) =>{
    axios.get(`${process.env.URL}/api/malumat`, { params : { id : req.query.id }})
        .then(function(response){
            res.render("update_malumat", { malumatlar : response.data})
        })
        .catch(err =>{
            res.send(err);
        })
}