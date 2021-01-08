import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Avatar } from '@app/components';
import ContentEditable from 'react-sane-contenteditable';

const CommentBox = ({ author, onSubmit }) => {
  const [content, setContent] = useState('');

  function onChange(evt, value) {
    setContent({ text: value });
  }

  function submitData() {
    onSubmit({ text: content.text });
  }

  return (
    <div className="flex max-w-sm bg-neutral-50 rounded-md shadow-lg p-2 relative">
      <section className="px-2 w-full relative">
        <header className="flex items-center">
          <Avatar
            src={author.image && author.image.thumnail}
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
           focus:border-primary-500 h-12 my-4 text-sm"
          content={content.text}
          onChange={onChange}
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
