import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import LiquidMetalBackdrop, {
  MouseLiquidField,
} from "./components/LiquidMetalBackdrop";
import ScrollProgress from "./components/ui/ScrollProgress";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Event from "./pages/Event";
import Register from "./pages/Register";
import Contact from "./pages/Contact";

// ── Page transition variants ──────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(3px)",
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
};

// ── Global IntersectionObserver for .reveal elements ─────────
function useRevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    // Observe any elements that need reveal (re-query after render)
    const observe = () => {
      document.querySelectorAll(".reveal, .reveal-left").forEach((el) => {
        if (!el.classList.contains("in-view")) io.observe(el);
      });
    };

    observe();
    // Re-observe after a tick in case dynamic content isn't mounted yet
    const id = setTimeout(observe, 300);
    return () => {
      clearTimeout(id);
      io.disconnect();
    };
  }, []);
}

const MainLanding = () => (
  <motion.div
    key="main"
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <Home />
    <About />
    <Event />
    <Register />
    <Contact />
  </motion.div>
);

function App() {
  const { hash } = useLocation();
  useRevealObserver();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [hash]);

  return (
    <div className="relative min-h-screen text-text-primary selection:bg-accent-orange selection:text-bg-base">
      {/* Global scroll progress bar — 2px gold line at viewport top */}
      <ScrollProgress />

      {/* Background layers (fixed, below all content) */}
      <div className="hex-grid-overlay opacity-30" />
      <LiquidMetalBackdrop className="liquid-metal--page" />
      <MouseLiquidField />

      {/* OrbitalBackdrop removed — was display:none and wasting render cycles */}

      <Navbar />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<MainLanding />} />
            <Route path="/register" element={<Register />} />
            {/* Redirect legacy routes to anchor points */}
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route
              path="/domains"
              element={<Navigate to="/#domains" replace />}
            />
            <Route
              path="/contact"
              element={<Navigate to="/#contact" replace />}
            />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
