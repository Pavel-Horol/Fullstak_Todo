import './App.scss';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import { useRoutes } from './routes.js';
import  useAuth  from './hooks/auth.hook.js'
function App() {
  const {login, logout, token, userId, isReady} = useAuth()
  const isLogin = !!token
  const routes = useRoutes(isLogin) 

  return (
    <AuthContext.Provider value={{login, logout, token, userId, isReady, isLogin}}>
    <div className="app">
      <Navbar/>
      { routes }
    </div>
    </AuthContext.Provider>
  );
}

export default App;
