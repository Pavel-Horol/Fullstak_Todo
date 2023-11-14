import React, {useState, useContext} from "react";
import "./AuthPage.scss";
import {Route, Routes, useNavigate} from "react-router-dom";

import Login from "./Login/Login";
import Register from "./Register/Register";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const AuthPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const {login} = useContext(AuthContext)
  const changeHandler = (event) => {
    setForm({
      ...form, [event.target.name] : event.target.value
    })
  }

  const registerHandler = async () => {
    try {
      console.log("trying to register...")
      await axios.post(`http://localhost:5000/api/auth/reg`, {...form}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        login(response.data.token, response.data.userId)
        navigate("/")
      })
    } catch (error) {
      console.log("registerHandler:", error);
    }
  }

  const loginHandler = async () => {
    try {
      console.log("trying to login...")
      await axios.post(`http://localhost:500/api/auth/login`, {...form}, {
        headers: {
          'Content-Type': 'application/json'
        }
    }).then(response => {
      login(response.data.token, response.data.userId)
      navigate("/")
    })
    } catch (error) {
      console.log("loginHandler:", error);
    }
  }

  return (
      <div className="container">
        <div className="auth-page">
          <Routes>
            <Route path="/login" element={<Login changeHandler={changeHandler} loginHandler={loginHandler}/>}/>
            <Route path="/registration" element={<Register changeHandler={changeHandler} registerHandler ={registerHandler}/>}/>
          </Routes>
        </div>
      </div>
  );

};

export default AuthPage;
