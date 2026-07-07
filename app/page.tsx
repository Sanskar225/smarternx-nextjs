import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import About from "@/components/About";
import Domains from "@/components/Domains";
import Products from "@/components/Products";
import Impact from "@/components/Impact";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <About />
        <hr className="mx-auto max-w-container border-line" />
        <Domains />
        <Products />
        <Impact />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
