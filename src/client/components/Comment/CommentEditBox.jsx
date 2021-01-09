import React from 'react';
import PropTypes from 'prop-types';
import ContentEditable from 'react-sane-contenteditable';
import { Button } from '@app/components';

const CommentEditBox = ({ text, onChange, onCancel, onKeyDown, onSubmit }) => (
  <>
    <ContentEditable
      className="bg-white border-b border-neutral-300 focus:outline-none
           focus:border-primary-500 py-3 text-sm text-neutral-700"
      content={text}
      onChange={onChange}
      onKeyDown={onKeyDown}
      tabIndex="0"
      style={{ minHeight: '50px' }}
    />
    <div className="flex justify-end py-1">
      <Button
        variant="primary"
        size="xs"
        className="px-2 py-1 text-xs"
        onClick={onSubmit}
      >
        Submit
      </Button>
      &nbsp;
      <Button
        variant="primary"
        outline
        size="xs"
        className="px-2 py-1 text-xs"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  </>
);

CommentEditBox.defaultProps = {
  text: '',
  onKeyDown: () => {},
};

CommentEditBox.propTypes = {
  text: PropTypes.string,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CommentEditBox;
