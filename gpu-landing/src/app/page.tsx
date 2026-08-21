import { Hero } from "@/components/sections/Hero";
import { PowerRange } from "@/components/sections/PowerRange";
import { SpecsStrip } from "@/components/sections/SpecsStrip";
import { Applications } from "@/components/sections/Applications";
import { Workflow } from "@/components/sections/Workflow";
import { ContactForm } from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <PowerRange />
      <SpecsStrip />
      <Applications />
      <Workflow />
      <ContactForm />
    </>
  );
}
