import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';
import WaitlistForm from './WaitlistForm';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (mobileMenuOpen && !target.closest('[data-mobile-menu]') && !target.closest('[data-menu-button]')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const navigationLinks = [
    { label: "Features", link: "#features" },
    { label: "Pricing", link: "#pricing" },
    { label: "FAQ", link: "#faq" }
  ];

  return (
    <>
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <header className="container mx-auto px-4 py-3 flex items-center justify-between lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Logo */}
          <div className="flex items-center lg:justify-start">
            <Logo />
          </div>
          
          {/* Desktop & Tablet Navigation */}
          <nav className="hidden md:flex items-center justify-center lg:justify-center space-x-4 lg:space-x-8">
            {navigationLinks.map((item) => (
              <a
                key={item.label}
                href={item.link}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-sm lg:text-base"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          {/* Desktop & Tablet Right Actions */}
          <div className="hidden md:flex items-center justify-end gap-2 lg:gap-4">
            {/* Theme Toggle */}
            <div className="flex items-center gap-2">
              <Sun size={16} className={`transition-colors ${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
              <Switch 
                checked={isDarkMode} 
                onCheckedChange={handleToggleTheme} 
                className="data-[state=checked]:bg-primary"
              />
              <Moon size={16} className={`transition-colors ${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            
            <Button 
              variant="default" 
              size="sm"
              className="bg-primary hover:bg-primary/90"
              onClick={() => setShowWaitlistForm(true)}
            >
              Join Waitlist
            </Button>
          </div>
          
          {/* Mobile Hamburger Menu Button */}
          <button 
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            data-menu-button
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-md">
          <div 
            className="absolute top-16 left-4 right-4 bg-background/95 backdrop-blur-xl border border-border rounded-lg shadow-lg p-6"
            data-mobile-menu
          >
            <div className="flex flex-col space-y-4">
              {/* Navigation Links */}
              {navigationLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.link}
                  className="text-foreground hover:text-primary transition-colors duration-200 py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Divider */}
              <div className="h-px bg-border my-4"></div>
              
              {/* Theme Toggle */}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <div className="flex items-center gap-2">
                  <Sun size={16} className={`transition-colors ${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                  <Switch 
                    checked={isDarkMode} 
                    onCheckedChange={handleToggleTheme} 
                    className="data-[state=checked]:bg-primary"
                  />
                  <Moon size={16} className={`transition-colors ${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
              </div>
              
              {/* Authentication Buttons */}
              <div className="pt-4">
                <Button 
                  variant="default" 
                  className="w-full justify-center bg-primary hover:bg-primary/90"
                  onClick={() => {
                    setShowWaitlistForm(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Join Waitlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <WaitlistForm isOpen={showWaitlistForm} onClose={() => setShowWaitlistForm(false)} />
    </>
  );
};

export default Header;