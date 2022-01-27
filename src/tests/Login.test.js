import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { render, screen, fireEvent } from '@testing-library/react';

import Login from '../components/Login';

jest.mock('@auth0/auth0-react', () => ({
    Auth0Provider: ({ children }) => children,
    useAuth0: jest.fn(),
}));

test('Login calls to auth0', () => {

    const loginSpy = jest.fn();

    useAuth0.mockImplementation(() => {
        return {
            isLoading: false,
            user: { sub: "foobar" },
            isAuthenticated: false,
            loginWithRedirect: loginSpy,
        }
    })

    render(
        <Auth0Provider>
            <Login />
        </Auth0Provider>
    )

    const button = screen.getByRole('button', { name: /Log In/i });
    expect(button).toBeInTheDocument();
    expect(useAuth0).toBeCalledTimes(1);

    fireEvent.click(button);
    expect(loginSpy).toBeCalledTimes(1);
});