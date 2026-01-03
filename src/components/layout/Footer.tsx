import { Zap, Github, Twitter, Linkedin, Youtube, Mail } from "lucide-react";

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
  return (
    <footer className="relative border-t border-border/50">
      {/* Glow divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-8 bg-primary/10 blur-xl" />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2 mb-4 group">
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
              {footerLinks.map((link) => (
                <li key={link.label}>
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
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
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
