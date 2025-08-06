import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Shop: [
      { name: "All Products", path: "/products" },
      { name: "Categories", path: "/categories" },
      { name: "New Arrivals", path: "/new" },
      { name: "Sale", path: "/sale" }
    ],
    Support: [
      { name: "Help Center", path: "/help" },
      { name: "Shipping Info", path: "/shipping" },
      { name: "Returns", path: "/returns" },
      { name: "Contact Us", path: "/contact" }
    ],
    Company: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Press", path: "/press" },
      { name: "Blog", path: "/blog" }
    ]
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Mail, href: "mailto:hello@neocraft.com", label: "Email" }
  ];

  return (
    <footer className="relative mt-20">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-instagram opacity-5" />
      
      <div className="relative glass border-t border-glass-border">
        <div className="container mx-auto px-4 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/" className="inline-block mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-3xl font-bold bg-gradient-instagram bg-clip-text text-transparent"
                >
                  NeoCraft
                </motion.div>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-md">
                Experience the future of shopping with our cutting-edge e-commerce platform. 
                Discover premium products with revolutionary technology.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-2 glass hover:glass-hover rounded-lg transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold text-foreground mb-4">{category}</h3>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-12 pt-8 border-t border-glass-border">
            <div className="max-w-md">
              <h3 className="font-semibold text-foreground mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-muted-foreground mb-4">
                Get the latest updates on new products and exclusive offers.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 glass border border-glass-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent text-foreground placeholder:text-muted-foreground"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-instagram text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-glass-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 NeoCraft. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;