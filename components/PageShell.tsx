import { FloatingContact } from "./FloatingContact";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { SplashScreen } from "./SplashScreen";
import { WaterParticles } from "./WaterParticles";
import { getSiteContent } from "@/lib/cms";
import type { SiteContent } from "@/types/cms";

export async function PageShell({ children, splash = false, content }: { children: React.ReactNode; splash?: boolean; content?: SiteContent }) {
  const siteContent = content || (await getSiteContent());

  return (
    <>
      {splash && <SplashScreen />}
      <WaterParticles />
      <Navbar />
      <FloatingContact contact={siteContent} />
      {children}
      <Footer contact={siteContent} />
    </>
  );
}
