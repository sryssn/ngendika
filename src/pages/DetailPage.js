import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DetailPageFooter from '../components/DetailPage/DetailPageFooter';
import PostComment from '../components/PostComment';
import DetailPageHeader from '../components/DetailPage/DetailPageHeader';
import PostDetail from '../components/PostDetail';
import {
  asyncAddComment, asyncReceivePostDetail, asyncToggleLikeComment,
  asyncToggleLikePostDetail, asyncToggleNeutralLikeComment, asyncToggleNeutralLikePostDetail,
} from '../states/postDetail/action';
import Loading from '../components/Loading';

function DetailPage() {
  const { id } = useParams();
  const {
    postDetail = null,
    authUser,
  } = useSelector((states) => states);
  const [loading, setLoading] = React.useState(true);
  const [focus, setFocus] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceivePostDetail(id));
    setLoading(false);
  }, [id, dispatch]);

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ content, id }));
  };

  const onLikeComment = ({ threadId, commentId }) => {
    dispatch(asyncToggleLikeComment({ threadId, commentId }));
  };

  const onNeutralLikeComment = ({ threadId, commentId }) => {
    dispatch(asyncToggleNeutralLikeComment({ threadId, commentId }));
  };

  const onLike = (threadId) => {
    dispatch(asyncToggleLikePostDetail(threadId));
  };

  const onNeutralLike = (threadId) => {
    dispatch(asyncToggleNeutralLikePostDetail(threadId));
  };

  if (loading) {
    return <Loading />;
  }

  if (!postDetail) {
    return null;
  }

  return (
    <>
      <DetailPageHeader {...postDetail} />
      <div className="detail-page-wrapper">
        <PostDetail
          {...postDetail}
          authUser={authUser}
          neutral={onNeutralLike}
          like={onLike}
          setFocus={setFocus}
          focus={focus}
        />
        {
          (postDetail.comments).map((comment) => (
            <PostComment
              key={comment.id}
              {...comment}
              threadId={postDetail.id}
              likeComment={onLikeComment}
              commentId={comment.id}
              authUser={authUser}
              neutralLikeComment={onNeutralLikeComment}
            />
          )).reverse()
        }
      </div>
      <DetailPageFooter
        authUser={authUser}
        onAddComment={onAddComment}
        focus={focus}
        setFocus={setFocus}
      />
    </>
  );
}

export default DetailPage;
