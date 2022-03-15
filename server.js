const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
//route files
const bootcamps = require('./routes/bootcamps');
const req = require('express/lib/request');
const { connect } = require('./routes/bootcamps');

dotenv.config({path: './config/config.env'})

connectDB();


const app  = express();

//Body Parser

app.use(express.json());


//middleware
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', bootcamps)

app.use(errorHandler)

const PORT = process.env.PORT || 8000

const NODE_ENV = process.env.NODE_ENV

app.listen(PORT, console.log(`server running in ${NODE_ENV} on port ${PORT}`));