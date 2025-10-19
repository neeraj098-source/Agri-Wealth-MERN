import { motion } from 'framer-motion';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Recycle,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Leaf,
  MessageCircle,
  Users
} from 'lucide-react';

export function Footer() {

  // Helper function for smooth scrolling
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Section with ID "${sectionId}" not found.`); // Add warning for debugging
    }
  };

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Recycle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-700">Agri-Wealth</h3>
            </div>
            <p className="text-muted-foreground">
              Transforming agriculture through technology. Connecting farmers with sustainable waste management solutions and AI-powered farming guidance.
            </p>
            <div className="flex space-x-3">
              {/* Social Media Links */}
              <a href="https://www.facebook.com/profile.php?id=61560839291793" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Button size="icon" variant="outline" className="hover:bg-green-600 hover:text-white">
                  <Facebook className="w-4 h-4" />
                </Button>
              </a>
              <a href="https://x.com/neeraj_yad16262" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Button size="icon" variant="outline" className="hover:bg-green-600 hover:text-white">
                  <Twitter className="w-4 h-4" />
                </Button>
              </a>
              <a href="https://www.instagram.com/mr._yd_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Button size="icon" variant="outline" className="hover:bg-green-600 hover:text-white">
                  <Instagram className="w-4 h-4" />
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/neeraj-yadav-b80015377/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Button size="icon" variant="outline" className="hover:bg-green-600 hover:text-white">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="font-semibold">Quick Links</h4>
            <nav className="space-y-3">
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <Leaf className="w-4 h-4" />
                <span>Home</span>
              </a>
              <a href="#marketplace" onClick={(e) => { e.preventDefault(); scrollToSection('marketplace'); }} className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <Recycle className="w-4 h-4" />
                <span>Marketplace</span>
              </a>
              <a href="#chatbot" onClick={(e) => { e.preventDefault(); scrollToSection('chatbot'); }} className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                <span>AI Assistant</span>
              </a>
              {/* Companies section abhi page par nahi hai, isliye link # par hi rahega */}
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Companies section coming soon!'); }} className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                <Users className="w-4 h-4" />
                <span>Companies</span>
              </a>
            </nav>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-semibold">Services</h4>
            <nav className="space-y-3">
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Service: Waste Trading Platform'); }} className="block text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Waste Trading Platform</a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Service: AI Farming Assistant'); }} className="block text-muted-foreground hover:text-foreground transition-colors cursor-pointer">AI Farming Assistant</a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Service: Market Price Analytics'); }} className="block text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Market Price Analytics</a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Service: Company Partnerships'); }} className="block text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Company Partnerships</a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Service: Logistics Support'); }} className="block text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Logistics Support</a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Service: Quality Verification'); }} className="block text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Quality Verification</a>
            </nav>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="font-semibold">Stay Connected</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>support@agri-wealth.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-start space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 Green Valley, Tech Park, Bangalore, Karnataka 560001</span>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-sm font-medium">Subscribe to our newsletter</h5>
              <form onSubmit={(e) => {e.preventDefault(); alert('Newsletter subscription coming soon!')}} className="flex space-x-2">
                <Input type="email" placeholder="Your email" className="flex-1" required />
                <Button type="submit" className="bg-green-600 hover:bg-green-700">Subscribe</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Get updates on market prices, farming tips, and new features.
              </p>
            </div>
          </motion.div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="text-sm text-muted-foreground text-center md:text-left">
            © 2025 Agri-Wealth. All rights reserved. Built with sustainability in mind.
          </div>
          <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 text-sm">
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy Policy page coming soon!'); }} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Terms of Service page coming soon!'); }} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Terms of Service</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Cookie Policy page coming soon!'); }} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Cookie Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); alert('Help Center coming soon!'); }} className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Help Center</a>
          </div>
        </motion.div>

        {/* Awards & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 pt-8 border-t"
        >
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Trusted by leading organizations</p>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 opacity-60">
              <div className="text-xs text-muted-foreground">ISO 14001 Certified</div>
              <div className="text-xs text-muted-foreground">Green Business Award 2024</div>
              <div className="text-xs text-muted-foreground">Startup India Recognized</div>
              <div className="text-xs text-muted-foreground">Carbon Neutral Platform</div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}