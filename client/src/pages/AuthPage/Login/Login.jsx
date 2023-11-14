import React from "react";
import { Link } from "react-router-dom";
const Login = ({changeHandler, loginHandler}) => {
    return (
    <>
        <h3>Авторизація</h3>
        <form className="form form-login" onSubmit={e => e.preventDefault()}>
        <div className="row">
            <div className="input-field col s12">
            <input onChange={changeHandler} name="email" type="email" id="emailLog"/>
            <label htmlFor="emailLog">Введіть ваш email</label>
            </div>
        </div>
        <div className="row">
            <div className="input-field col s12">
            <input onChange={changeHandler} name="password" type="password" id="passwordLog" />
            <label htmlFor="passwordLog">Введіть ваш пароль</label>
            </div>
        </div>
        <div className="row">
            <button
                onClick={loginHandler} 
                className="waмes-effect waмes-light btn blur"
                >Увійти</button>
            <Link to="/registration" className="btn-outline btn-reg">
                Немає акаунта ?
            </Link>
        </div>
        </form>
    </>
    );
};

export default Login;
