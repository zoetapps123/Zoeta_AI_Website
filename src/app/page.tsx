import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Vision from "@/components/sections/Vision";
import FeaturedWork from "@/components/sections/FeaturedWork";
import About from "@/components/sections/About";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Vision />
      <FeaturedWork />
      <About />
      <ContactForm />
      <Footer />
    </main>
  );
}
