import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Zap, Github, Twitter, Linkedin, Youtube, Mail } from "lucide-react";
import { useMousePosition, useFloatingAnimation } from "@/hooks/useParallaxEffects";

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Mail, href: "mailto:hello@vibehack.dev", label: "Email" },
];

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Code of Conduct", href: "#" },
  { label: "Contact Us", href: "#" },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const mouse = useMousePosition(0.5);
  const float1 = useFloatingAnimation(0);
  const float2 = useFloatingAnimation(1);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const springConfig = { stiffness: 100, damping: 30 };
  const backgroundY = useSpring(useTransform(scrollYProgress, [0, 1], [50, 0]), springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <footer ref={footerRef} className="relative border-t border-border/50 overflow-hidden">
      {/* Glow divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-8 bg-primary/10 blur-xl"
        animate={{ x: mouse.x }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />

      {/* Background orbs with enhanced parallax */}
      <motion.div 
        className="absolute -top-32 -left-32 w-[300px] h-[300px] bg-primary/8 rounded-full blur-[100px]"
        style={{ y: backgroundY }}
        animate={{
          x: mouse.x * 1.5 + float1.y,
          rotate: float1.rotate,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 25 }}
      />
      <motion.div 
        className="absolute -bottom-32 -right-32 w-[250px] h-[250px] bg-secondary/8 rounded-full blur-[80px]"
        animate={{
          x: -mouse.x * 1.2 + float2.y,
          y: -mouse.y * 1.2,
          rotate: -float2.rotate,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 25 }}
      />

      <motion.div 
        className="container mx-auto px-4 py-12 md:py-16 relative z-10"
        style={{ opacity }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <motion.a 
              href="#home" 
              className="flex items-center gap-2 mb-4 group"
              animate={{ x: mouse.x * 0.15, y: mouse.y * 0.15 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Zap className="w-8 h-8 text-primary" />
                </motion.div>
                <div className="absolute inset-0 blur-md bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-display font-bold text-xl tracking-wider">
                VIBE<span className="text-primary">HACK</span>
              </span>
            </motion.a>
            <p className="text-muted-foreground text-sm max-w-xs">
              The premier hackathon for developers who want to push boundaries and create the future.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <motion.li 
                  key={link.label}
                  animate={{ x: mouse.x * 0.08 * (index + 1) }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                >
                  <motion.a
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Newsletter */}
          <motion.div variants={itemVariants}>
            <h4 className="font-display font-semibold mb-4">Stay Connected</h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  animate={{ 
                    x: mouse.x * 0.12 * (index - 2), 
                    y: mouse.y * 0.08 
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              Follow us for updates, announcements, and behind-the-scenes content.
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div 
          className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {new Date().getFullYear()} VibeHack. All rights reserved.
          </p>
          <motion.p 
            className="text-muted-foreground text-sm"
            whileHover={{ scale: 1.05 }}
          >
            Made with <motion.span 
              className="text-accent inline-block"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >♥</motion.span> by the VibeHack Team
          </motion.p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
