import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { verifyUserService } from '@app/services';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import { setNotification } from '@app/slices/globalSlice';
import VerificationPage from '@app/screens/VerificationPage';

export async function getServerSideProps({ params }) {
  let verified = false;
  let error = null;
  try {
    const { token: verificationToken } = params;

    if (!verificationToken) {
      return {
        notFound: true,
      };
    }

    const response = await verifyUserService(verificationToken);

    if (response) {
      verified = true;
    }
  } catch (err) {
    error = err;
  }

  return {
    props: {
      verified,
      error,
    },
  };
}

const Verification = ({ verified, error }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (verified) {
      dispatch(
        setNotification({
          type: 'success',
          message:
            'Your account has been verified. You can continue with login.',
        })
      );
    }

    if (error) {
      dispatch(
        setNotification({
          type: 'error',
          message:
            'Verification failed. Please request new verification token.',
        })
      );
    }
  }, [error, verified, dispatch]);

  if (verified) {
    router.push('/#signin-modal');
    return null;
  }

  return (
    <LayoutManager>
      <Head title="Verify" />
      <Header />
      <VerificationPage />
      <Footer />
    </LayoutManager>
  );
};

Verification.defaultProps = {
  error: {},
};

Verification.propTypes = {
  verified: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.any)]),
};

export default Verification;
