import React from 'react';
import { Button, CloseButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function AddNewPostHeader({ addPost, title, body }) {
  const navigate = useNavigate();

  return (
    <div className="add-new-post-header">
      <CloseButton aria-label="Hide" className="add-new-post-close-button" onClick={() => navigate('/')} />
      <span>Create Post</span>
      {
        title && body ? (
          <Button variant="primary" className="add-new-post-button" type="button" onClick={addPost}>
            Post
          </Button>
        ) : (
          <Button variant="primary" disabled className="add-new-post-button" type="button" onClick={addPost}>
            Post
          </Button>
        )
      }
    </div>
  );
}

AddNewPostHeader.propTypes = {
  addPost: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default AddNewPostHeader;
