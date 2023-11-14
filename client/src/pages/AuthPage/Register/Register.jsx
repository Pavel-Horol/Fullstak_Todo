import React from "react";
import { Link } from "react-router-dom";
const Register = ({changeHandler, registerHandler}) => {
    
    return (
    <>
        <h3>Реєстрація</h3>
        <form className="form form-login" onSubmit={e => e.preventDefault()}>
            <div className="row">
                <div className="input-field col s12">
                <input onChange={changeHandler} name="email" type="email" id="regEmail"  className="validate" />
                <label htmlFor="regEmail">Введіть ваш email</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12">
                <input onChange={changeHandler} name="password" type="password" id="regPassword" className="validate" />
                <label htmlFor="regPassword">Введіть ваш пароль</label>
            </div>
        </div>
        <div className="row">
            <button
            onClick={() => {
                registerHandler()
                }}
            className="waмes-effect waмes-light btn blur">
                Зареєструватись
            </button>
            <Link to="/login"  className="btn-outline btn-reg">
                Вже є акаунт ?
            </Link>
        </div>
        </form>
    </>
    );
};

export default Register;
