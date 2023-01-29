import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostItem, { postItemShape } from './PostItem';
import AvatarWrapper from './styled/AvatarWrapper';

function PostList({
  post, authUser, like, neutral,
}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="home-page-main-input">
        <AvatarWrapper>
          <img src={authUser.avatar} alt={authUser} className="home-page-main-avatar" />
          <Button className="home-page-main-text-field" onClick={() => navigate('/add-new-post')} variant="light" type="button">What do you want to share?</Button>
        </AvatarWrapper>
      </div>
      <div className="home-page-main-wrapper">
        {
          post.map((thread) => (
            <PostItem key={thread.id} {...thread} like={like} neutral={neutral} />
          ))
        }
      </div>
    </>
  );
}

const userShape = {
  avatar: PropTypes.string.isRequired,
};

PostList.propTypes = {
  post: PropTypes.arrayOf(PropTypes.shape(postItemShape)).isRequired,
  authUser: PropTypes.shape(userShape).isRequired,
  like: PropTypes.func.isRequired,
  neutral: PropTypes.func.isRequired,
};

export default PostList;
