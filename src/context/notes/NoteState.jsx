import { useState } from "react";
import noteContext from "./NoteContext.jsx";

export default function NoteState(props) {
  const host = "http://127.0.0.1:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    // API call
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // API call
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const json = await response.json();
    const note = json;
    //Adding note in client side
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    // API call
    const url = `${host}/api/notes/deletenote/${id}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    // deleting the note in client side
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // update a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const url = `${host}/api/notes/updatenote/${id}`;
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
   getNotes(); // will update the notes on client side.
  };

  return (
    <noteContext.Provider
      value={{
        notes: notes,
        addNote: addNote,
        deleteNote: deleteNote,
        editNote: editNote,
        getNotes: getNotes,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
}
