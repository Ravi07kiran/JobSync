const express =require('express');

const router=express.Router();

const asso= require('../model/associates');


router.get("/associates", async (req,res)=>{
    try{
        const candidates = await asso.find({})

        if(candidates.length > 0 ){
            res.status(200).json({candidates})
        }else{
            res.status(404)
        }
    }catch(error){
        console.error(error);
        res.status(500)
    }
})

router.get("/associates/:associatesId", async (req,res)=>{
  try{
    const employeeId= req.params.employeeId
  
  if(!employeeId){
    return res.status(400)
  }
  const emp= await asso.findOne({_id:employeeId})

  if(emp){
    res.status(200)
  }else{
    console.error("fetching error",employeeId);
    res.status(404)
  }
  }catch(error){
    console.error("fetching error");
    res.status(500)
  }
});

router.post("/add_associate", async (req,res)=>{
  try{
    const {name, employeeId, Email, skills, mapped} = req.body;
    const newEmp = new asso({
      name,
      employeeId,
      Email,
      skills,
      mapped,
    })
    await newEmp.save();
    res.status(200).json({asso:newEmp})
  }
  catch(error){
    console.error(error)
    res.status(500).json({error:"internal"})
  }
})


router.delete("/delete_associates/:id", async (req,res)=>{
  try{
    const employeeID= req.params.id;
    if(!employeeID)
    {
      return res.status(400).json({error:'invalid'})
    }

    const result = await asso.findOneAndDelete(employeeID);
    if(result){
      res.status(200).json({Status:true})
    }else{
      res.status(404)
    }
  }catch(error){
    console.error(error);
    res.status(500)
  }
})


router.get("/associates_count", async(req,res)=>{
  try{
    const employeecount = await asso.countDocuments({});
    res.json({ Status: true, Result: employeecount})
  }catch(error)
  {
    console.error(error);
    res.status(500)
  }
})


router.put("/update_associates/:id", async (req,res)=>{
  const {id} = req.params;
  const  { name, employeeId, Email, skills } = req.body;
   try{
    const updateEmployee = await asso.findByIdAndUpdate(
      id,
      {name, employeeId, Email, skills },
      {new:true}
    )
    if(!updateEmployee){
      return res.status(404).json({message:"emp not found"})
    }
    res.status(200)
   }catch(error){
    console.error(error)
    res.status(500).json({message:"Internal server error"})
   }
})


router.get("/mapped_employees", async (req,res)=>{
  try{
    const mappedEmployees = await asso.find({mapped: true});
    res.status(200).json({ mappedEmployees });
  }catch(error){
    console.error(error);
    res.status(500).json({error:"Internal server"})
  }
})


router.get("/unmapped_employees", async (req,res)=>{
  try{
    const unmappedEmployees = await asso.find({mapped: false});
    res.status(200).json({ unmappedEmployees });
  }catch(error){
    console.error(error);
    res.status(500).json({error:"Internal server"})
  }
})


module.exports=router



