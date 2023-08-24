import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
  const host = "http://localhost:5000";

  const NotesInitial = [];
  const [notes, setNotes] = useState(NotesInitial);

  //Getall Notes

  const getnote = async () => {
    //APi CAll
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4OTc0MjAzNWUxZWFmZWJkMTZjNWJlIn0sImlhdCI6MTY2OTk1MjU0NH0.nxMoE4WFlsk_l9Tr6DmUc4wa8Qm1WJlmiVAFUlNlyX8",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Add a Note

  const addnote = async (title, description, tag) => {
    //APi CAll
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4OTc0MjAzNWUxZWFmZWJkMTZjNWJlIn0sImlhdCI6MTY2OTk1MjU0NH0.nxMoE4WFlsk_l9Tr6DmUc4wa8Qm1WJlmiVAFUlNlyX8",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
   
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deletenote = async(id) => {

    //APi CAll
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4OTc0MjAzNWUxZWFmZWJkMTZjNWJlIn0sImlhdCI6MTY2OTk1MjU0NH0.nxMoE4WFlsk_l9Tr6DmUc4wa8Qm1WJlmiVAFUlNlyX8",
      },

     
    });
    const json = response.json();
    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
  };

  //Edit a Note
  const editnote = async (id, title, description, tag) => {
    //APi CAll
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4OTc0MjAzNWUxZWFmZWJkMTZjNWJlIn0sImlhdCI6MTY2OTk1MjU0NH0.nxMoE4WFlsk_l9Tr6DmUc4wa8Qm1WJlmiVAFUlNlyX8",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    let newNotes=JSON.parse(JSON.stringify(notes));

    for (let index = 0; index <  newNotes.length; index++) {
      const element =  newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
     
    }
    console.log(newNotes);
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addnote, deletenote, editnote, getnote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
