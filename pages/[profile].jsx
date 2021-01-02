import React from 'react';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import { useDispatch } from 'react-redux';
import { getUserProfileService } from '@app/services';
import { getUserProfileSuccess } from '@app/slices/authSlice';
import ProfileScreen from '@app/screens/Profile';

export async function getServerSideProps({ params }) {
  let data = null;

  try {
    const { profile } = params;
    const username = profile.slice(1);

    ({ data } = await getUserProfileService(username));

    // If linkData is not found
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

  return (
    <LayoutManager>
      <Head title={data.brandname} />
      <Header />
      <ProfileScreen />
      <Footer />
    </LayoutManager>
  );
};

export default Profile;
