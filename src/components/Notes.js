import React, { useContext, useEffect, useRef, useState } from "react";
import contextvalue from "../context/notes/noteContext";
import Addnote from "./Addnote";
import Notesitem from "./Notesitem";

const Notes = () => {
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "" });

  const context = useContext(contextvalue);
  const {notes, getnote,editnote} = context;
  useEffect(() => {
    getnote();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentnote) => {
    console.log("Updating the note...",note)
    refClose.current.click();
    setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
  };

  const handleClick = (e) => {
   
    ref.current.click();
    editnote(note.id,note.etitle,note.edescription,note.etag);
    e.preventDefault();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote />

     
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <form className="my-3">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
            <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" minLength={5} value={note.etitle} onChange={onChange} required/>
           
            </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Descritpion</label>
            <input type="text"className="form-control"id="edescription" name="edescription" minLength={5} value={note.edescription} onChange={onChange} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text"className="form-control"id="etag" name="etag" value={note.etag} onChange={onChange}/>
          </div>
          
        </form>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} ref={refClose} onClick={handleClick} type="button" className="btn btn-primary ">Update Note</button>
      </div>
    </div>
  </div>
</div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
 
        {notes.length===0 && "No Notes t minlength={5}o display"}
        </div>
        {notes.map((note) => {
          return (
            <Notesitem key={note._id} note={note} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
