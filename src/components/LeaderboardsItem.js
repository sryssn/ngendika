import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardsItem({ user, score }) {
  return (
    <div className="leaderboards-item">
      <div>
        <img src={user.avatar} alt={user} className="leaderboards-avatar" />
        <span className="leaderboards-name">{user.name}</span>
      </div>
      <span className="leaderboards-score">{score}</span>
    </div>
  );
}

const userShape = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const leaderboardsShape = {
  score: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

LeaderboardsItem.propTypes = {
  ...leaderboardsShape,
};

export { leaderboardsShape };

export default LeaderboardsItem;
