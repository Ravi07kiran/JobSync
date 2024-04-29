const express = require("express");

const jobD =  require('../model/jobDescription');

const router=express.Router();


router.get('/jobDesc', async (req,res)=>{
    try{
        const jobDescs =  await jobD.find({})
        if(jobDescs.length > 0){
            res.status(200).json({jobD})
        }else{
            res.status(404)
        }
    }catch(err){
        console.log(err);
        return res.status(500)
    }
});


router.post('/jobDesc_add', async (req,res)=>{
    try{
        const {jobID,title,description,location } = req.body;
        const newjobDesc = new jobD({
            jobID,
            title,
            description,
            location
        });

        await newjobDesc.save();
        res.status(200).json({jobD: newjobDesc})
    }catch(error){
        res.status(500).json({error:"bonk"})
    }
})


router.delete('/jobDesc_delete/:jobDescId', async (req,res) => {
    try {
        const deletedjobDesc = await jobD.findByIdAndDelete(req.params.jobDescId)
        if(!deletedjobDesc){
            return res.status(400)
        }
    } catch (error) {
     return res.status(500)   
    }
})


router.put('/jobDesc_update/:id', async (req,res)=>{
    const {id} = req.params;
    const {jobID, title, description, location } = req.body;

    try{
        const updatedjobDesc = await jobD.findByIdAndUpdate(
            id,
        {
            jobID,
            title,
            description,
            location
        } ,
            
            {new:true}
        );

        if(!updatedjobDesc){
            return res.status(404).json({message:"JD not found"})
        }
        res.status(200).json({updatedjobDesc})
    }catch(error){
        console.error(error);
        res.status(500)
    }
})


module.exports = router