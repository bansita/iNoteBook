import React, { useState } from 'react'
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

function AddNote() {
    const context=useContext(noteContext);
    const{addNote}=context;
    const[note,setNote]=useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
    }
    const handleChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
    <div className="container my-3">
    <h2>Add notes</h2>
    <form>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={note.title}
          aria-describedby="emailHelp"
          onChange={handleChange}
           minLength={5} required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label" >
          description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          value={note.description}
          onChange={handleChange}
           minLength={5} required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label" >
          tag
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          value={note.tag}
          onChange={handleChange}
           minLength={5} required
        />
      </div>
      <button disabled={note.title.length<5 || note.description<5} type="submit" className="btn btn-primary" onClick={handleClick}>
        Add Note
      </button>
    </form>
  </div>
  </div>
  )
}

export default AddNote