import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getLinkSuccess } from '@app/slices/linksSlice';
import { getLinkService } from '@app/services';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import LinkScreen from '@app/screens/ViewLink';

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

const ViewLink = ({ linkData }) => {
  const dispatch = useDispatch();
  dispatch(getLinkSuccess(linkData));

  return (
    <LayoutManager>
      <Head title={linkData.title} />
      <Header />
      <LinkScreen />
      <Footer />
    </LayoutManager>
  );
};

ViewLink.defaultProps = {
  linkData: {},
};

ViewLink.propTypes = {
  linkData: PropTypes.objectOf(PropTypes.shape),
};

export default ViewLink;
