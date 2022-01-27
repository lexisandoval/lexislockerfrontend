import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { useAuth0 } from "@auth0/auth0-react"

import Login from './Login'
import Logout from './Logout'
import search from '../images/search.png'
import brand from '../images/brand.png'
import cart from '../images/cart.png'
import menu from '../images/menu.png'
import navSpacer from '../images/navSpacer.png'
import mobileSpacer from '../images/mobileSpacer.png'

function NavBar() {

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` })
  const { isAuthenticated } = useAuth0()

  return (
    <Navbar collapseOnSelect className="nav navbar-expand-lg scrolled">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="medium blackLink">
        {isMobile ?
          <>
            <Nav className="mr-auto">
              <NavDropdown title={<img src={menu} className="blackLink navIcon" alt="menu icon" />}>
                <NavDropdown.Item as={NavLink} exact className="thin blackLink" to="/categories">Shop By Category</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} className="thin blackLink" to="/clothing">View All Clothing</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} className="thin blackLink" to="/cart">Cart</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} className="thin blackLink" to="/search">Search</NavDropdown.Item>
                <NavDropdown.Divider />
                {!isAuthenticated ?
                  <NavDropdown.Item as={Login} className="thin blackLink">Log In</NavDropdown.Item> :
                  <>
                    <NavDropdown.Item as={NavLink} className="thin blackLink" to="/account">Account</NavDropdown.Item>
                    <NavDropdown.Item as={Logout} className="thin blackLink">Log Out</NavDropdown.Item>
                  </>
                }
              </NavDropdown>
            </Nav>
            <Navbar.Brand className="mx-auto">
              <Nav.Link as={NavLink} className="navHeader black thin" exact to="/">
                <img src={brand} alt="brand logo" />
              </Nav.Link>
            </Navbar.Brand>
            <img src={mobileSpacer} className="navIcon spacehorizontal mobileSpacer" alt="spacer" />
          </> :
          <>
            <Nav className="mr-auto">
              <NavDropdown title={<img src={menu} className="blackLink navIcon" alt="menu icon" />}>
                <NavDropdown.Item as={NavLink} exact className="thin blackLink" to="/categories">Shop By Category</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} className="thin blackLink" to="/clothing">View All Clothing</NavDropdown.Item>
                <NavDropdown.Divider />
                {!isAuthenticated ?
                  <NavDropdown.Item as={Login} className="thin blackLink">Log In</NavDropdown.Item> :
                  <>
                    <NavDropdown.Item as={NavLink} className="thin blackLink" to="/account">Account</NavDropdown.Item>
                    <NavDropdown.Item as={Logout} className="thin blackLink">Log Out</NavDropdown.Item>
                  </>
                }
              </NavDropdown>
              <img src={navSpacer} className="navIcon spacehorizontal" alt="spacer" />
            </Nav>
            <Navbar.Brand className="mx-auto">
              <Nav.Link as={NavLink} className="navHeader black thin" exact to="/">
                <img src={brand} alt="brand logo" />
              </Nav.Link>
            </Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link as={NavLink} className="blackLink" exact to="/search">
                <img src={search} className="navIcon" alt="search icon" />
              </Nav.Link>
              <Nav.Link as={NavLink} className="blackLink" exact to="/cart">
                <img src={cart} className="navIcon" alt="cart icon" />
              </Nav.Link>
            </Nav>
          </>
        }
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar