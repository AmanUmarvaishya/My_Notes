import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./GoogleApi";
import { useNavigate } from "react-router-dom";

function GoogleLogin() {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {  
      if (authResult["code"]) {//google server connect and find code
        const result = await googleAuth(authResult["code"]); 
        console.log(result)
        const { email, name } = result.data.user; //find user email , name
        console.log(result.data.user)
        const token = result.data.token;
        
        const obj = { email, name, token };
        localStorage.setItem("user-info", JSON.stringify(obj));
        // console.log(result.data.user);
        // console.log(token);
        navigate("/notes");// for redirect url 
      }
    } catch (error) {
      alert('error occured')
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div>
      <button onClick={googleLogin} className="btn">
        Sign in with google
      </button>
    </div>
  );
}

export default GoogleLogin;
