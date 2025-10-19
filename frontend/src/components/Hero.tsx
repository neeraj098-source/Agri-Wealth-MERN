import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Leaf, Recycle, Bot } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero({ onStartSelling }: { onStartSelling: () => void }) {

  // Function to scroll to Chatbot section
  const handleScrollToChatbot = () => {
    const chatbotSection = document.getElementById('chatbot');
    if (chatbotSection) {
      chatbotSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to scroll to Marketplace section
  const handleScrollToMarketplace = () => {
    const marketplaceSection = document.getElementById('marketplace');
    if (marketplaceSection) {
      marketplaceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-24 min-h-screen flex items-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1715194717972-bc42451ec72c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGZhcm0lMjBmaWVsZHxlbnwxfHx8fDE3NTkyNjA3MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Agriculture field background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-blue-900/20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                className="text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Transform Your{' '}
                <span className="text-green-600 relative">
                  Agricultural
                  <motion.div
                    className="absolute -bottom-2 left-0 w-full h-1 bg-green-400 rounded"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </span>{' '}
                Waste into Wealth
              </motion.h1>

              <motion.p
                className="text-xl text-muted-foreground max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Connect with bio-plastic and fuel companies to sell your agricultural waste while getting expert farming advice from our AI assistant.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button size="lg" className="bg-green-600 hover:bg-green-700 group" onClick={onStartSelling}>
                Start Selling Waste
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a href="https://kisan-sahayak-ckv5.onrender.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="group w-full sm:w-auto">
                  <Bot className="mr-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Chat with AI
                </Button>
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Active Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">₹2M+</div>
                <div className="text-sm text-muted-foreground">Waste Value Traded</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-1 gap-6">

              {/* Card 1: Smart Agriculture Advice - Scrolls to Chatbot */}
              <a href="#chatbot" onClick={(e) => { e.preventDefault(); handleScrollToChatbot(); }} className="cursor-pointer">
                <motion.div
                  className="bg-card rounded-2xl p-6 border shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                  whileHover={{ rotateY: 5, rotateX: 5 }}
                  style={{ perspective: '1000px' }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Smart Agriculture Advice</h3>
                      <p className="text-sm text-muted-foreground">Get personalized farming tips from our AI chatbot</p>
                    </div>
                  </div>
                </motion.div>
              </a>

              {/* Card 2: Waste Marketplace - Scrolls to Marketplace */}
              <a href="#marketplace" onClick={(e) => { e.preventDefault(); handleScrollToMarketplace(); }} className="cursor-pointer">
                <motion.div
                  className="bg-card rounded-2xl p-6 border shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                  whileHover={{ rotateY: -5, rotateX: 5 }}
                  style={{ perspective: '1000px' }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Recycle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Waste Marketplace</h3>
                      <p className="text-sm text-muted-foreground">Trade agricultural waste with verified companies</p>
                    </div>
                  </div>
                </motion.div>
              </a>

              {/* Card 3: Real-time Support - Links to Kisan Sahayak */}
              <a href="https://kisan-sahayak-ckv5.onrender.com" target="_blank" rel="noopener noreferrer">
                <motion.div
                  className="bg-card rounded-2xl p-6 border shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                  whileHover={{ rotateY: 5, rotateX: -5 }}
                  style={{ perspective: '1000px' }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Bot className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Real-time Support</h3>
                      <p className="text-sm text-muted-foreground">24/7 assistance for all your farming needs</p>
                    </div>
                  </div>
                </motion.div>
              </a>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 right-10 w-20 h-20 bg-green-400/20 rounded-full blur-xl hidden lg:block"
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-10 w-16 h-16 bg-blue-400/20 rounded-full blur-xl hidden lg:block"
        animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </section>
  );
}