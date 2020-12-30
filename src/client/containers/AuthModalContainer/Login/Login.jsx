import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SigninGoogle from './SigninGoogle';
import Footer from './Footer';
import Header from './Header';

const Register = () => {
  const [apiError, setApiError] = useState(null);

  return (
    <div className="max-w-xs mx-auto py-2 overflow-y-auto">
      <Header />
      {apiError && (
        <p className="text-sm text-center text-danger-500 mt-4">{apiError}</p>
      )}
      <LoginForm setApiError={setApiError} />
      <p className="text-neutral-500 text-xl text-center mb-4">or</p>
      <SigninGoogle setApiError={setApiError} />
      <Footer />
    </div>
  );
};

export default Register;
