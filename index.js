require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const { RoomCleaningService, BarbingService, Workers, CarWashService } = require("./shemas")

const RoomCleaning = mongoose.model("RoomCleaning", RoomCleaningService)
const Barbing = mongoose.model("Barbing", BarbingService)
const Worker = mongoose.model("Workers", Workers)
const CarWash = mongoose.model("CarWash", CarWashService)


const app = express()
const PORT = process.env.PORT || 5050

app.use(express.json())

app.post("/barbing-service", (req, res) => {
    const barbDoc = new Barbing(req.body)
    barbDoc.save()
    res.status(200)
    res.json({status: "data crating successful"})
})

app.get("/barbing-service", (req, res) => {
    res.status(200).json(Barbing.find())
})

app.post("/room-cleaning", (req, res) => {
    const roomDoc = new RoomCleaning(req.body)
    roomDoc.save()
    res.status(200)
    res.json({status: "data crating successful"})
})

app.get("/room-cleaning", (req, res) => {
    res.status(200).json(RoomCleaning.find())
})
app.post("/worker", (req, res) => {
    const worker = new Worker(req.body)
    worker.save()
    res.status(200)
    res.json({status: "data crating successful"})
})
app.get("/worker", (req, res)=> {
    res.status(200).json(Worker.find())
})

app.get("/car-wash", (req, res) => {
    res.status(200).json(CarWash.find())
})

app.post("/car-wash", (req, res) => {
    const carwash = new CarWash(req.body)
    carwash.save()
    res.status(200)
    res.json({status: "data crating successful"})
})

mongoose.connect(process.env.DATABASE_URL, () => console)



app.listen(PORT, () => console.log(`Server started successfully on ${PORT}`))