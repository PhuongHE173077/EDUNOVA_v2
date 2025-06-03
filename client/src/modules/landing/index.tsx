
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "./ui/AppAppBar";
import AppTheme from "./ui/theme/AppTheme";
import Hero from "./ui/Hero";
import LogoCollection from "./ui/LogoCollection";
import Features from "./ui/Features";
import { Divider } from "@mui/material";
import Testimonials from "./ui/Testimonials";
import Highlights from "./ui/Highlights";
import Pricing from "./ui/Pricing";
import FAQ from "./ui/FAQ";
import Footer from "./ui/Footer";
import { Button } from "@/components/ui/button";


export default function LandingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <div className="relative">
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />

        <AppAppBar />
        <Hero />
        <div>
          <LogoCollection />
          <Features />
          <Divider />
          <Testimonials />
          <Divider />
          <Highlights />
          <Divider />
          <Pricing />
          <Divider />
          <FAQ />
          <Divider />
          <Footer />
        </div>
      </AppTheme>
      <div className="fixed bottom-0 right-0">
        <a
          href="https://www.facebook.com/profile.php?id=61576805395860&locale=vi_VN"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-5 z-50"
        >
          <div className="relative w-14 h-14">
            <span className="absolute inset-0 rounded-full bg-teal-300 animate-ping opacity-40"></span>
            <Button
              className="rounded-full w-14 h-14 p-0 border-2 border-white bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-500 hover:to-cyan-500 shadow-md transition-all duration-300"
              variant="default"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.845c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </Button>
          </div>
        </a>
      </div>
    </div>
  );
}
