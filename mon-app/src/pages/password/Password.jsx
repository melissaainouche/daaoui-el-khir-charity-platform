import React, { useState} from "react";
import "./password.scss";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";


const Password = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }; 

  async function handleSubmit(e) {    
    e.preventDefault()
  try{
    sendPasswordResetEmail(auth, inputs.email).then(
      (userCredential) => {
        
        const user = userCredential.user;
        console.log(user);
        navigate("/");
      }
    );
  } catch (error) {
   
  }
};

  return (
  
    <div className="password">
      <form>
        <h2>Mot de passe oublié</h2>
        <div className="formInput">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            onChange={handleChange}
            required
          />
        </div>
      
        <button type="submit" onClick={handleSubmit}>
          Valider
        </button>

        <div className="formLink">
          <span>Nouveau sur ce site? </span>
          <Link
            to="/register"
            className="formSignup"
            style={{ textDecoration: "none" }}
          >
            {" "}
            S'inscrire
          </Link>
        </div>

        <div className="formLink">
          <span>Nouveau sur ce site? </span>
          <Link
            to="/login"
            className="formSignin"
            style={{ textDecoration: "none" }}
          >
            {" "}
            Se connecter
          </Link>
        </div>


      </form>
    </div>
  );
};

export default Password;