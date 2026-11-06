import Navbar from "@/app/components/layout/Navbar";
import Hero from "@/app/components/layout/sections/Hero";
import About from "@/app/components/layout/sections/About";
import Experience from "@/app/components/layout/sections/Experience";
import Projects from "@/app/components/layout/sections/Projects";
import Skills from "@/app/components/layout/sections/Skills";
import Contact from "@/app/components/layout/sections/Contact";
import SmoothScroll from "@/app/components/layout/sections/SmoothScroll";
export default function Home() {
  
  return (
    <main>
      <SmoothScroll />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}