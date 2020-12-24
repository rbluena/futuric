import React from 'react';
import LayoutManager from '@app/components/LayoutManager';
import Head from '@app/components/Head';
import { Footer } from '@app/components';
import Header from '@app/components/Header';
import LandingPage from '@app/screens/LandingPage';

export default function Home() {
  return (
    <LayoutManager>
      <Head />
      <Header showHero />
      <LandingPage />
      <Footer />
    </LayoutManager>
  );
}
