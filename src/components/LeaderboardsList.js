import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardsItem, { leaderboardsShape } from './LeaderboardsItem';

function LeaderboardsList({ leaderboards }) {
  return (
    <div className="leaderboards-page">
      <h2>Leaderboards</h2>
      <div className="users-scroe">
        <span>Users</span>
        <span>Score</span>
      </div>
      {
      leaderboards.map((leaderboard) => (
        <LeaderboardsItem key={leaderboard.user.id} {...leaderboard} />
      ))
      }
    </div>
  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape(leaderboardsShape)).isRequired,
};

export default LeaderboardsList;
