import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function AddNewPostInput({
  title, body, setBody, onTitleChange,
}) {
  const handleBodyChange = (e, editor) => {
    const data = editor.getData();
    setBody(data);
  };

  return (
    <Form>
      <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
        <Form.Control type="text" placeholder="Title" value={title} onChange={onTitleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <CKEditor
          editor={ClassicEditor}
          data={body}
          onChange={handleBodyChange}
          placeholder="Body"
        />
      </Form.Group>
    </Form>
  );
}

AddNewPostInput.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  setBody: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
};

export default AddNewPostInput;
