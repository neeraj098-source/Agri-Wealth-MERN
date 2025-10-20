import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Home,
  Scan,
  CreditCard,
  MessageSquare,
  ShoppingBag,
  User,
  LogOut,
  Leaf
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  user: {
    id?: string;
    email?: string;
    user_metadata?: {
      name?: string;
      userType?: string;
    };
    accessToken?: string;
  } | null;
  onSignOut: () => void;
}

export function Navigation({ currentPage, onPageChange, user, onSignOut }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'scanner', label: 'Scanner', icon: Scan },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'chatbot', label: 'AI Assistant', icon: MessageSquare }
  ];

  // Early return if no user
  if (!user) {
    return null;
  }

  // Safe access to user metadata with fallbacks
  const userName = user?.user_metadata?.name || user?.email || 'User';
  const userType = user?.user_metadata?.userType || 'User';

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-green-800">Agri-Wealth</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'default' : 'ghost'}
                onClick={() => onPageChange(item.id)}
                className="flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium">{userName}</span>
              <Badge variant="outline">
                {userType}
              </Badge>
            </div>
            <Button variant="outline" size="sm" onClick={onSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onPageChange(item.id)}
              className="flex flex-col items-center gap-1 h-auto py-2 px-3"
            >
              <item.icon className="h-4 w-4" />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}