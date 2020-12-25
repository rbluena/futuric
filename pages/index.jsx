import React from 'react';
import { LayoutManager, Head, Footer, Header } from '@app/components';
import LandingPage from '@app/screens/LandingPage';

export default function Home() {
  return (
    <LayoutManager>
      <Head />
      <Header showHero showTopics />
      <LandingPage />
      <Footer />
    </LayoutManager>
  );
}
