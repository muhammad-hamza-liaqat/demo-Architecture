import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Kondos from "@/components/Kondos";
import Solutions from "@/components/Solutions";
import Blog from "@/components/Blog";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Features from "@/components/Features";
import WhyUs from "@/components/WhyUs";
import Promo from "@/components/Promo";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollEffects from "@/components/ScrollEffects";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Kondos />
        <Solutions />
        <Blog />
        <Clients />
        <Services />
        <Features />
        <WhyUs />
        <Promo />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <ScrollEffects />
    </>
  );
}
