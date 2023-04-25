import React, { useState, useContext} from 'react';
import FormInput from '../../components/formInput/FormInput';
import { Link, useNavigate } from "react-router-dom";
import './register.scss';
import { FacebookRounded } from '@mui/icons-material';
import { auth, provider } from '../../firebase';
import { updateProfile, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { AuthContext } from '../../context/AuthContext';



const Register = () => {
    const { dispatch } = useContext(AuthContext );
    const [inputValues, setInputValues]=useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        errorMessage: "",
        required: true,
    });
    const navigate = useNavigate();
    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Nom d'utilisateur",
            errorMessage: "Username should be 3-16 characters and shouldn't include any special character",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "E-mail",
            errorMessage: "It should be a valid email address",
            required: true,
        },
        {
            id: 3,
            name: "password",
            type: "text",
            placeholder: "Mot de passe",
            errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number, 1 special character",
            pattern: `(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,20}$`,
            required: true,
        },
        {
            id: 4,
            name: "confirmPassword",
            type: "text",
            placeholder: "Confirmer le mot de passe",
            errorMessage: "Passwords don't match",
            pattern: inputValues.password,
            required: true,
        },
    ];

  const handleChange = (e) => {
    setInputValues({...inputValues, [e.target.name]: e.target.value });
  };
 
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        inputValues.email,
        inputValues.password
      ).then((userCredential) => {
         // Signed in
         const user = userCredential.user;
        updateProfile( user, {
          displayName: inputValues.username,
        });
        navigate("/login");
      });
    } catch (error) {}
  };
 
  const signInWithGoogle = () => {
    dispatch({ type: "LOGIN_START" });

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        // The signed-in user info.
        const user = result.user;
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
        navigate("/");
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILURE" });
      });
  };
 
 
  // console.log(inputValues);
  return (
    <div className='register'>
      <form>
         <h2>S'inscrire</h2>
        {inputs.map((input)=>(
         <FormInput 
         key={input.id}
          {...input} 
         value={inputValues[input.name]}
         onChange ={handleChange}
         /> 
        ))}
        <button type='submit'  onClick={handleRegister}>
          Valider
          </button>
          
        <div className="formLink">
          <span>Avez-vous déja un compte?</span>
          <Link 
             to="/login" 
             className='formSignup' 
             style={{textDecoration:"none"}}
             >
             {" "}
             Se connecter
          </Link>
        </div>

        <div className="line"></div>
        <div className="media-options">
        <Link to="#" className='facebook' style={{textDecoration:"none"}}>
          <FacebookRounded className='facebookIcon'/>
            <span>S'inscrire avec Facebook</span>
        </Link> 
        </div>
        <div className="media-options">
        <Link 
           to="#" 
           className='facebook google' 
           style={{ textDecoration: "none" }}
           onClick={signInWithGoogle}
           >
            <img src="/Photos/Google.png" alt="" className='googleImg' />
            <span>S'inscrire avec Google</span>
        </Link> 
        </div>
      </form>
    </div>
    );
};

export default Register;