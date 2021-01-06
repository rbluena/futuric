import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useEffectOnce } from 'react-use';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import { getUserProfileService } from '@app/services';
import { getLinksAction } from '@app/actions';
import { getUserProfileSuccess } from '@app/slices/authSlice';
import ProfileScreen from '@app/screens/Profile';

export async function getServerSideProps({ params }) {
  let data = null;

  try {
    const { profile } = params;
    // Removing at symbol
    const username = profile.slice(1);

    ({ data } = await getUserProfileService(username));

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
    }, // will be passed to the page component as props
  };
}

const Profile = ({ data }) => {
  const dispatch = useDispatch();
  dispatch(getUserProfileSuccess(data));

  useEffectOnce(() => {
    if (data) {
      dispatch(getLinksAction({ owner: data._id }));
    }
  });

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
};

Profile.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape),
};

export default Profile;
