import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { PromoAd } from "./components/PromoAd";
import {
  Coverage,
  DashboardCta,
  Faq,
  Features,
  HowItWorks,
  PrintCta,
  Services,
  Solutions,
  Testimonials,
  TrustStrip,
  WhatMakesDifferent,
  WhyChoose,
} from "./components/Sections";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PromoAd />
        <TrustStrip />
        <Services />
        <WhyChoose />
        <Solutions />
        <Features />
        <DashboardCta />
        <HowItWorks />
        <WhatMakesDifferent />
        <Coverage />
        <Testimonials />
        <Faq />
        <PrintCta />
      </main>
      <Footer />
    </>
  );
}
