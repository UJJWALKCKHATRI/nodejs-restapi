const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

//load env 
dotenv.config({path: './config/config.env'})

//load models
const Bootcamp = require('./models/Bootcamp')
const Course = require('./models/Course')

//connect to daatbase
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
})

//Read json file
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'))
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`,'utf-8'))

//import into db
const importData = async ()=>{
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        console.log('DATA IMPORTED')
        process.exit();
    } catch (err) {
        console.error(err)
    }
}
//delete data
const deleteData = async ()=>{
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        console.log('DATA Destroyed')
        process.exit();
    } catch (err) {
        console.error(err)
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}