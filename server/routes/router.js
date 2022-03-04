const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes); //before this there will be login page

route.get('/ibare', services.homeIbare);

route.get('/malumat', services.homeMalumat);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

route.get('/add-ibare', services.add_ibare)

route.get('/add-malumat', services.add_malumat)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)

route.get('/update-ibare', services.update_ibare)

route.get('/update-malumat', services.update_malumat)


// API user
route.post('/api/users/login', controller.findUnamePassword);
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

// API ibare
route.post('/api/ibare', controller.createIbare);
route.get('/api/ibare', controller.findIbare);
route.post('/api/ibare/random', controller.randomIbare);
route.post('/api/ibare/:id', controller.updateIbare);
route.delete('/api/ibare/:id', controller.deleteIbare);

// API malumat
route.post('/api/malumat', controller.createMalumat);
route.get('/api/malumat', controller.findMalumat);
route.post('/api/malumat/random', controller.randomMalumat);
route.post('/api/malumat/:id', controller.updateMalumat);
route.delete('/api/malumat/:id', controller.deleteMalumat);

// API kitaplar
route.get('/api/kitap', controller.findKitap);






module.exports = route