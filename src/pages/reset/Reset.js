import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./../../firebase";
import { validateEmail } from "../../utils/helpers";
import "./Reset.css";

function Reset() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/profile");
  }, [user, loading]);

  function onSendPasswordReset() {
    setError('');
    //Validate email & password
    const errorMsg = validateEmail(
      email
    );

    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    sendPasswordReset(email).then(() => {
      alert('Password reset link sent!');
    })
    .catch(e => {
      setError(e.message);
    });
  }

  return (
    <div className="reset">
      <div className="reset__container">
        <h2>Reset Password</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="button-full"
          onClick={() => onSendPasswordReset()}
        >
          Send password reset email
        </button>
        <div>
          <small>Remember Password? <Link to="/login">Login</Link> now.</small>
        </div>
      </div>
    </div>
  );
}
export default Reset;