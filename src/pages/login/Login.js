import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { validateEmailPassword } from "../../utils/helpers";

function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/profile");
  }, [user, loading]);

  function onLogin() {
    setError('');

    //Validate email & password
    const errorMsg = validateEmailPassword(
      email,
      password
    );

    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    logInWithEmailAndPassword(email, password).then(() => {
      console.log("Signed In");
    })
    .catch(e => {
      console.log("Error signing in", e);
      setError("Incorrect email/password");
    });
  }

  return (
    <div className="login">
      <div className="login__container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="button-full"
          onClick={() => onLogin()}
        >
          Login
        </button>
        
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          <small>Don't have an account? <Link to="/register">Register</Link> now.</small>
        </div>
      </div>
    </div>
  );
}
export default Login;