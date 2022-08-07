import { useState } from "react";
import { useNavigate } from "react-router";
import "../css/Signup.css";

export default function Signup(props) {
    const[credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    let navigate = useNavigate();
    const handlesubmit = async (event) => {
        event.preventDefault();
        if(credentials.password!= credentials.cpassword){
            return  props.showAlert("Password doesn't match","danger");
        }
        const response= await fetch("http://127.0.0.1:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                name:credentials.name,
                email:credentials.email,
                password:credentials.password,
            }),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // redirect to homepage and save authtoken
            localStorage.setItem("token",json.authtoken); // saves token in local storage
            props.showAlert("Account Created Successfully","success");
            navigate("/", { replace: true });
        }
        else{
            props.showAlert("Sorry, a user with this email already exists","danger");
        }
    }

    const onchange = (event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value}); // spread operator will keep original value intact and update the value accordingly
    };
    return (
        <>
        <div id = "signupparent">
        <div className = "container" id="signupcon">
        <h2>Create Account to use CloudNote</h2>
            <form onSubmit = {handlesubmit} id="signupform" autoComplete="off">
            <div className="mb-0">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input className="signinput" type="text"  name="name" onChange={onchange} id="name" required aria-describedby="emailHelp"/>
                </div>
                <div className="mb-0">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input  className="signinput" type="email"  name="email" onChange={onchange} id="email" required aria-describedby="emailHelp"/>
                </div>
                <div className="mb-0">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input className="signinput" type="password"  name="password" onChange={onchange} id="password" required minLength={5}/>
                </div>
                <div className="mb-0">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input className="signinput" type="password" name="cpassword" onChange={onchange} id="cpassword" required minLength={5}/>
                </div>
                <button type="submit" id="signupbtn" className="btn btn-primary">Sign up</button>
            </form>
            </div>
            </div>
        </>
    );
}

