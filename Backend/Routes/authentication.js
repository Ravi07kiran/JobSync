const express= require('express');

const bycrypt =require('bcryptjs');

const jwt =require('jsonwebtoken');

const User=require('../model/userRole');

const Router =express.Router();

Router.use(express.json());

const verificationUser = (req,res,next) =>{
    try{
        const token=req.headers.authorization;
        if(!token)
        {
           return res.status(401)
        }
        jwt.verify(token,"jwt-secret-key",(err,decoded)=>{
            if(err)
            {
                return res.status(401)
            }
            req.user=decoded;
            next();
        })

    }
    catch(error){
        return res.status(401)
    }
};






module.exports=Router;