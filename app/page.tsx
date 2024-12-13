import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSlideshow from '../components/HeroSlideshow';
import AboutSection from '../components/AboutSection';
import TimelineSection from '../components/TimelineSection';
import ProjectsSection from '../components/ProjectsSection';
import { Container } from '@mui/material';

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <section id="home">
          <HeroSlideshow />
        </section>

        <Container maxWidth="lg">
          <AboutSection />
          <TimelineSection />
          <ProjectsSection />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;

