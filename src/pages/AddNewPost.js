import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddNewPostHeader from '../components/AddNewPost/AddNewPostHeader';
import AddNewPostInput from '../components/AddNewPostInput';
import { asyncAddPost } from '../states/post/action';
import useInput from '../hooks/useInput';

function AddNewPost() {
  const [valueTitle, onTitleChange] = useInput('');
  const [valueBody, , setBody] = useInput('');
  const { authUser } = useSelector((states) => states);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onAddPost = (title, body) => {
    dispatch(asyncAddPost({ title, body }));
    navigate('/');
  };

  const addPost = () => {
    onAddPost(valueTitle, valueBody);
  };

  return (
    <div className="add-new-post">
      <AddNewPostHeader addPost={addPost} title={valueTitle} body={valueBody} />
      <div className="add-new-post-wrapper-avatar-name">
        <img src={authUser.avatar} alt={authUser} className="add-new-page-avatar" />
        <span className="add-new-post-name">{authUser.name}</span>
      </div>
      <AddNewPostInput
        body={valueBody}
        title={valueTitle}
        setBody={setBody}
        onTitleChange={onTitleChange}
      />
    </div>
  );
}

export default AddNewPost;
