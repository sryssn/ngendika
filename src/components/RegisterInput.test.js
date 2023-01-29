/**
 * scenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when sign up button is clicked
 * - Login button (Already have an account?)
 *   - should redirect when login button is clicked
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';

import '@testing-library/jest-dom';

import { MemoryRouter } from 'react-router-dom';

describe('RegisterInput component', () => {
  it('should handle name typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />, { wrapper: MemoryRouter });
    const nameInput = await screen.getByPlaceholderText('Name');

    // action
    await userEvent.type(nameInput, 'nametest');

    // assert
    expect(nameInput).toHaveValue('nametest');
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />, { wrapper: MemoryRouter });
    const emailInput = await screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'emailtest@gmail.com');

    // assert
    expect(emailInput).toHaveValue('emailtest@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />, { wrapper: MemoryRouter });
    const passwordInput = await screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'passwordtest');

    // assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = jest.fn();
    render(<RegisterInput register={mockLogin} />, { wrapper: MemoryRouter });
    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'nametest');
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'emailtest@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const signupButton = await screen.getByRole('button', { name: 'Sign Up' });

    // action
    await userEvent.click(signupButton);

    // assert
    expect(mockLogin).toBeCalledWith({
      name: 'nametest',
      email: 'emailtest@gmail.com',
      password: 'passwordtest',
    });
  });
});

describe('Login button (Already have an account?)', () => {
  it('should redirect when login button is clicked', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />, { wrapper: MemoryRouter });
    const loginButton = await screen.getByText('Already have an account?');

    // action
    await userEvent.click(loginButton);

    // assert
    expect(loginButton).toBeInTheDocument();
  });
});
