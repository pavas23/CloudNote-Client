import { useState } from "react";
import { useNavigate } from "react-router";
import "../css/Login.css";

export default function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const handlesubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
        });
        const json = await response.json();
        if (json.success) {
            // redirect to homepage and save authtoken
            localStorage.setItem("token", json.authtoken); // saves token in local storage
            props.showAlert("Login Successfull", "success");
            navigate("/", { replace: true });
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onchange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value }); // spread operator will keep original value intact and update the value accordingly
    };
    return (
        <>
                <div className="container" id="logincon">
                    <h2>Login to use CloudNote</h2>
                    <form onSubmit={handlesubmit} autoComplete="off" id="loginform">
                        <div className="mb-0">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email Address</label><br />
                            <input type="email" className="logininput" name="email" required id="exampleInputEmail1" autoComplete="off" aria-describedby="emailHelp" value={credentials.email} onChange={onchange} />
                        </div>
                        <div className="mb-0">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label><br />
                            <input type="password"   className="logininput" required value={credentials.password} name="password" autoComplete="off" id="exampleInputPassword1" onChange={onchange} />
                        </div>
                        <button type="submit" id="loginbtn" className="btn btn-primary" >Login</button>
                    </form>
                </div>
        </>
    );
}
