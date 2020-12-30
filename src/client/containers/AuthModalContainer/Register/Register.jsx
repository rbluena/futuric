import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import SignupGoogle from './SignupGoogle';
import Footer from './Footer';
import Header from './Header';

const Register = () => {
  const [apiError, setApiError] = useState(null);

  return (
    <div className="w-full max-w-xs mx-auto py-2 overflow-y-auto">
      <Header />
      {apiError && (
        <p className="text-sm text-center text-danger-500 mt-4">{apiError}</p>
      )}
      <RegisterForm setApiError={setApiError} />
      <p className="text-neutral-600 text-2xl text-center mb-4">or</p>
      <SignupGoogle setApiError={setApiError} />
      <Footer />
    </div>
  );
};

export default Register;
