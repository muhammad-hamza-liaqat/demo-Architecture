import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Tips from "@/components/Tips";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Stats from "@/components/Stats";
import Faq from "@/components/Faq";
import Clients from "@/components/Clients";
import Footer from "@/components/Footer";
import ScrollEffects from "@/components/ScrollEffects";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Process />
        <Tips />
        <Projects />
        <Services />
        <WhyUs />
        <Stats />
        <Clients />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <ScrollEffects />
    </>
  );
}
