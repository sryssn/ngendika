import React from 'react';
import { Divider } from '@mui/material';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const navigate = useNavigate();
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <Form>
      <Form.Control className="mb-2 text-field" type="email" placeholder="Email" value={email} onChange={onEmailChange} />
      <Form.Control className="mb-3 text-field" type="password" placeholder="Password" value={password} onChange={onPasswordChange} />
      <Button className="button-login mb-3" variant="primary" type="button" onClick={() => login({ email, password })}>Log in</Button>
      <Divider>or</Divider>
      <div className="wrap-button-signup">
        <Button className="button-signup mt-3" variant="success" onClick={() => navigate('/register')} type="button">Sign Up</Button>
      </div>
    </Form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
