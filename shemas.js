const mongoose = require("mongoose");

const RoomCleaningService = new mongoose.Schema({
    name: { 
        type:String, 
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    price: Number,
    nRooms: Number,
    roomType: String
})


const BarbingService = new mongoose.Schema({
    name: { 
        type:String, 
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    nHeads: Number,
    price: Number,
    type: String
})

const Workers = new mongoose.Schema({
    name: { 
        type:String, 
        required: true
    },
    email: {
        type: String,
        required:true
    },
    profilePhoto: String, // base64 encoded image.
    phoneNumber: {
        type: Number,
        required: true
    }
})


const CarWashService = new mongoose.Schema({
    name: { 
        type:String, 
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    },
    price: Number,
    nCars: Number
})

module.exports = { RoomCleaningService, CarWashService, Workers, BarbingService }