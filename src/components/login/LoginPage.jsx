import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { apiurl } from "../../../config";

export default function LoginPage(props) {
  const{setUser, user} = props
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkLogin, setCheckLogin] = useState('')
  const navigate = useNavigate();

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value)
    setemailError('')
  }

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value)
    setPasswordError('')
  }

  const handleLogin =  async (email, password) => {
    if (email.length === 0) {
        setemailError("email should not be empty");
    }
    if (password.length === 0) {
        setPasswordError("password should not be empty ");
    }
    if (email.length === 0 && password.length === 0) {
        setemailError("email should not be empty.");
        setPasswordError("password should not be empty ");
      }
    if (email.length > 0 && password.length > 0) {
        try{
            const response = await axios.post(`${apiurl}users/`, {email, password});
            if(response.status == 200){
              setUser(response.data)
              localStorage.setItem("user_shortner", JSON.stringify(response.data))
            }else{
                console.error("Unexpected response status:", response.status, response.data);
            }
        }
        catch(error){
            if(error.response){
                console.error("There was a problem with the API call:", error.response);
                setCheckLogin('Email and Password do not match')
            }
        }
    }
  };

  useEffect(() => {
    if(user){
      navigate("/home");
    }
  })

  return (
    <div>
      <main className="flex flex-col items-center my-[14rem] gap-4">
        <h1 className="text-[3rem] sm:text-[3.5rem] text-slate-600">
          ACCULYNC
        </h1>
        <div className=" flex flex-col w-2/3 sm:w-1/6 gap-1">
          <div className="gap-1 border border-gray-300 rounded-sm">
            <input
              type="text"
              placeholder="yours@example.com"
              value={email}
              onChange={handleEmailInputChange}
              className="w-full h-full py-2 px-3 text-sm text-gray-800 font-semibold border rounded-sm focus:border-gray-400 focus:outline-none"
            />
          </div>
          {emailError && (
            <h2 className="text-red-600 text-sm mb-1">{emailError}</h2>
          )}
        </div>

        <div className="flex flex-col w-2/3 sm:w-1/6">
          <div className="border border-gray-300 rounded-sm">
            <input
              type="password"
              placeholder="your password"
              value={password}
              onChange={handlePasswordInputChange}
              className="w-full h-full py-2 px-3 text-sm text-gray-800 font-semibold border rounded-sm focus:border-gray-400 focus:outline-none"
            />
          </div>
          {passwordError && (
            <h2 className="text-red-600 text-sm mb-1">{passwordError}</h2>
          )}
        </div>

        <button
          className="w-2/3 sm:w-1/6 h-16 bg-slate-600 rounded text-white"
          onClick={() => {
            handleLogin(email, password);
          }}
        >
          LOG IN
        </button>
        {checkLogin && (<h2 className="text-red-600 text-sm mb-1">{checkLogin}</h2>)}
      </main>
    </div>
  );
}


