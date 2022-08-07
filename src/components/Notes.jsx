import { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext.jsx";
import AddNote from "./AddNote.jsx";
import Noteitem from "./Noteitem.jsx";
import { useNavigate } from "react-router";
import "../css/Notes.css"

export default function Notes(props) {
    const context = useContext(NoteContext);
    const arr = context.notes;
    const editNote = context.editNote;
    let navigate = useNavigate();

    // as soon as this component is mounted useEffect hook will fire the this callback function.
    useEffect(() => {
        if (localStorage.getItem("token")) {
            context.getNotes();
            // eslint-disable-next-line
        }
        else{
            // if auth token not there then redirect to login page.
            navigate("/login", { replace: true });
        }

    }, []); // use [] so that it runs only once
    const ref = useRef(null);
    const refClose = useRef(null); // for closing the modal
    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: ""
    });
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }
    const handleclick = (event) => {
        console.log("updating note", note);
        refClose.current.click();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("Note Updated Successfully", "success");
    };
    const onchange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value }); // spread operator will keep original value intact and update the value accordingly
    };
    return (
        <>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel" style={{color:"black"}}>Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" value={note.etitle} name="etitle" id="etitle" aria-describedby="emailHelp" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={note.edescription} id="edescription" name="edescription" onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} className="btn btn-primary" onClick={handleclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-3" id="notescon">
                <h2>Your Notes</h2>
                {/* {arr.length === 0 && "No Notes to display"} */}
                {arr.map((note) => {
                    return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />;
                })}
            </div>
        </>
    );
}
