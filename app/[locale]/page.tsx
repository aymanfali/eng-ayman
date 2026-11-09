import { ScrollProgress } from "@/components/animations/scroll-progress";
import { ExperienceEffects } from "@/components/animations/experience-effects";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { Story } from "@/components/sections/story";
import { Process } from "@/components/sections/process";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <ExperienceEffects />
      <ScrollProgress />
      <main id="top">
        <Hero />
        <Projects />
        <Services />
        <Story />
        <Process />
        <Contact />
      </main>
    </>
  );
}
