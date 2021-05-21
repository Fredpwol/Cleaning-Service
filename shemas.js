const mongoose = require("mongoose");

const UserService = new mongoose.Schema({
  username: { 
      type: String, 
      required: true, 
      min: 6, 
      max: 255,
      unique:true
     },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 8
  },
  isAdmin: {
      type: Boolean,
      default: false
  }
});

const RoomCleaningService = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  price: mongoose.Schema.Types.Decimal128,
  nRooms: Number,
  roomType: String,
});

const BarbingService = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  nHeads: Number,
  price: mongoose.Schema.Types.Decimal128,
  type: String,
});

const Workers = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profilePhoto: String, // base64 encoded image.
  phoneNumber: {
    type: Number,
    required: true,
  },
});

const CarWashService = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  price: mongoose.Schema.Types.Decimal128,
  nCars: Number,
});

module.exports = {
  RoomCleaningService,
  CarWashService,
  Workers,
  BarbingService,
  UserService
};
