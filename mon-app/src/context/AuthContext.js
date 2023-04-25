import React, {   useContext, useEffect, useReducer } from "react";
import AuthReducers from "./AuthReducer";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";


const INITIAL_STATE = {       
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  error: false,
};


export const AuthContext = React.createContext(INITIAL_STATE);


export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducers, INITIAL_STATE);
  
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        isLoading: state.isLoading,
        error: state.error,
        dispatch,
        forgotPassword
        
      }}
    >
      { children }
       
    </AuthContext.Provider>
    
  );
};




  

  
