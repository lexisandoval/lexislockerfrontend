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
      user: { sub: "foobar" },
      isAuthenticated: true,
      loginWithRedirect: jest.fn()
    }
  }
}))

describe("Navbar when logged in", () => {

  test("Logout Button displays when logged in", () => {

    render(
      <Router><NavBar /></Router>
    )

    const menuIcon = screen.getByAltText("menu icon")
    fireEvent.click(menuIcon)
    const loginLink = screen.getByText(/Log Out/i)
    const accountLink = screen.getByText(/Account/i)

    expect(loginLink).toBeInTheDocument()
    expect(accountLink).toBeInTheDocument()
  })
})

test('Navbar renders menu icon and dropdown items when clicked', () => {
  render(<Router><NavBar /></Router>)
  const menuIcon = screen.getByAltText("menu icon")
  fireEvent.click(menuIcon)

  const dropdownItem1 = screen.getByText("Shop By Category")
  const dropdownItem2 = screen.getByText("View All Clothing")

  expect(menuIcon).toBeInTheDocument()
  expect(dropdownItem1).toBeInTheDocument()
  expect(dropdownItem2).toBeInTheDocument()
})

test('Navbar renders cart icon with correct href value', () => {
  render(<Router><NavBar /></Router>)
  const cartIcon = screen.getByAltText("cart icon")
  expect(cartIcon).toBeInTheDocument()
  expect(cartIcon.parentElement.getAttribute("href")).toBe("/cart")
})

test('Navbar renders search icon', () => {
  render(<Router><NavBar /></Router>)
  const searchIcon = screen.getByAltText("search icon")
  expect(searchIcon).toBeInTheDocument()
})

test('Navbar renders brand logo with correct href value', () => {
  render(<Router><NavBar /></Router>)
  const brandLogo = screen.getByAltText("brand logo")
  expect(brandLogo).toBeInTheDocument()
  expect(brandLogo.parentElement.getAttribute("href")).toBe("/")
})