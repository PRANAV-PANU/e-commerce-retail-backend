// routes to all the files comes here
const express = require('express');
const router = express.Router();
const helper = require('../controller/services.js');

//get Request to get all users data - half completed
router.get('/users',helper.getAllUsers);

//get request for user to login - done
router.get('/login',helper.loginUser); 

//post request for user to register - done
router.post('/signup',helper.registerUser);

//delete request to delete the username - done
router.delete('/user/:username',helper.deleteUser);

//post request to add products - done
router.post('/product',helper.addProduct);

//get request to get all products - done
router.get('/product',helper.getAllProducts);

//get request  to get all tablet products - done
router.get('/tablets',helper.getTablets);

//get request to get all mobile products - done
router.get('/mobiles',helper.getMobiles);

//get request to get All the Carts - done
router.get('/carts',helper.getAllCarts);

//get request to get the carts of the username - done
router.get('/carts/:username',helper.getUserCarts);

//post request to add the cart to the user - done
router.post('/carts',helper.addToCart);

//put request to add to users cart - done
router.put('/carts/:username',helper.addToUserCart);

//post request to place the order for the user 
router.post('/orders/:username',helper.placeOrder);

//delete request to delete the product - done
router.delete('/products/:productName',helper.deleteProduct);

//to handle the invalid routes - done
router.all('*',helper.default);
module.exports = router;