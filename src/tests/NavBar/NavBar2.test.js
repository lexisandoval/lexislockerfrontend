import React from "react"
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import NavBar from "../../components/NavBar"

jest.mock('@auth0/auth0-react', () => ({
  Auth0Provider: ({ children }) => children,
  withAuthenticationRequired: ((component, _) => component),
  useAuth0: () => {
    return {
      isLoading: false,
      isAuthenticated: false,
      loginWithRedirect: jest.fn()
    }
  }
}))

describe("Navbar when logged out", () => {

  test("Login Button displays when logged in", () => {
    render(
      <Router><NavBar /></Router>
    )
    const menuIcon = screen.getByAltText("menu icon")
    fireEvent.click(menuIcon)
    const loginButton = screen.getByText(/Log In/i)
    expect(loginButton).toBeInTheDocument()
  })
})