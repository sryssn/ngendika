import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/user/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <div className="signup-page">
      <h1 className="brand-signup-page">ngendika</h1>
      <ListGroup className="form-signup-page">
        <ListGroup.Item>
          <h4 className="form-header-signup-page">Create a new account</h4>
          <p>It&apos;s quick and easy</p>
        </ListGroup.Item>
        <ListGroup.Item>
          <RegisterInput register={onRegister} />
        </ListGroup.Item>
      </ListGroup>
      <p className="login-register-page-copyright">Suryo Sasono © 2023</p>
    </div>
  );
}

export default RegisterPage;
