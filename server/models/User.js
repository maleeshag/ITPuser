//user data model
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    // fullname:{
    //     type:String,
    //     required:true
    // },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        default: "Student"
    }],
    active: {
        type: Boolean,
        default: true
    },
    // gender:{
    //     type:String,
    //     required:true
    // },
    // address:{
    //     type:String,
    // }
})

module.exports = mongoose.model('User', userSchema)