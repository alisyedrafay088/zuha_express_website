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
import { Partners } from "./components/Partners";
import { Integrations } from "./components/Integrations";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PromoAd />
        <TrustStrip />
        <Services />
        <Partners />
        <WhyChoose />
        <Integrations />
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
