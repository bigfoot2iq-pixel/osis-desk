import CTA from "@/components/CTA";
import Collection from "@/components/Collection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Process from "@/components/Process";
import Value from "@/components/Value";
import Voices from "@/components/Voices";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Collection />
        <Value />
        <Process />
        <Voices />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
