import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ link }) => (
  <div className="pt-10">
    <div className="focus:outline-none text-4xl font-serif py-1 font-light">
      {link.title}
    </div>

    <div className="text-lg font-serif mt-6 mb-3 font-light">
      {link.description}
    </div>
  </div>
);

Content.defaultProps = {
  link: {},
};

Content.propTypes = {
  link: PropTypes.objectOf(PropTypes.shape),
};

export default Content;
