import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/api/userlogin", {
        email,
        password,
      });

      console.log(response.data); // Log the response data

      if (response.data.success) {
        // Successful login
        // Redirect or set authentication state in your application
        toast.success(response.data.message);
        navigate("/main");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <div>
      <div className="login-page">
        <img className="loginimage" src="doc.jpg" alt="Doctor Patient  " />

        <form className = "form-login1" onSubmit={handleSubmit}>
          <p className="form-heading">Login to your account</p>
          <input
          style={{
            padding: '1250px !important',
            maxWidth: 'max-content ', // Fix duplicated width property
          }}
            type="text"
            placeholder="Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="loginbutton" type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
