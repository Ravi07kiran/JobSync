const express = require('express');

const bycrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../model/userRole');

const router =express.Router();

router.use(express.json());

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


router.get("/home",verificationUser,(req,res)=>{
   return res.status(200).json({ success:true, user:req.user})
})

//reg

router.post("/register", async (req,res)=>{
    try{
       const userExisting = await User.findOne({email : req.body.email});

       if(userExisting)
       {
        return res.status(400).json({error:"existing user"});
       }else{

        const passwordHash= await bycrypt.hash(req.body.password, 10);

        const userProfile={
            name: req.body.name,
            email: req.body.email,
            password: passwordHash,
            role: req.body.role,
        }

        const userCreated = await User.create(userProfile);

        res.json(userCreated);
       }
    }catch (error){
        console.error(error);
        res.status(500).json({error:"internal server prob"})
    }
});


//login
router.post("/login",async (req,res)=>{
    const {email, password}=req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401)
        }
        const passwordMatch =bycrypt.compare(password, user.password);
        if(passwordMatch){
            const {password, ...others}=user._doc;
            const token =jwt.sign({userid: user._id}, "jwt-secret-key",{
                expiresIn:"1h",
            });
            return res.status(200).json({others, token});
        }else{
            return res.status(401).json({error:"password??"})
        }
    }catch(error){
        return res.status(500)
    }
})

router.get("/users",async (req,res)=>{
    try{
        const users = await User.find({role:["RM","L&C","HR"]},"_id name email");
        res.json(users);
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Internal error"})
    }
})



router.delete("/users/:id", async (req, res) => {
    try {
      const userId = req.params.id;
    
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404)
      }

      await user.findByIdAndDelete(userId);
      return res.status(200)
    } catch (error) {
      console.error(error);
      res.status(500)
    }
  });


router.put("/updateuser/:id", async (req,res)=>{
    const {id} = req.params 
    const { name, email, role} =req.body

    try{
        const updatedUser=await User.findByIdAndUpdate(
            id,
            {name,email,role},
            { new:true }
        )
        if(!updatedUser){
            return res.status(404).json({message:"Unknown user"})
        }
        res.json({updatedUser})
    }catch(error){
        console.log(error);
        res.status(500)
    }
})

module.exports=router;