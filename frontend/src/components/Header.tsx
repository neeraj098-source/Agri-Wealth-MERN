import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, MessageCircle, Recycle, Home, Users } from 'lucide-react';

interface HeaderProps {
  onSignInClick?: () => void;
}

export function Header({ onSignInClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center transform rotate-12 transition-transform hover:rotate-0">
            <Recycle className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-green-700">Agri-Wealth</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#home" className="flex items-center space-x-2 hover:text-green-600 transition-colors">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </a>
          <a href="#marketplace" className="flex items-center space-x-2 hover:text-green-600 transition-colors">
            <Recycle className="w-4 h-4" />
            <span>Marketplace</span>
          </a>
          <a href="#chatbot" className="flex items-center space-x-2 hover:text-green-600 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>AI Assistant</span>
          </a>
          <a href="#companies" className="flex items-center space-x-2 hover:text-green-600 transition-colors">
            <Users className="w-4 h-4" />
            <span>Companies</span>
          </a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" onClick={onSignInClick}>Sign In</Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={onSignInClick}>Join Now</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a href="#home" className="flex items-center space-x-2 py-2">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </a>
            <a href="#marketplace" className="flex items-center space-x-2 py-2">
              <Recycle className="w-4 h-4" />
              <span>Marketplace</span>
            </a>
            <a href="#chatbot" className="flex items-center space-x-2 py-2">
              <MessageCircle className="w-4 h-4" />
              <span>AI Assistant</span>
            </a>
            <a href="#companies" className="flex items-center space-x-2 py-2">
              <Users className="w-4 h-4" />
              <span>Companies</span>
            </a>
            <div className="flex space-x-4 pt-4">
              <Button variant="outline" className="flex-1" onClick={onSignInClick}>Sign In</Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={onSignInClick}>Join Now</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}