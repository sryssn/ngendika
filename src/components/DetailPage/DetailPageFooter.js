import React, { useEffect, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function DetailPageFooter({
  authUser, onAddComment, focus, setFocus,
}) {
  const [content, setContent] = useState('');
  const inputFieldRef = React.useRef(null);

  useEffect(() => {
    if (focus) {
      inputFieldRef.current.focus();
      setFocus(false);
    }
  }, [focus]);

  const addComment = () => {
    onAddComment(content);
    setContent('');
    inputFieldRef.current.innerHTML = '';
  };

  function onContentChange(event) {
    setContent(event.target.innerHTML);
  }

  return (
    <div className="footer-input-comment">
      <div className="footer-input-comment-wrapper">
        <div className="detail-page-footer-wrapper-avatar-comment">
          <img src={authUser.avatar} alt={authUser} className="avatar-comment" />
          <div ref={inputFieldRef} className="detail-page-footer-text-field" placeholder="Comment" data-placeholder="Write a comment..." onInput={onContentChange} contentEditable />
          {
            content ? (
              <Button variant="light" className="button-send-icon" type="button" aria-label="Send Button" onClick={addComment}>
                <MdSend className="detail-page-send-icon" />
              </Button>
            ) : (null)
          }
        </div>
      </div>
    </div>
  );
}

const authUserShape = {
  avatar: PropTypes.string.isRequired,
};

DetailPageFooter.propTypes = {
  onAddComment: PropTypes.func.isRequired,
  authUser: PropTypes.shape(authUserShape).isRequired,
  focus: PropTypes.bool.isRequired,
  setFocus: PropTypes.func.isRequired,
};

export default DetailPageFooter;
