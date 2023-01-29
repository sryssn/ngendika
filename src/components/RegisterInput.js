import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <Form>
      <Form.Control className="mb-2 mt-3 text-field" type="text" placeholder="Name" value={name} onChange={onNameChange} />
      <Form.Control className="mb-2 text-field" type="email" placeholder="Email" value={email} onChange={onEmailChange} />
      <Form.Control className="mb-3 text-field" type="password" placeholder="Password" value={password} onChange={onPasswordChange} />
      <div className="wrap-button-signup">
        <Button className="button-signup mb-3" variant="success" type="button" onClick={() => register({ name, email, password })}>Sign Up</Button>
      </div>
      <p type="button"><Link to="/">Already have an account?</Link></p>
    </Form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
