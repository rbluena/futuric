import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Avatar } from '@app/components';
import ContentEditable from 'react-sane-contenteditable';

const CommentBox = ({ author, onSubmit }) => {
  const [content, setContent] = useState('');

  function onChange(evt, value) {
    setContent(value);
  }

  function submitData() {
    onSubmit({ text: content });
    setContent('');
  }

  function onKeyDown(evt) {
    if (evt.code === 'Enter') {
      submitData();
    }
  }

  return (
    <div className="flex max-w-sm rounded-md shadow-lg p-2 py-4 relative">
      <section className="px-2 w-full relative">
        <header className="flex items-center">
          <Avatar
            src={author.image && author.image.thumbnail}
            initials={author.initials}
            alt={author.brandname}
          />
          &nbsp;&nbsp;
          <p className=" font-bold text-neutral-900 text-sm">
            {author.brandname}
          </p>
        </header>
        <ContentEditable
          className="p-1 bg-white border-b border-neutral-300 focus:outline-none
           focus:border-primary-500 my-4 text-sm"
          content={content}
          onChange={onChange}
          onKeyDown={onKeyDown}
          tabIndex="0"
          style={{ minHeight: '50px' }}
        />
        <footer className="flex justify-end">
          <Button variant="primary" size="sm" onClick={submitData}>
            Submit
          </Button>
          &nbsp;
          <Button variant="primary" outline size="sm">
            Cancel
          </Button>
        </footer>
      </section>
    </div>
  );
};

CommentBox.propTypes = {
  author: PropTypes.objectOf(PropTypes.shape).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default CommentBox;
