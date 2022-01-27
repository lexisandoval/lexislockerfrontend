import { Auth0Provider } from '@auth0/auth0-react';
import { render, screen } from '@testing-library/react';

import Logout from '../components/Logout';

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

test('Logout calls to auth0', () => {

  render(
    <Auth0Provider>
      <Logout />
    </Auth0Provider>
  )

  const button = screen.getByRole('button', { name: /Log Out/i });
  expect(button).toBeInTheDocument()
})