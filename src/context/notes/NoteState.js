import { useState } from 'react';
import noteContext from './NoteContext'; 
const NoteState=(props)=>{
  const host="http://localhost:5000"
    const notesInitial=[]
          const[notes,setNotes]=useState(notesInitial)
             // get all note 
             const getNote=async()=>{
              // TODO Api call 
              const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token":localStorage.getItem('token')
                },
              });
              const json=await response.json();
              setNotes(json)
            }
          // add a note 
          const addNote=async(title,description,tag)=>{
            // TODO Api call 
            const response = await fetch(`${host}/api/notes/addnotes`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
              },
              body: JSON.stringify({title,description,tag}),
            });
            const note=await response.json();
            setNotes(notes.concat(note))
          }
          // delete a note
          const deleteNote=async (id)=>{
            // TODO Api call 
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
              },
            });
            const json=response.json();
            const newNotes=notes.filter((note)=>{return note._id!==id})
            setNotes(newNotes)
          }
          // edit a note 
          const editNote=async(id,title,description,tag)=>{
            // API call 
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
              },
              body: JSON.stringify({title,description,tag}),
            });
            const json=await response.json();
            let newNote=JSON.parse(JSON.stringify(notes));
            // logic  to edit 
            for (let index = 0; index < newNote.length; index++) {
              const element = newNote[index];
              if(element._id===id){
                newNote[index].title=title;
                newNote[index].description=description;
                newNote[index].tag=tag;
                break;
              }
            }
            setNotes(newNote);
            
          }
         return(
           <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNote}}>
            {props.children}
          </noteContext.Provider>
    )
}
export default NoteState;