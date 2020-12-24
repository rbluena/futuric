import React from 'react';
import PropTypes from 'prop-types';

const Aside = ({ title, children }) => (
  <div className="max-w-xs pl-2">
    {title && title.length && <h2 className="text-xl pb-6">{title}</h2>}

    <div className="bg-neutral-100">{children}</div>
  </div>
);

Aside.defaultProps = {
  title: '',
};

Aside.propTypes = {
  /** Children node to be rendered. */
  children: PropTypes.node.isRequired,

  /** Title of the aside if needed. */
  title: PropTypes.string,
};

export default Aside;
