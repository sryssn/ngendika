import React from 'react';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FaRegCommentAlt } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';
import ButtonWrapper from './styled/ButtonWrapper';

function PostDetail({
  title, body, comments, upVotesBy, id, neutral, like, authUser, setFocus, focus,
}) {
  const isPostLiked = upVotesBy.includes(authUser.id);

  const onLikeClick = (event) => {
    event.stopPropagation();
    if (isPostLiked) {
      neutral(id);
    } else {
      like(id);
    }
  };

  const onFocus = () => {
    if (focus) {
      setFocus(false);
    } else {
      setFocus(true);
    }
  };

  return (
    <>
      <div className="detail-post-body">
        <h2>{title}</h2>
        {parser(body)}
      </div>
      <div className="like-comment-wrapper">
        <div className="number-of-likes-wrapper">
          {
            upVotesBy.length > 0
              ? (
                <>
                  <AiFillLike className="likeButton" />
                  <span className="number-of-likes">{upVotesBy.length}</span>
                </>
              ) : null
          }
        </div>
        {
          comments.length > 0 ? (
            <span className="number-of-comments">
              {comments.length}
              {' '}
              comment
            </span>
          ) : (null)
        }
      </div>
      <ButtonWrapper>
        <Button className="button-like-wrapper" variant="light" type="button" onClick={onLikeClick}>
          {
            isPostLiked ? <AiFillLike className="button-like-icon likeButton" /> : <AiOutlineLike className="button-like-icon" />
          }
          <span>Like</span>
        </Button>
        <Button className="button-comment-wrapper" variant="light" type="button" onClick={onFocus}>
          <FaRegCommentAlt className="button-comment-icon" />
          <span>Comment</span>
        </Button>
      </ButtonWrapper>
    </>
  );
}

const postDetailShape = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

const authUserShape = {
  id: PropTypes.string.isRequired,
};

PostDetail.propTypes = {
  ...postDetailShape,
  neutral: PropTypes.func,
  like: PropTypes.func,
  authUser: PropTypes.shape(authUserShape).isRequired,
  setFocus: PropTypes.func.isRequired,
  focus: PropTypes.bool.isRequired,
};

PostDetail.defaultProps = {
  like: null,
  neutral: null,
};

export default PostDetail;
