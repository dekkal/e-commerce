import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Products from './Products'
import Login from './Login'
import Register from './Register'
import { UserProvider } from "./UserContext";
import Cart from './Cart'
import Dashboard from './Dashboard'

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Cart" element={<Cart />} /> 
           <Route path="/Dashboard" element={<Dashboard />} /> 

        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App;
