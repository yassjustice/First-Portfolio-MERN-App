import React from "react";
import styles from "./Home.module.css";
import BrandShoutout from "../../conmponents/FrontOffice/BrandShoutout";
import HeroSection from "../../conmponents/FrontOffice/HeroSection";
import Header from "../../conmponents/FrontOffice/Header";
// import AboutSection from "../../components/FrontOffice/AboutSection";
// import PortfolioShowcase from "../../components/FrontOffice/PortfolioShowcase";
// import CTASection from "../../components/FrontOffice/CTASection";
// import Footer from "../../components/FrontOffice/Footer";

const Home = () => {
  return (
    <div className={styles.home}>
      {/* Top Branding Shoutout */}
      <BrandShoutout position="top" />

      {/* Header */}
      <Header/>

      {/* Main Sections */}
      <HeroSection />

      {/* <AboutSection /> */}
      {/* <PortfolioShowcase /> */}
      {/* <CTASection /> */}

      {/* Footer */}
      {/* <Footer /> */}

      {/* Bottom Branding Shoutout (Set hideBottom to true if you want to remove it in the future) */}
      <BrandShoutout position="bottom" hideBottom={false} />
    </div>
  );
};

export default Home;
