import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { FaPlus } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

function HomePageHeader() {
  const navigate = useNavigate();

  return (
    <HideOnScroll>
      <AppBar sx={{ backgroundColor: 'transparent' }} elevation={0}>
        <div>
          <div className="containerHeaderNav">
            <div className="home-page-header-wrapper-brand-icons">
              <div className="home-page-header-wrapper-brand">ngendika</div>
              <div className="home-page-header-wrapper-icons">
                <Button className="home-page-header-icon-plus" variant="light" onClick={() => navigate('/add-new-post')} type="button" aria-label="Add New Post Button">
                  <FaPlus />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AppBar>
    </HideOnScroll>
  );
}

export default HomePageHeader;
