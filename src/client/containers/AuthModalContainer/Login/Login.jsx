import React from 'react';
import LoginForm from './LoginForm';
import SigninGoogle from './SigninGoogle';
import Footer from './Footer';
import Header from './Header';

const Register = () => (
  <div className="max-w-xs mx-auto py-2 overflow-y-auto">
    <Header />
    <LoginForm />
    <p className="text-neutral-500 text-xl text-center mb-4">or</p>
    <SigninGoogle />
    <Footer />
  </div>
);

export default Register;
