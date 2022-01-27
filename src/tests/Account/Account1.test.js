import React from "react"
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import Account from "../../components/Account"

const user = {
  email: "lexi@gmail.com",
  name: "Lexi",
  email_verified: true,
  sub: "google-oauth2|2147627834623744883746",
};

jest.mock('@auth0/auth0-react', () => ({
  Auth0Provider: ({ children }) => children,
  withAuthenticationRequired: ((component, _) => component),
  useAuth0: () => {
    return {
      isLoading: false,
      user,
      isAuthenticated: true,
      loginWithRedirect: jest.fn()
    }
  }
}))

test('Account renders user info when logged in', () => {
  render(
    <Router>
      <Account />
    </Router>
  )

  const name = screen.getByText("Welcome back, Lexi!")

  expect(name).toBeInTheDocument()
})