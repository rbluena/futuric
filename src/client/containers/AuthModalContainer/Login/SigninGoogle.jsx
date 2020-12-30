import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { get, isObject } from 'lodash';
import GoogleLogin from 'react-google-login';
import { signinUserWithGoogleAction } from '@app/actions';

const { GOOGLE_CLIENT_ID } = process.env;

const SigninGoogle = ({ setApiError }) => {
  const dispatch = useDispatch();

  async function responseGoogle(response) {
    setApiError(null);

    const user = get(response, 'profileObj');
    const accessToken = get(response, 'accessToken');

    try {
      if (user && accessToken) {
        await dispatch(signinUserWithGoogleAction(user, accessToken));
      }
    } catch (error) {
      const { message } = error;

      // Handling errors from API.
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
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      // uxMode="redirect"
      cookiePolicy="single_host_origin"
    />
  );
};

SigninGoogle.propTypes = {
  setApiError: PropTypes.func.isRequired,
};

export default SigninGoogle;
