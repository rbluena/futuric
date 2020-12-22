import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button } from '@app/components';
import ContentEditable from 'react-sane-contenteditable';

const CommentBox = ({ author }) => {
  const [content, setContent] = useState('');

  function onChange(evt, value) {
    setContent({ text: value });
  }

  return (
    <div className="flex max-w-sm bg-neutral-100 rounded-md shadow-lg p-2 relative">
      <Avatar
        src={author.profile}
        alt={author.name}
        size="lg"
        className="border-2 border-primary-700"
      />
      <section className="px-2 w-full relative">
        <header>
          <p className="font-semibold text-neutral-700">{author.name}</p>
        </header>
        <ContentEditable
          className="p-1 bg-neutral-50 h-28 my-4 text-sm"
          content={content.text}
          onChange={onChange}
        />
        <footer className="flex justify-end">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Submit</Button>
        </footer>
      </section>
    </div>
  );
};

CommentBox.propTypes = {
  author: PropTypes.objectOf(PropTypes.shape).isRequired,
};
export default CommentBox;
