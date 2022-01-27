import React from "react"
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import Account from "../../components/Account"

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

test('Account renders error message when logged out', () => {
  render(
    <Router>
      <Account />
    </Router>
  )

  const error = screen.getByText("Sorry, you need to be logged in to view this page")

  expect(error).toBeInTheDocument()
})