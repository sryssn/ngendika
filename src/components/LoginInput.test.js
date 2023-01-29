/**
 * scenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 * - Sign Up button
 *   - should redirect when sign up button is clicked
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

import '@testing-library/jest-dom';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('LoginInput component', () => {
  it('should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'emailtest@gmail.com');

    // assert
    expect(emailInput).toHaveValue('emailtest@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'passwordtest');

    // assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = jest.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'emailtest@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = await screen.getByRole('button', { name: 'Log in' });

    // action
    await userEvent.click(loginButton);

    // assert
    expect(mockLogin).toBeCalledWith({
      email: 'emailtest@gmail.com',
      password: 'passwordtest',
    });
  });
});

describe('Sign Up button', () => {
  it('should redirect when sign up button is clicked', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const signupButton = await screen.getByRole('button', { name: 'Sign Up' });

    // action
    await userEvent.click(signupButton);

    // assert
    expect(mockedUsedNavigate).toBeCalledTimes(1);
  });
});
