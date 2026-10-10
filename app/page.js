import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Tips from "@/components/Tips";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
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
        <Contact />
      </main>
      <ScrollEffects />
    </>
  );
}
