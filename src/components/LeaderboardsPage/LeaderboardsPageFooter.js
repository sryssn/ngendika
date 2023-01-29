import React from 'react';
import {
  BottomNavigation, Paper, BottomNavigationAction,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

function LeaderboardsPageFooter({ logOut }) {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent',
      }}
      elevation={0}
    >
      <BottomNavigation showLabels sx={{ width: 700 }} value="leaderboard" className="home-page-footer-wrapper">
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
  );
}

LeaderboardsPageFooter.propTypes = {
  logOut: PropTypes.func.isRequired,
};

export default LeaderboardsPageFooter;
