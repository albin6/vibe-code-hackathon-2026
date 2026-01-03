import { Zap, Github, Twitter, Linkedin, Youtube, Mail } from "lucide-react";
import { useMousePosition, useBackgroundParallax } from "@/hooks/useParallaxEffects";

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
  const mouse = useMousePosition(0.3);
  const { ref, offset } = useBackgroundParallax(0.2);

  return (
    <footer ref={ref} className="relative border-t border-border/50 overflow-hidden">
      {/* Glow divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-8 bg-primary/10 blur-xl will-change-transform"
        style={{ transform: `translateX(${mouse.x}px)` }}
      />

      {/* Background orbs with parallax */}
      <div 
        className="absolute -top-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl will-change-transform"
        style={{ transform: `translateY(${-offset * 0.3}px) translate(${mouse.x}px, ${mouse.y}px)` }}
      />
      <div 
        className="absolute -bottom-32 -right-32 w-64 h-64 bg-secondary/5 rounded-full blur-3xl will-change-transform"
        style={{ transform: `translateY(${-offset * 0.2}px) translate(${-mouse.x * 0.8}px, ${-mouse.y * 0.8}px)` }}
      />

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <a 
              href="#home" 
              className="flex items-center gap-2 mb-4 group"
              style={{ transform: `translate(${mouse.x * 0.1}px, ${mouse.y * 0.1}px)` }}
            >
              <div className="relative">
                <Zap className="w-8 h-8 text-primary transition-all duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 blur-md bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-display font-bold text-xl tracking-wider">
                VIBE<span className="text-primary">HACK</span>
              </span>
            </a>
            <p className="text-muted-foreground text-sm max-w-xs">
              The premier hackathon for developers who want to push boundaries and create the future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li 
                  key={link.label}
                  style={{ transform: `translateX(${mouse.x * 0.05 * (index + 1)}px)` }}
                >
                  <a
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="font-display font-semibold mb-4">Stay Connected</h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 will-change-transform"
                  style={{ transform: `translate(${mouse.x * 0.1 * (index - 2)}px, ${mouse.y * 0.05}px)` }}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              Follow us for updates, announcements, and behind-the-scenes content.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center md:text-left">
            © {new Date().getFullYear()} VibeHack. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Made with <span className="text-accent">♥</span> by the VibeHack Team
          </p>
        </div>
      </div>
    </footer>
  );
}
