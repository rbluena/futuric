import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getLinksStateSelector, getUserSelector } from '@app/selectors';
import { openModal } from '@app/slices/globalSlice';
import { toggleWaitingAction } from '@app/actions';
import { ContentWrapper } from '@app/components';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

const ViewPost = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  let owner = {};

  if (post) {
    owner = post.owner;
  }

  function toggleWaiting() {
    if (user) {
      const type = post.isUserWaiting ? 'remove' : 'add';
      dispatch(toggleWaitingAction(post._id, type));
    } else {
      dispatch(openModal('signin'));
    }
  }

  return (
    <div className="py-4 md:py-6">
      <ContentWrapper className="bg-white shadow-sm rounded-sm">
        <Header post={post} owner={owner} toggleWaiting={toggleWaiting} />
        <Content post={post} />
        <Footer post={post} />
      </ContentWrapper>
    </div>
  );
};

ViewPost.propTypes = {
  post: PropTypes.objectOf(PropTypes.shape).isRequired,
  // user: PropTypes.objectOf(PropTypes.shape),
};

const mapStateToProps = (state) => ({
  post: getLinksStateSelector(state).activeLink || {},
  // user: getUserSelector(state),
});

export default connect(mapStateToProps)(ViewPost);
