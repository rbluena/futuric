import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getLinkSuccess } from '@app/slices/linksSlice';
import { getLinkService } from '@app/services';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import PostScreen from '@app/screens/Posts/ViewPost';

export async function getServerSideProps({ params }) {
  let linkData = null;

  try {
    const { id } = params;

    ({ data: linkData } = await getLinkService(id));

    // If linkData is not found
    if (!linkData) {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      linkData,
    }, // will be passed to the page component as props
  };
}

const ViewPost = ({ linkData }) => {
  const dispatch = useDispatch();
  dispatch(getLinkSuccess(linkData));

  return (
    <LayoutManager>
      <Head title={linkData.title} />
      <Header />
      <PostScreen />
      <Footer />
    </LayoutManager>
  );
};

ViewPost.defaultProps = {
  linkData: {},
};

ViewPost.propTypes = {
  linkData: PropTypes.objectOf(PropTypes.shape),
};

export default ViewPost;
