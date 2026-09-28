import { Header } from "./components/Header";
import { VideoHero } from "./components/VideoHero";
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
import { KeySolutions } from "./components/KeySolutions";
import { SellerPortal } from "./components/SellerPortal";
import { PortalShowcase } from "./components/PortalShowcase";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <VideoHero />
        <PromoAd />
        <TrustStrip />
        <Services />
        <KeySolutions />
        <SellerPortal />
        <PortalShowcase />
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
