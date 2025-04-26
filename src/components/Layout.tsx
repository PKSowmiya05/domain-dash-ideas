
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Github, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  if (!user) {
    return <>{children}</>;
  }
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 
              onClick={() => navigate('/dashboard')} 
              className="text-xl font-bold text-primary cursor-pointer"
            >
              DevProject<span className="text-accent">Hub</span>
            </h1>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-4 items-center">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Hi, {user.name}</span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white p-4 border-t">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Hi, {user.name}</span>
                <Button variant="ghost" size="sm" onClick={logout} className="flex items-center">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
              
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-2 hover:bg-secondary rounded-md transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            </div>
          </nav>
        )}
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2023 DevProjectHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
