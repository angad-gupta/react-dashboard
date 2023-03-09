import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
} from "./../../firebase";
import "./Register.css";
import { validateEmailPassword } from "../../utils/helpers";

function Register() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/profile");
  }, [user, loading]);

  function onRegister() {
    setError('');
    if (!name) {
      setError("Please enter name");
      return;
    }

    //Validate email & password
    const errorMsg = validateEmailPassword(
      email,
      password
    );

    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    registerWithEmailAndPassword(name, email, password).then(() => {
      console.log("Signed In");
    })
    .catch(e => {
      console.log("Error signing in", e);
      setError("Incorrect email/password");
    });
  }

  return (
    <div className="register">
      <div className="register__container">
        <h2>Register</h2>

        {error && <p className="error">{error}</p>}
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="button-full" onClick={onRegister}>
          Register
        </button>
        <div>
          <small>Already have an account? <Link to="/login">Login</Link> now.</small>
        </div>
      </div>
    </div>
  );
}
export default Register;