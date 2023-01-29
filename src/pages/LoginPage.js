import React from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <div className="login-page">
      <h1 className="brand-login-page">ngendika</h1>
      <Card className="form-card">
        <Card.Body>
          <Card.Title className="mb-4 mt-2 card-title-login-page">Log in to Ngendika</Card.Title>
          <LoginInput login={onLogin} />
        </Card.Body>
      </Card>
      <p className="login-register-page-copyright">Suryo Sasono © 2023</p>
    </div>
  );
}

export default LoginPage;
