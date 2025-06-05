import React from 'react';
import LandingNavBar from '../../components/LandingPageComponents/LandingNavBar/LandingNavBar';
import HeroSection from '../../components/LandingPageComponents/HeroSection/HeroSection';
import AboutSection from '../../components/LandingPageComponents/AboutSection/AboutSection';
import LandingFooter from '../../components/LandingPageComponents/LandingFooter/LandingFooter';
import ContactForm from '../../components/LandingPageComponents/ContactForm/ContactForm';

const LandingPage = () => {
  return (
    <>
    <LandingNavBar />
    <HeroSection />
    <AboutSection />
    <ContactForm />
    <LandingFooter />
    </>
  );
};

export default LandingPage;
