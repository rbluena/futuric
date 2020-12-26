import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@app/components';

const Section = ({ children, heading, link = {} }) => (
  <div className="py-4">
    <div className="flex border-b border-neutral-300">
      <h2 className=" text-neutral-600 text-xl">{heading}</h2>

      <span className="ml-auto">
        {link.url && <Link href={link.url}>{link.text}</Link>}
      </span>
    </div>
    {children}
  </div>
);

Section.defaultProps = {
  heading: '',
  link: {},
};

Section.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.node.isRequired,
  link: PropTypes.objectOf(PropTypes.shape),
};

export default Section;
