import React from 'react';
import RegisterForm from './RegisterForm';
import SignupGoogle from './SignupGoogle';
import Footer from './Footer';
import Header from './Header';

const Register = () => (
  <div className="w-full max-w-xs mx-auto py-2 overflow-y-auto">
    <Header />
    <RegisterForm />
    <p className="text-neutral-600 text-2xl text-center mb-4">or</p>
    <SignupGoogle />
    <Footer />
  </div>
);

export default Register;
