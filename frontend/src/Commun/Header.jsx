import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Logo from './../assets/logo.jpg';
function Header() {
  return (
    <div>
          <header>
    <div className="container py-3">
    <Navbar expand="lg" className="bg-body-tertiary">
      
        <Navbar.Brand href="#home"className='logo'> 
    
       <div className="flex items-center gap-2">
         <img src={Logo} alt="Logo" className="h-15 w-15" />
        <span className="font-bold text-lg">SHOP Products</span>
      </div>
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/"className='nav-link'>Home</Nav.Link>
            <Nav.Link href="/Products"className='nav-link'>Products</Nav.Link>
             <Nav.Link href="/Cart"className='nav-link'>Cart</Nav.Link>
            <Nav.Link href="/Login"className='nav-link'>Login</Nav.Link>
            <Nav.Link href="/Register"className='nav-link'>Register</Nav.Link>
            <Nav.Link href="/Dashboard"className='nav-link'>Dashboard</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
      </div>
</header>
    </div>
  )
}

export default Header
