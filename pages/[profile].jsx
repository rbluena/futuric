import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import { getUserProfileService, getLinksService } from '@app/services';
import { getUserProfileSuccess } from '@app/slices/authSlice';
import { getLinksSuccess } from '@app/slices/linksSlice';
import ProfileScreen from '@app/screens/Profile';

export async function getServerSideProps({ params }) {
  let data = null;
  let links = null;

  try {
    const { profile } = params;
    // Removing at symbol
    const username = profile.slice(1);

    ({ data } = await getUserProfileService(username));

    if (data) {
      ({ data: links } = await getLinksService({ owner: data._id }));
    }

    // If data is not found
    if (!data) {
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
      data,
      links,
    }, // will be passed to the page component as props
  };
}

const Profile = ({ data, links }) => {
  const dispatch = useDispatch();
  dispatch(getUserProfileSuccess(data));
  dispatch(getLinksSuccess(links));

  return (
    <LayoutManager>
      <Head title={data.brandname} />
      <Header />
      <ProfileScreen profile={data} />
      <Footer />
    </LayoutManager>
  );
};

Profile.defaultProps = {
  data: {},
  links: {},
};

Profile.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape),
  links: PropTypes.objectOf(PropTypes.shape),
};

export default Profile;
