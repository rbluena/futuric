import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { get, isObject } from 'lodash';
import GoogleLogin from 'react-google-login';
import { signupUserWithGoogleAction } from '@app/actions';

const { GOOGLE_CLIENT_ID } = process.env;

const SignupGoogle = ({ setApiError }) => {
  const dispatch = useDispatch();

  /** Submiting user from google. */
  async function responseGoogle(response) {
    setApiError(null);

    const user = get(response, 'profileObj');
    const accessToken = get(response, 'accessToken');

    try {
      if (user && accessToken) {
        await dispatch(
          signupUserWithGoogleAction(
            {
              firstname: user.givenName,
              lastname: user.familyName,
              email: user.email,
              image: user.imageUrl,
            },
            accessToken
          )
        );
      }
    } catch (error) {
      // Handling errors from API.
      const { message } = error;

      if (isObject(message)) {
        const keys = Object.keys(message);
        const err = message[keys[0]];
        setApiError(err);
      } else {
        setApiError(message);
      }
    }
  }

  return (
    <GoogleLogin
      className="w-full text-center justify-center"
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Sign up with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      // uxMode="redirect"
      cookiePolicy="single_host_origin"
    />
  );
};

SignupGoogle.propTypes = {
  setApiError: PropTypes.func.isRequired,
};

export default SignupGoogle;
