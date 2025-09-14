import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { Menu, X, CircleDot, LayoutDashboard, DollarSign, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Switch } from '@/components/ui/switch';

const Header = () => {
  const [activePage, setActivePage] = useState('features');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check system preference or localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  useEffect(() => {
    // Apply the theme to the document when it changes
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    // Save preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    // Close mobile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (mobileMenuOpen && !target.closest('[data-mobile-menu]') && !target.closest('[data-menu-button]')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);
  
  const handleNavClick = (page: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePage(page);
    const element = document.getElementById(page);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <div className="sticky top-0 z-50 pt-4 sm:pt-6 md:pt-8 px-3 sm:px-4 md:px-6">
        <header className="w-full max-w-7xl mx-auto py-3 sm:py-4 px-4 sm:px-6 md:px-8 flex items-center justify-between backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl shadow-glass supports-[backdrop-filter]:bg-white/5" style={{ background: 'var(--gradient-glass)' }}>
          <div className="p-2 sm:p-3 md:flex-shrink-0">
            <Logo />
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 sm:p-3 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 backdrop-blur-sm"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            data-menu-button
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center md:flex-1 md:justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
            <div className="rounded-full px-1 py-1 backdrop-blur-xl border border-white/20 shadow-glass supports-[backdrop-filter]:bg-white/5" style={{ background: 'var(--gradient-glass)' }}>
              <ToggleGroup type="single" value={activePage} onValueChange={(value) => value && setActivePage(value)} className="gap-0">
                <ToggleGroupItem 
                  value="features"
                  className={cn(
                    "px-3 lg:px-4 py-2 rounded-full transition-all duration-300 relative group text-sm lg:text-base",
                    activePage === 'features' 
                      ? 'text-primary-foreground bg-primary shadow-luxury' 
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/10 hover:shadow-lg'
                  )}
                  onClick={handleNavClick('features')}
                >
                  <CircleDot size={14} className="inline-block mr-1.5 lg:mr-2" /> 
                  Features
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="dashboard" 
                  className={cn(
                    "px-3 lg:px-4 py-2 rounded-full transition-all duration-300 relative group text-sm lg:text-base",
                    activePage === 'dashboard' 
                      ? 'text-primary-foreground bg-primary shadow-luxury' 
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/10 hover:shadow-lg'
                  )}
                  onClick={handleNavClick('dashboard')}
                >
                  <LayoutDashboard size={14} className="inline-block mr-1.5 lg:mr-2" /> 
                  Dashboard
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="pricing" 
                  className={cn(
                    "px-3 lg:px-4 py-2 rounded-full transition-all duration-300 relative group text-sm lg:text-base",
                    activePage === 'pricing' 
                      ? 'text-primary-foreground bg-primary shadow-luxury' 
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/10 hover:shadow-lg'
                  )}
                  onClick={handleNavClick('pricing')}
                >
                  <DollarSign size={14} className="inline-block mr-1.5 lg:mr-2" /> 
                  Pricing
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </nav>
          
          <div className="hidden md:flex items-center gap-3 lg:gap-4 md:flex-shrink-0">
            {/* Theme toggle for desktop */}
            <div className="flex items-center gap-2 rounded-full px-3 py-2 backdrop-blur-sm bg-white/5 border border-white/10">
              <Sun size={16} className={`transition-colors ${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
              <Switch 
                checked={isDarkMode} 
                onCheckedChange={toggleTheme} 
                className="data-[state=checked]:bg-primary scale-90"
              />
              <Moon size={16} className={`transition-colors ${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            
            {/* Authentication Buttons */}
            <div className="flex items-center gap-2 lg:gap-3">
              <Button 
                variant="ghost" 
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 px-3 lg:px-4"
                onClick={() => window.location.href = '/login'}
              >
                Log in
              </Button>
              <Button 
                variant="default" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-luxury transition-all duration-300 px-3 lg:px-4"
                onClick={() => window.location.href = '/dashboard'}
              >
                Get Started
              </Button>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile navigation overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 backdrop-blur-[30px] bg-black/60 dark:bg-black/70 z-[9999] animate-slide-up">
          <div 
            className="absolute top-20 sm:top-24 left-3 right-3 sm:left-4 sm:right-4 backdrop-blur-[40px] py-4 px-4 sm:px-6 border border-white/30 dark:border-white/20 rounded-xl shadow-premium bg-background/90 dark:bg-background/90 supports-[backdrop-filter]:bg-background/90"
            data-mobile-menu
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Navigation Links */}
              <div className="space-y-2">
                <a 
                  href="#features" 
                  className={`flex items-center px-4 py-3 text-sm sm:text-base rounded-lg transition-all duration-300 ${
                    activePage === 'features' 
                      ? 'bg-primary text-primary-foreground shadow-luxury' 
                      : 'text-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                  onClick={handleNavClick('features')}
                >
                  <CircleDot size={16} className="mr-3" /> 
                  Features
                </a>
                <a 
                  href="#dashboard" 
                  className={`flex items-center px-4 py-3 text-sm sm:text-base rounded-lg transition-all duration-300 ${
                    activePage === 'dashboard' 
                      ? 'bg-primary text-primary-foreground shadow-luxury' 
                      : 'text-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                  onClick={handleNavClick('dashboard')}
                >
                  <LayoutDashboard size={16} className="mr-3" /> 
                  Dashboard
                </a>
                <a 
                  href="#pricing" 
                  className={`flex items-center px-4 py-3 text-sm sm:text-base rounded-lg transition-all duration-300 ${
                    activePage === 'pricing' 
                      ? 'bg-primary text-primary-foreground shadow-luxury' 
                      : 'text-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                  onClick={handleNavClick('pricing')}
                >
                  <DollarSign size={16} className="mr-3" /> 
                  Pricing
                </a>
              </div>
              
              {/* Divider */}
              <div className="h-px bg-border"></div>
              
              {/* Theme Toggle */}
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <div className="flex items-center gap-3">
                  <Sun size={16} className={`transition-colors ${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                  <Switch 
                    checked={isDarkMode} 
                    onCheckedChange={toggleTheme} 
                    className="data-[state=checked]:bg-primary"
                  />
                  <Moon size={16} className={`transition-colors ${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
              </div>
              
              {/* Authentication Buttons for Mobile */}
              <div className="pt-2 space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                  onClick={() => window.location.href = '/login'}
                >
                  Log in
                </Button>
                <Button 
                  variant="default" 
                  className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90 shadow-luxury transition-all duration-300"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;