const express = require('express');
const path = require('path')
const dotenv = require('dotenv');
const morgan = require('morgan')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload')


//route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');


const req = require('express/lib/request');
const { connect } = require('./routes/bootcamps');


dotenv.config({path: './config/config.env'})

connectDB();


const app  = express();

//Body Parser

app.use(express.json());

app.use(cookieParser())


//middleware
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'));
}


app.use(fileupload());

//set static folder
app.use(express.static(path.join(__dirname,'public')))

app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)

app.use(errorHandler)

const PORT = process.env.PORT || 8000

const NODE_ENV = process.env.NODE_ENV

app.listen(PORT, console.log(`server running in ${NODE_ENV} on port ${PORT}`));