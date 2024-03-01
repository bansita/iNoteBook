import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login(props) {
    const [credentials, setCredentials] = useState({email:"",password:""})
    let navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}),
          });
          const json=await response.json();
          console.log(json);
          if(json.success){
            // Save the authTokken and redirect 
            localStorage.setItem('token',json.authtoken);
            props.showAlert("loged in successfully ","succcess");
            navigate("/");
          }
          else{
            alert("Invalid Credentials")
          }
    }
    const handleChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <h2>Login to continue</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleChange}
            value={credentials.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
