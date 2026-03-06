import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";

const Vision = dynamic(() => import("@/components/sections/Vision"), { ssr: false });
const FeaturedWork = dynamic(() => import("@/components/sections/FeaturedWork"));
const About = dynamic(() => import("@/components/sections/About"));
const ContactForm = dynamic(() => import("@/components/sections/ContactForm"));
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
