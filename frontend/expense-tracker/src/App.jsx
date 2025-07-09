import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'; 
import Login from './pages/Auth/login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Expense from './pages/Dashboard/Expense';
import Income from './pages/Dashboard/Income';
import RecentTransactionsPage from './pages/Dashboard/RecentTransactionsPage '  // new 
import UserProvider from './context/UserContext';
import { Toaster } from 'react-hot-toast';



const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Root/>}/>
            <Route path='/login' exact element={<Login/>}/>
            <Route path='/signup' exact element={<SignUp/>}/>
            <Route path='/dashboard' exact element={<Home/>}/>
            <Route path='/expense' exact element={<Expense/>}/>
            <Route path='/income' exact element={<Income/>}/>
            <Route path='/transactions' exact element={<RecentTransactionsPage />}/>  {/* new */}
          </Routes>
        </Router>
      </div>
      <Toaster
        toastOptions={{
          className:"",
          style:{
            fontSize:'13px'
          },
        }}
      />
    </UserProvider>
  )
}

export default App;

const Root=()=>{
  // check if token exists in lovalstorage
  const isAuthenticated = !!localStorage.getItem("token");

  //Redirect to dashboard if authenticated, otherwise to login 
  return isAuthenticated ? (
    <Navigate to="/dashboard"/>
  ):(
    <Navigate to ="/login"/>
  );

};