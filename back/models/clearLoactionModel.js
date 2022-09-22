import { locationModel } from "./locationModel.js";
import mongoose, { connect, model } from "mongoose"

await connect('mongodb://localhost:27017/test')
    .then((v) => {
        console.log('Connected to DB!')
    })

await locationModel.deleteMany({})
.then(()=>{
    console.log('successfull done')
})