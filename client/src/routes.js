import React from "react";
import {Routes, Route, Navigate} from "react-router-dom"
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/AuthPage/AuthPage";

export const useRoutes = (isLogin = false) => {
    if (isLogin) {
        return (
            <Routes>
                <Route path="/main" element={<MainPage/>}/>
                <Route path="*" element={<Navigate to="/main" />} />
            </Routes>
        )
    }
    else{
        return (
            <Routes>
                    <Route path="/" element = { <AuthPage/ >} />
                    <Route path="*" to="/registration" element={<AuthPage/>}/>
            </Routes>
        )
    }
}