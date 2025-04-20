
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "./ui/theme/AppTheme";
import AppAppBar from "./ui/AppAppBar";
import Hero from "./ui/Hero";
import TechnologyCollection from "./ui/LogoCollection";
import RedesignedFeaturesWithPopup from "./ui/Features";
import FAQ from "./ui/FAQ";
import { Divider } from "@mui/material";
import Footer from "./ui/Footer";


export default function LandingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline />
      <AppAppBar />
      <Hero />
      <div>
        <TechnologyCollection />
        <RedesignedFeaturesWithPopup />

        <FAQ />
        <Divider />
        <Footer />

      </div>
    </AppTheme>
  );
}
