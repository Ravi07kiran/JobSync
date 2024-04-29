const express=require('express');
const cors=require('cors');

const authentication= require('./Routes/authentication');
const jobDescription= require('./Routes/jobDescRoute')

const { default: mongoose } = require('mongoose');

require('dotenv').config();
const PORT=process.env.PORT || 4000;

const URI=process.env.URI;

const app=express();
app.use(cors());


app.use('/authuser',authentication);
app.use('/JD',jobDescription)

mongoose.connect(URI)

app.listen(PORT,()=>console.log('yep'))