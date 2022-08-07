
import Notes from "./Notes.jsx"
import "../css/Home.css"

export default function Home(props) {
    return (
        <>
            <div id="homeparent">
                <Notes showAlert={props.showAlert} />
            </div>
        </>
    );
}



