
const User=require('../models/User');
const express=require('express');
const { body, validationResult } = require('express-validator');
const router=require('express').Router();
const bcrypt = require('bcryptjs');
const JWT=require('jsonwebtoken')

const JWT_SECRET="shubhamis$bo$y";

const fetchUser=require('../middleware/fetchUser')
//Route 1:create a user using POST: "api/auth/createuser"  No login required
router.post('/createuser', [
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
],  async (req, res) => {
  // If there are errors then send bad request
 let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Check whether the user with the same email already exist 
try {
 let user = await User.findOne({email:req.body.email});
 if(user){
  success=false;
  return res.status(400).json({success,error:"Sorry a user with the same email already Exist"})
 }

 //To Hash a Password
  const salt= await bcrypt.genSalt(10);
  const seccPass= await bcrypt.hash(req.body.password,salt)

   user= await User.create({
    name: req.body.name,
    email: req.body.email,
    password: seccPass,
  });
   const data={
    user:{
      id:user.id
    }
   }

  const authtoken=JWT.sign(data,JWT_SECRET)
  success=true;
  res.json({success,authtoken});
  
  
} catch (error) {
  
  console.error(error.message)
  res.status(500).send("Some error occured");
}
    

  
  // .then(user => res.json(user)).catch(err=>{console.log(err)
  // res.json({error:'Please Enter a unique value for the Email',message:err.message})})

  // console.log(req.body);
  // const user=User(req.body);
  // user.save();
  // res.send(req.body);
})



//Route 2:-Authenticate a user using POST: "api/auth/Login"  
router.post('/login', [
  body('email','Enter a Valid Email').isEmail(),
  body('password','Password cannot be Blank').exists(),
],  async (req, res) => {
 
  // If there are errors then send bad request

  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}
 const {email,password}=req.body;

 try {
  let user= await User.findOne({email});
  if(!user){
    res.status(400).json({error:"Please Try to Login with correct credentials"});
  }
  
  const passwordCompare= await bcrypt.compare(password,user.password);
  if(!passwordCompare){
    success=false;
    res.status(400).json({success,error:"Please Try to Login with correct credentials"});
  }

  const data={
    user:{
      id:user.id
    }
   }

  const authtoken=JWT.sign(data,JWT_SECRET)
  success=true;
  res.json({success,authtoken});

 } catch (error) {
  console.error(error.message)
  res.status(500).send("Some error occured");
 }
})

//Route-3: get logged in user details using POST "api/auth/getuser". LOgin required
router.post('/getuser', fetchUser, async (req, res) => {
  // If there are errors then send bad request
  try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message)
  res.status(500).send("Some error occured");
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}
})


module.exports=router;