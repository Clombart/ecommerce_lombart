import { Link, NavLink } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import CartWidget from "../CartWidget/CartWidget";

import './navBar.css';


const NavBar = () => {

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="d-flex justify-content-center">
      <Container className="container-fluid">
        <NavLink to='/' >
          <img
            src="https://i.ibb.co/3RxqFqR/logo.png"
            height="80"
            className="d-inline-block align-top"
            alt="Chocolates logo"
          />
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to='/categoria/amargo' className={({ isActive }) => isActive ? 'nav-item nav-link active' : 'nav-item nav-link'}>Amargo</NavLink>
            <NavLink to='/categoria/blanco' className={({ isActive }) => isActive ? 'nav-item nav-link active' : 'nav-item nav-link'} >Blanco</NavLink>
            <NavLink to='/categoria/conleche' className={({ isActive }) => isActive ? 'nav-item nav-link active' : 'nav-item nav-link'} >con Leche</NavLink>
            <NavLink to='/categoria/rellenos' className={({ isActive }) => isActive ? 'nav-item nav-link active' : 'nav-item nav-link'}>Rellenos</NavLink>
          </Nav>
          <Nav className='d-flex justify-content-end'>
            <Nav.Link href="#deets">como comprar</Nav.Link>
            <Nav.Link eventKey={2} href="#memes" className="px-4">
              FAQ
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Link to='/carrito' >
          <CartWidget />
        </Link  >
      </Container>
    </Navbar>
  );
}

export default NavBar