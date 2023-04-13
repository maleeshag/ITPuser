const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')
// let User =require("../models/User")
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router

// //create user
// router.route("/add").post((req,res)=>{
//     const fullname=req.body.fullname;
//     const age =req.body.age;
//     const gender=req.body.age;
//     const 
// })

