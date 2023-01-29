import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  const linkToHome = () => {
    navigate('/');
  };

  return (
    <div className="page-not-found">
      <div>
        <h1>404</h1>
        <h1>Page Not Found</h1>
        <p>We are sorry, the page you requested could not be found</p>
        <p>Please go back to the homepage</p>
        <Button type="button" onClick={linkToHome}>GO HOME</Button>
      </div>
    </div>
  );
}

export default PageNotFound;
