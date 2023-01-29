import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardsList from '../components/LeaderboardsList';
import LeaderboardsPageFooter from '../components/LeaderboardsPage/LeaderboardsPageFooter';
import Loading from '../components/Loading';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import { asyncLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const {
    leaderboards = [],
  } = useSelector((states) => states);

  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncLeaderboards());
    setLoading(false);
  }, [dispatch]);

  const onLogOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <LeaderboardsList leaderboards={leaderboards} />
      <LeaderboardsPageFooter logOut={onLogOut} />
    </>
  );
}

export default LeaderboardsPage;
