import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';

const ViewLink = () => (
  <div className="py-10">
    <div className=" max-w-3xl mx-auto">
      <Header />
      <Content />
      <Footer />
    </div>
  </div>
);

export default ViewLink;
