import React from "react";
import { AboutUs } from "../Aboutus/AboutUs";
import CertificationsSection from "../Certificates/CertificationSection";
import ManagementTeam from "../ManagementTeam/ManagementTeam";
import ServicesSection from "./ServicesSection";
import ClientSection from "../clients/ClientSection";
import ContactSection from "../Contaus/ContactSection";
import { ProductSlider } from "./ProductSlider";
import Footer from "./Footer";
import Product from "../Product/product";

const HomePage = () => {
  return (
    <div className="space-y-0 px-0 py-0">
      
      <section id="product-slider">
        <ProductSlider />
      </section>

      <section id="about-us">
        <AboutUs />
      </section>

      <section id="management">
        <ManagementTeam/>
      </section>

      <section id="certifications">
        <CertificationsSection/>
      </section>

      <section id="services">
        <ServicesSection />
      </section>

      <section id="clients">
        <ClientSection/>
      </section>

      <section id="product">
        <Product />
      </section>

      <section id="contact">
        <ContactSection/>
      </section>

      <section id="footer">
        <Footer />
      </section>
    </div>
  );
};

export default HomePage;
