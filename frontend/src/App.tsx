import { useState } from 'react';
import { Auth } from './components/Auth';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Chatbot } from './components/Chatbot';
import { Marketplace } from './components/Marketplace';
import { WasteScanner } from './components/WasteScanner';
import { Payment } from './components/Payment';
import { Footer } from './components/Footer';
import { CreateListing } from './components/CreateListing';
import { AuthProvider, useAuth } from './utils/supabase/context';

function AppContent() {
  const { user, setUser, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [showAuth, setShowAuth] = useState(false);

  const handleSignOut = () => {
    setUser(null);
    setCurrentPage('home');
    setShowAuth(false);
  };

  const renderPage = () => {
    if (!user) {
      return (
        <div className="min-h-screen bg-background">
          <Header onSignInClick={() => setShowAuth(true)} />
          <main>
            <Hero onStartSelling={() => setShowAuth(true)} />
            <Marketplace />
            <Chatbot />
          </main>
          <Footer />
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <main>
            <Hero onStartSelling={() => setCurrentPage('create-listing')} />
            <Marketplace />
            <Chatbot />
          </main>
        );
      case 'create-listing':
        return <CreateListing />;
      case 'marketplace':
        return <Marketplace />;
      case 'scanner':
        return <WasteScanner user={user} />;
      case 'payment':
        return <Payment user={user} />;
      case 'chatbot':
        return <Chatbot />;
      default:
        return (
          <main>
            <Hero onStartSelling={() => setCurrentPage('create-listing')} />
            <Marketplace />
            <Chatbot />
          </main>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user && showAuth) {
    return <Auth onAuthSuccess={() => setShowAuth(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {user && (
        <Navigation
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          user={user}
          onSignOut={handleSignOut}
        />
      )}
      {renderPage()}
      {user && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}