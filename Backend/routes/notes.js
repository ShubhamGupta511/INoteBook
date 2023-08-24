const express=require('express');
const router=express.Router();
const fetchUser=require('../middleware/fetchUser')
const Note=require('../models/Note');
const { body, validationResult } = require('express-validator');
const { findById } = require('../models/Note');
//Router-1 
router.get('/fetchnotes',fetchUser,async(req,res)=>{
    try {
        const notes=await Note.find({user:req.user.id})
        res.send(notes);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured");
    }
  
})

//Router-2
router.post('/addNote',fetchUser,[
    body('title','Enter a Valid Title').isLength({min:3}),
    body('description','Enter a valid Description').isLength({ min: 5 }),  
],async(req,res)=>{
   
    try {
        const {title,description,tag}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
        const note=new Note({title,description,tag,user:req.user.id});
        const savenote=await note.save();
        res.send(savenote);
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured");
    }
   

})


//Router-3 Update ans existing note create an endpoint for that ad login is also required

router.put('/updatenote/:id',fetchUser,async (req,res)=>{
    //Create a New Note Object
    const {title,description,tag}=req.body;
    const newNote={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if(tag){newNote.tag=tag}

    // FInd the note to be update and updateit
    let  note= await Note.findById(req.params.id);
    if(!note){return res.status(400).send('Not Found')}
    if(note.user.toString()!==req.user.id){
        return res.status(404).send('Not Allowed')
    }

    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});

})


//Router-4 Delete an existing note create an endpoint for that ad login is also required

router.delete('/deletenote/:id',fetchUser,async (req,res)=>{
    //Create a New Note Object
    const {title,description,tag}=req.body;
    
    

    // FInd the note to be update and updateit
    let  note= await Note.findById(req.params.id);
    if(!note){return res.status(400).send('Not Found')}

    //Delete this note only if user owns this note
    if(note.user.toString()!==req.user.id){
        return res.status(404).send('Not Allowed')
    }

    note=await Note.findByIdAndDelete(req.params.id);
    res.json({"Sucess":"Note is deleted"});

})

module.exports=router