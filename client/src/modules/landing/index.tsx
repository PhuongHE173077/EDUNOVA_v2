
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


export default function LandingPage(props: { disableCustomTheme?: boolean }) {
  return (
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
  );
}
