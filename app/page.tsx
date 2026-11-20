import { About } from "../components/about";
import { Capabilities } from "../components/capabilities";
import { Contact } from "../components/contact";
import { Hero } from "../components/hero";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { Skills } from "../components/skills";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Skills />
        <Capabilities />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
