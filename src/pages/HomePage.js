import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomePageFooter from '../components/HomePage/HomePageFooter';
import HomePageHeader from '../components/HomePage/HomePageHeader';
import Loading from '../components/Loading';
import PostList from '../components/PostList';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import { asyncToggleLikePost, asyncToggleNeutralLikePost } from '../states/post/action';
import { asyncPopulateUsersAndPost } from '../states/shared/action';

function HomePage() {
  const {
    post = [],
    users = [],
    authUser,
  } = useSelector((states) => states);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndPost());
    setLoading(false);
  }, [dispatch]);

  const onLogOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  const onLike = (id) => {
    dispatch(asyncToggleLikePost(id));
  };

  const onNeutralLike = (id) => {
    dispatch(asyncToggleNeutralLikePost(id));
  };

  const postList = post.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <header>
        <HomePageHeader />
      </header>
      <main>
        <PostList post={postList} authUser={authUser} neutral={onNeutralLike} like={onLike} />
      </main>
      <footer>
        <HomePageFooter logOut={onLogOut} />
      </footer>
    </>
  );
}

export default HomePage;
