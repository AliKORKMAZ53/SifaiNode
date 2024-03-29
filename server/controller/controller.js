var Userdb = require('../model/user');
var ibaredb= require('../model/ibare');
var malumatdb= require('../model/malumatSoru');
var lastUrldb = require('../model/lastUrl');
var {logger} = require('./log');

//RETURN BASE URL
exports.getBASEURL = (req,res)=>{
		
		
		lastUrldb.find()
            .then(feedback => {
                res.send(feedback)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving url information" })
            })
		
		
}

//POST BASE URL
exports.postBASEURL = (req,res)=>{
		if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
		}
		
		
		const baseURL = new lastUrldb({
        baseURL : req.body.baseURL
    })
	
	baseURL
        .save(baseURL)
        .then(data => {
            res.status(200).send({message: "New url added successfully"}); 
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a URL"
            });
        });
			
}


// create and save new ibare
exports.createIbare = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new ibare
    const ibare = new ibaredb({
        kitapAdi : req.body.kitapAdi,
        sayfa : req.body.sayfa,
        ibareMetni : req.body.ibareMetni
    })
	
	if(Array.isArray(req.body.terkipSoru)){
		ibare.terkipSoru=req.body.terkipSoru;
	}else if(typeof req.body.terkipSoru == 'string'){
		ibare.terkipSoru.push(req.body.terkipSoru);
	}else{
	res.status(500).send({ message: "terkipSoru type error" });
	}
	
	
	if(Array.isArray(req.body.kelimeSoru)){
		ibare.kelimeSoru=req.body.kelimeSoru;
	}else if(typeof req.body.kelimeSoru == 'string'){
		ibare.kelimeSoru.push(req.body.kelimeSoru);
	}else{
	res.status(500).send({ message: "kelimeSoru type error" });
	}
	
	

        
    // save user in the database
    ibare
        .save(ibare)
        .then(data => {
            //res.send(data)
            res.redirect('/add-ibare'); //will be created
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// Update a new idetified user by user id
exports.updateIbare = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

	console.log(req.body);
    const id = req.params.id;
	
	
    ibaredb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update ibare with ${id}. Maybe ibare not found!`})
            }else{
              
				res.send('<b> Başarılı </p> <hr> <a href="/ibare"><i class="fas fa-angle-double-left"></i> Tüm İbarelere Dön</a>')

            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update ibare information"})
        })
}

// retrieve and return all users/ retrive and return a single user
exports.findIbare = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        ibaredb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })

    }else{
        ibaredb.find()
            .then(ibare => {
                res.send(ibare)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// random ibare
exports.randomIbare = (req, res)=>{
	console.log(req.body);
    if(req.body){
        const kitapadi = req.body.kitapAdi;
		ibaredb.collection.aggregate([
    { $match: { kitapAdi: kitapadi } },
    { $sample: { size: 1 } }
	]).toArray()
      .then(docs => {console.log("all documents", JSON.stringify(docs[0]));
	  res.send(JSON.stringify(docs[0]));});
        
    }else{
       res.status(500).send({ message : "Bu isimde bir kitap bulunamadi" })
    }

    
}




// Delete a user with specified user id in the request
exports.deleteIbare = (req, res)=>{
    const id = req.params.id;

    ibaredb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}
//----------------------------------------------------------------
// create and save new malumat
exports.createMalumat = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new malumat
    const malumat = new malumatdb({
        kitapAdi : req.body.kitapAdi,
        malumatSual : req.body.malumatSual,
		kategori : req.body.kategori
    })

    // save user in the database
    malumat
        .save(malumat)
        .then(data => {
            //res.send(data)
            res.redirect('/add-malumat'); //will be created
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}


exports.findMalumat = (req, res)=>{

    if(req.query.id){ // REQ QUERY'e kitapAdi eklenebilir
        const id = req.query.id;

        malumatdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        malumatdb.find()
            .then(malumat => {
                res.send(malumat)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// random malumat
exports.randomMalumat = (req, res)=>{
	console.log(req.body);
    if(req.body){
        const kitapadi = req.body.kitapAdi;
		const kategori = req.body.kategori;
		var randomMalumat= malumatdb.collection.aggregate([
    { $match: {"$and": [{ kitapAdi: kitapadi}, { kategori: kategori}] } },
    { $sample: { size: 1 } }
	]).toArray()
      .then(docs => {console.log("all documents", JSON.stringify(docs[0]));
	  res.send(JSON.stringify(docs[0]));});
	
    }else{
       res.status(500).send({ message : "Bu isimde bir kitap bulunamadi" })
    }

    
}

// Update a new idetified user by user id
exports.updateMalumat = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    malumatdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe malumat not found!`})
            }else{
                res.send('<b> Başarılı </p> <hr> <a href="/malumat"><i class="fas fa-angle-double-left"></i> Tüm Malumatlara Dön</a>')
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information 2"})
        })
}

exports.postMalumatKategori = (req, res)=>{
	const kitapadi = req.body.kitapAdi;
	const kategori = req.body.kategori;
	malumatdb.collection.aggregate([
	{$match: { "kitapAdi" : kitapadi }
	},
	{ $sortByCount: "$kategori" } ,
		{
        $project:{ // Project documents in this format
            "kitapAdi" : kitapadi,
            "kategori" : kategori
        }
    }

	

	/*
	{
	$group : { "_id" : "kategori" , "count": { "$sum": 1 } }
	}
	
	,
		{
        $project:{ // Project documents in this format
            "kitapAdi" : kitapadi,
            "kategori" : kategori
        }
    }*/
	
]).toArray()
      .then(docs => {console.log("all documents", JSON.stringify(docs));
	  res.send(JSON.stringify(docs));});
	
}

// Delete a malumat with specified malumat id in the request
exports.deleteMalumat = (req, res)=>{
    const id = req.params.id;

    malumatdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Malumat is deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Malumat with id=" + id
            });
        });
}
//----------------------------------------------------------------


// Sort kitaplar from ibare
exports.findKitap = (req, res)=>{

    ibaredb.collection.aggregate([
    { $sortByCount: '$kitapAdi' }
]).toArray()
      .then(docs => {console.log("all documents", JSON.stringify(docs));
	  res.send(JSON.stringify(docs));});
	
    
}

//----------------------------------------------------------------
// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Userdb({
        userName : req.body.userName,
        password : req.body.password,
        yurt: req.body.yurt
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

//username and password check
exports.findUnamePassword = (req, res)=>{
	if(req.body){
        const username = req.body.username;
		const _password = req.body.password;
   
        Userdb.findOne({ userName: username, password: _password })
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : err.message || "Kullanıcı adı veya şifre hatalı"})
                }else{
                    res.status(200).send({ message : "success" })
                }
            })
            .catch(err =>{
                res.status(500).send({ message: err.msg})
            })

    }else{
        
                res.status(500).send({ message : "Eksik veya hatalı giriş" })
            
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}