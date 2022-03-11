const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')

//route files
const bootcamps = require('./routes/bootcamps');
const req = require('express/lib/request');

dotenv.config({path: './config/config.env'})

const app  = express();


//middleware
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', bootcamps)

const PORT = process.env.PORT || 8000

const NODE_ENV = process.env.NODE_ENV

app.listen(PORT, console.log(`server running in ${NODE_ENV} on port ${PORT}`));