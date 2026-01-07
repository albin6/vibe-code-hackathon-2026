import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { NeonButton } from "@/components/ui/NeonButton";
import { cn } from "@/lib/utils";
import { useMousePosition } from "@/hooks/useParallaxEffects";
import { useLocation } from "react-router-dom";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mouse = useMousePosition(0.5);
  const navigate = useNavigate();

  const location = useLocation();

  const navLinks = [
    {
      label: "Home",
      href: location.pathname === "/registration" ? "/" : "#home",
    },
    { label: "Highlights", href: "#highlights" },
    { label: "Schedule", href: "#schedule" },
    { label: "Rules", href: "#rules" },
    { label: "Register", href: "/registration" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href.startsWith("/")) {
      navigate(href);
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-[0_4px_30px_hsl(185_100%_50%/0.1)]"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with mouse effect */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="flex items-center gap-2 group"
            animate={{ x: mouse.x * 0.2, y: mouse.y * 0.2 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: mouse.x * 0.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Zap className="w-6 h-6 text-primary" />
            </motion.div>
            <div>
              <span className="font-display font-semibold text-lg">
                Vibe <span className="text-primary">Coding</span> Hackathon
              </span>
              <div className="text-xs text-muted-foreground hidden sm:block">
                Code. Create. Connect.
              </div>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="font-medium text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
                animate={{
                  x: mouse.x * 0.1 * (index - 1.5),
                  y: mouse.y * 0.08,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-primary shadow-[0_0_10px_hsl(185_100%_50%/0.5)]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            className="hidden md:block"
            animate={{ x: -mouse.x * 0.15, y: mouse.y * 0.08 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <NeonButton
              size="default"
              onClick={() => navigate("/registration")}
            >
              Submit Your Entry
            </NeonButton>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/50 overflow-hidden"
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : -20,
              }}
              transition={{ delay: index * 0.1 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 10,
            }}
            transition={{ delay: 0.4 }}
          >
            <NeonButton
              size="default"
              className="mt-2 w-full"
              onClick={() => {
                navigate("/registration");
                setIsMobileMenuOpen(false);
              }}
            >
              Submit Your Entry
            </NeonButton>
          </motion.div>
        </nav>
      </motion.div>
    </motion.header>
  );
}
