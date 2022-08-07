import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import "../css/Navbar.css";

export default function Navbar() {
    let navigate = useNavigate();
    let location = useLocation();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">CloudNote</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="nav-list">
                            <li className="nav-item mx-2">
                                <Link className={`nav-link ${location.pathname == "/" ? "active" : ""} ${!localStorage.getItem("token") ? "disabled" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            {/* <li className="nav-item mx-2">
                                <Link className={`nav-link ${location.pathname == "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li> */}
                            <li className="nav-item mx-2">
                                {!localStorage.getItem("token") ? <form className="d-flex" role="search">
                                    <Link className={`nav-link mx-2 ${location.pathname == "/login" ? "active" : ""}`} to="/login" >Login</Link>
                                    <Link className={`nav-link mx-2 ${location.pathname == "/signup" ? "active" : ""}`} to="/signup">Sign up</Link>
                                </form> : <Link className={`nav-link mx-2${location.pathname == "/signup" ? "active" : ""}`} onClick={handleLogout} to="/login">Logout</Link>}
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
        </>
    );
}
