import React from 'react';
import PropTypes from 'prop-types';
import { useEffectOnce } from 'react-use';
import { useDispatch } from 'react-redux';
import { getCookieToken } from '@app/utils/session';
import { useAuthentication } from '@app/hooks';
import { getLinkSuccess } from '@app/slices/linksSlice';
import { getLinkService } from '@app/services';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import EditLinkScreen from '@app/screens/EditLink';

const EditLink = ({ linkData }) => {
  const { isAuthenticated } = useAuthentication();
  const dispatch = useDispatch();
  // Avoding to show page when redirecting
  useEffectOnce(() => {
    if (linkData) {
      dispatch(getLinkSuccess(linkData));
    }
  });

  if (!isAuthenticated) {
    return null;
  }

  return (
    <LayoutManager>
      <Head title="Edit Link" />
      <Header />
      <EditLinkScreen />
      <Footer />
    </LayoutManager>
  );
};

export async function getServerSideProps({ params, req }) {
  let linkData = null;

  try {
    const { id } = params;
    const token = getCookieToken(req);

    // If user is not authenticated
    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    ({ data: linkData } = await getLinkService(id));

    // If data is not found or user is not the original author
    if (!linkData || !linkData.isUserOwner) {
      return {
        notFound: true,
      };
    }

    // If link is not owned by user, we should return 404
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
EditLink.defaultProps = {
  linkData: {},
};

EditLink.propTypes = {
  linkData: PropTypes.objectOf(PropTypes.shape),
};

export default EditLink;
