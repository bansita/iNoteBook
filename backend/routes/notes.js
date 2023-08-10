const express=require('express');
const router=express.Router();
var fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
//Route:1 get all the notes using:get "/api/notes/fetchallnotes".login required
router.get('/fetchallnotes',fetchUser,async(req,res)=>{
    try {
        const notes=await Note.find({user:req.user.id})
        res.json(notes);
    } catch (error) {
        res.status(400).send("Internal server error");
    }
})
//Route:2 Add a new notes using:post "/api/notes/addnotes".login required
router.post('/addnotes',fetchUser,[
    body("title", "Enter a valid title").isLength({min:3}),
    body("description", "description atleast 5 character").isLength({min:5}),
],
async(req,res)=>{
    try {
    const {title,description,tag}=req.body
     // if there are error,then send bad request and error
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
    const note=new Note({
        title,description,tag,user:req.user.id
    })
    const savedNote=await note.save()
    res.json(savedNote);
} catch (error) {
    res.status(400).send("Internal server error");
}
})
// Route:3 Updating an existing notes using:post "/api/notes/updatenote".login required
router.put('/updatenote/:id',fetchUser,async(req,res)=>{
    try {
    const{title,description,tag}=req.body;
    // Create a new note object 
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
    // find the note to be updated and update it 
    let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Allowed");
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("not allowed");
    }
    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
} catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
}
})
// Route:4 Delete an existing notes using:post "/api/notes/deletenote".login required
router.delete('/deletenote/:id',fetchUser,async(req,res)=>{
    try {
    // find the note to be updated and update it 
    let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Allowed");
    }
    // allow deletion only if user owns this note 
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("not allowed");
    }
    note=await Note.findByIdAndDelete(req.params.id)
    res.json("Success: Note has been deleted");
} catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
}
})
module.exports=router