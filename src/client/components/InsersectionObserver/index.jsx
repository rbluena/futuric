import React from 'react';
import PropTypes from 'prop-types';
import 'intersection-observer';
import { useIntersection } from 'react-use';

const InsersectionObserver = ({ loadMore }) => {
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '40px',
    threshold: 0.25,
  });

  return (
    <div ref={intersectionRef}>
      {intersection && intersection.intersectionRatio > 0 && loadMore(true)}
    </div>
  );
};

InsersectionObserver.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default InsersectionObserver;
