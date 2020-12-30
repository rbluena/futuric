import { get } from 'lodash';
import React from 'react';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { signinUserWithGoogleAction } from '@app/actions';

const { GOOGLE_CLIENT_ID } = process.env;

const SigninGoogle = () => {
  const dispatch = useDispatch();
  function responseGoogle(response) {
    const user = get(response, 'profileObj');
    const accessToken = get(response, 'accessToken');

    if (user && accessToken) {
      dispatch(signinUserWithGoogleAction(user, accessToken));
    } else {
      // const { error } = response;
      // const { details } = response;
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

export default SigninGoogle;
