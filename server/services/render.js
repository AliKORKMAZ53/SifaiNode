const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.homeIbare = (req, res) => {
	axios.get('http://localhost:3000/api/ibare')
	.then(function(response){
		res.render('ibare', { ibareler : response.data });
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

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.update_ibare = (req, res) =>{
    axios.get('http://localhost:3000/api/ibare', { params : { id : req.query.id }})
        .then(function(response){
            res.render("update_ibare", { ibareler : response.data})
        })
        .catch(err =>{
            res.send(err);
        })
}