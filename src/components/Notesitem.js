import React,{useContext} from 'react'
import contextvalue from '../context/notes/noteContext'
const Notesitem = (props) => {

  const context=useContext(contextvalue);
  const {deletenote}=context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}} ></i>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{ return deletenote(note._id)}}></i>

          
        </div>
      </div>
      </div>
    
  );
};

export default Notesitem;
