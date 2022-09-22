import express from "express"
import cors from "cors"
import mongoose, { connect, model } from "mongoose"

const app = express()
const port = process.env.port || 8080
app.use(express.urlencoded({ extended: true }))
app.use(cors())
connect('mongodb://localhost:27017/test')
    .then((v) => {
        console.log('Connected to DB!')
    })


app.get("/", (req, res) => {
    res.json({ "name": "User" })
})

app.post("/", (req, res) => {
    let a = req.query
    console.log(a)
    res.send(`Hello, ${a.name}`)
})

// Routes
/* 
GET - /loc/top
all 16 locations sorted by rating.
GET - /loc
all locations 
POST - /loc/new
create a new location from req.body
DELETE - /loc/:id
Delete that location
POST - /loc?q=query
Returns search result for that query
PATCH - /loc/:id
Updates data
*/
import { allLoactions, delLoc, newLoc, searchResults, topLocations, updateLocation } from "./models/locationModel.js"


app.get('/loc/top', async (req, res) => {
    const a = await topLocations()
    // console.log(a)
    res.json(a)
})
app.get('/loc', async (req, res) => {
    const a = await allLoactions()
    res.json(a)
})


app.post('/loc/new', async (req, res) => {
    for (let i in req.body) {
        // console.log(JSON.parse(i))
        await newLoc(JSON.parse(i))
    }
    res.send("")
})
app.delete('/loc/:id', async (req, res) => {
    console.log(`got a delete request ${req.params.id}`)
    res.json(await delLoc(req.params.id))
})
app.patch("/loc/:id", async (req, res) => {
    for (let i in req.body) {
        // console.log(JSON.parse(i))
        await updateLocation(JSON.parse(i))
    }
    res.send("")
})
app.post('/loc', async (req, res) => {
    console.log('post request recieved on loc')
    for (let i in req.body) {
        let b = JSON.parse(i).q
        // console.log(b)
        let a = await searchResults(b)
        console.log(a)
        res.json(a)
    }

})
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})