import React from 'react';
import RegisterForm from './RegisterForm';
import SignupGoogle from './SignupGoogle';
import Footer from './Footer';
import Header from './Header';

const Register = () => (
  <div className="max-w-xs max-h-screen mx-auto py-6 overflow-y-auto">
    <Header />
    <RegisterForm />
    <p className="text-neutral-600 text-2xl text-center mb-4">or</p>
    <SignupGoogle className="" />
    <Footer />
  </div>
);

export default Register;
