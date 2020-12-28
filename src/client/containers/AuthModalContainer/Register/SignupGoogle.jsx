import { get } from 'lodash';
import React from 'react';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { signupUserWithGoogleAction } from '@app/actions';

const { GOOGLE_CLIENT_ID } = process.env;

const SignupUser = () => {
  const dispatch = useDispatch();
  function responseGoogle(response) {
    const user = get(response, 'profileObj');
    const accessToken = get(response, 'accessToken');

    if (user && accessToken) {
      dispatch(signupUserWithGoogleAction(user, accessToken));
    } else {
      // const { error } = response;
      // const { details } = response;
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

export default SignupUser;
