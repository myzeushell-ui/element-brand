import { Hero } from "@/components/sections/Hero";
import { UseCases } from "@/components/sections/UseCases";
import { PowerRange } from "@/components/sections/PowerRange";
import { Economics } from "@/components/sections/Economics";
import { Capabilities } from "@/components/sections/Capabilities";
import { Configurator } from "@/components/sections/Configurator";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <UseCases />
      <PowerRange />
      <Economics />
      <Capabilities />
      <Configurator />
      <Process />
      <Faq />
      <FinalCta />
    </>
  );
}
