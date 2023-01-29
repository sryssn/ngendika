import React from 'react';
import {
  BottomNavigation, Paper, useScrollTrigger, Slide,
  BottomNavigationAction,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

function HideOnScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
}

function HomePageFooter({ logOut }) {
  const navigate = useNavigate();

  return (
    <HideOnScroll>
      <Paper
        sx={{
          position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent',
        }}
        elevation={0}
      >
        <BottomNavigation showLabels sx={{ width: 700 }} value="home" className="home-page-footer-wrapper">
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeIcon />}
            type="button"
            onClick={() => navigate('/')}
          />
          <BottomNavigationAction
            label="Leaderboard"
            value="leaderboard"
            icon={<LeaderboardIcon />}
            type="button"
            onClick={() => navigate('/leaderboards')}
          />
          <BottomNavigationAction
            label="Logout"
            value="logout"
            icon={<LogoutIcon />}
            type="button"
            onClick={logOut}
          />
        </BottomNavigation>
      </Paper>
    </HideOnScroll>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

HomePageFooter.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default HomePageFooter;
