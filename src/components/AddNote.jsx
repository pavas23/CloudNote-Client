
import {useContext, useState} from "react";
import NoteContext from "../context/notes/NoteContext.jsx";
import "../css/AddNote.css";

export default function AddNote() {
    const context = useContext(NoteContext);
    const{addNote} = context;
    const[note,setNote] = useState({
        title:"",
        description:"",
        tag:""
    });
    const handleclick = (event)=>{
        if(note.title.length==0 || note.description.length==0){
            return alert("Title or description can not be blank");
        }
        event.preventDefault();
        addNote(note.title,note.description,note.tag);
        document.getElementById("tag").value = "";
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        setNote({
            title:"",
            description:"",
            tag:""
        })
    };
    const onchange = (event)=>{
        setNote({...note,[event.target.name]:event.target.value}); // spread operator will keep original value intact and update the value accordingly
    };
    return (
        <>
            <div className="container" id="addnotecon">
                <h2>Add your Notes</h2>
                <form autoComplete="off" onSubmit={handleclick}>
                    <div className="mb-3" className="addnoteinput">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" name = "title" id="title"  aria-describedby="emailHelp" onChange={onchange} minLength="3"/>
                    </div>
                    <div className="mb-3" className="addnoteinput">
                        <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                        <textarea rows="4" type="text" className="form-control" id="description"  name="description"onChange={onchange} minLength="5" />
                    </div>
                    <div className="mb-3" className="addnoteinput">
                        <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag"  name="tag"onChange={onchange} />
                    </div>
                    <button type="submit" id="addnotebtn"  className="btn btn-primary">Add note</button>
                </form>
            </div>
        </>
    );
}







