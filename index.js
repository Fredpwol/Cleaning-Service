require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  RoomCleaningService,
  BarbingService,
  Workers,
  CarWashService,
  UserService,
} = require("./shemas");

const RoomCleaning = mongoose.model("RoomCleaning", RoomCleaningService);
const Barbing = mongoose.model("Barbing", BarbingService);
const Worker = mongoose.model("Workers", Workers);
const CarWash = mongoose.model("CarWash", CarWashService);
const User = mongoose.model("Users", UserService);

const app = express();
const PORT = process.env.PORT || 5050;

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("db connected!")
);

app.use(express.json());

app.post("/barbing-service", async (req, res) => {
  const barbDoc = new Barbing(req.body);
  try{
    await barbDoc.save();
  }catch(error){
    res.status(200).json({ status: "data crating successful" });
  }
});

app.get("/barbing-service", async (req, res) => {
    try{
        const barbing = await Barbing.find({})
        res.status(200).json(barbing);   
    }catch(error){
        res.status(400).json({ status: "error", message: String(error) });
    }
});

app.post("/room-cleaning", async (req, res) => {
  const roomDoc = new RoomCleaning(req.body);
  try {
    await roomDoc.save();
    res.status(200).res.json({ status: "data crating successful" });
  } catch (error) {
    res.status(400).json({ status: "error", message: String(error) });
  }
});

app.get("/room-cleaning", async (req, res) => {
    try{
        const cleaning = await RoomCleaning.find({})
        res.status(200).json(cleaning);
    }catch(error){
        res.status(400).json({status: "error", message: String(error)});
    }
});
app.post("/worker", async (req, res) => {
  const worker = new Worker(req.body);
  try {
    await worker.save();
    res.status(200).json({ status: "data crating successful" });
  } catch (error) {
    res.status(400).json({ status: "error", message: String(error) });
  }
});

app.get("/worker", async (req, res) => {
  try {
    const workers = await Worker.find({});
    res.status(200).json(workers);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "error", message: String(error) });
  }
});

app.get("/car-wash", async (req, res) => {
    try{
        const carwash = await CarWash.find({});
        res.status(200).json(carwash);
    }catch(error){
        res.status(400).json({ status: "error", message: String(error) });
    }
});

app.post("/car-wash", async (req, res) => {
  const carwash = new CarWash(req.body);
  try{
    await carwash.save();
    res.status(200).json({ status: "data crating successful" });
  }catch(error){
    res.status(400).json({ status: "error", message: String(error) });
  }
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
    isAdmin: true,
  });

  if (!user) {
    return res.status(400).json({ status: "error", message: "Invalid username" });
  }
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    res.status(400).json({ status: "error", message: "Invalid password" });
  }
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);

  res.status(200).send({ token });
});


app.post("/register", async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hashed_password = bcrypt.hashSync(req.body.password, salt);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashed_password,
    isAdmin: true,
  });
  try {
    const userDoc = await user.save();
    const token = jwt.sign(
      { _id: userDoc._id, email: userDoc.email },
        process.env.SECRET
    );
    res.status(201).send({ token, email: userDoc.email });
  } catch (error) {
    res.status(400).send({ status: "error", message: String(error) });
  }
});

app.listen(PORT, () => console.log(`Server started successfully on ${PORT}`));
