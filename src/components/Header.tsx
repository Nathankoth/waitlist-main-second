
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
    <div className="sticky top-0 z-50 pt-4 sm:pt-6 md:pt-8 px-3 sm:px-4 md:px-6">
      <header className="w-full max-w-7xl mx-auto py-3 sm:py-4 px-4 sm:px-6 md:px-8 flex items-center justify-between backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl shadow-glass supports-[backdrop-filter]:bg-white/5" style={{ background: 'var(--gradient-glass)' }}>
        <div className="p-2 sm:p-3">
          <Logo />
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 sm:p-3 rounded-xl text-muted-foreground hover:text-foreground transition-colors"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
          <div className="rounded-full px-1 py-1 backdrop-blur-xl border border-white/20 shadow-glass supports-[backdrop-filter]:bg-white/5" style={{ background: 'var(--gradient-glass)' }}>
            <ToggleGroup type="single" value={activePage} onValueChange={(value) => value && setActivePage(value)}>
              <ToggleGroupItem 
                value="features"
                className={cn(
                  "px-4 py-2 rounded-full transition-all duration-300 relative group",
                  activePage === 'features' 
                    ? 'text-primary-foreground bg-primary shadow-luxury' 
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/10 hover:shadow-lg'
                )}
                onClick={handleNavClick('features')}
              >
                <CircleDot size={16} className="inline-block mr-1.5" /> Features
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="dashboard" 
                className={cn(
                  "px-4 py-2 rounded-full transition-all duration-300 relative group",
                  activePage === 'dashboard' 
                    ? 'text-primary-foreground bg-primary shadow-luxury' 
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/10 hover:shadow-lg'
                )}
                onClick={handleNavClick('dashboard')}
              >
                <LayoutDashboard size={16} className="inline-block mr-1.5" /> Dashboard
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="pricing" 
                className={cn(
                  "px-4 py-2 rounded-full transition-all duration-300 relative group",
                  activePage === 'pricing' 
                    ? 'text-primary-foreground bg-primary shadow-luxury' 
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/10 hover:shadow-lg'
                )}
                onClick={handleNavClick('pricing')}
              >
                <DollarSign size={16} className="inline-block mr-1.5" /> Pricing
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </nav>
        
        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 sm:top-20 left-3 right-3 sm:left-4 sm:right-4 backdrop-blur-xl py-4 px-4 sm:px-6 border border-white/20 rounded-xl shadow-glass z-50 supports-[backdrop-filter]:bg-white/5" style={{ background: 'var(--gradient-glass)' }}>
            <div className="flex flex-col gap-4">
              <a 
                href="#features" 
                className={`px-3 py-2 text-sm rounded-md transition-all duration-300 ${
                  activePage === 'features' ? 'bg-primary text-primary-foreground shadow-luxury' : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                }`}
                onClick={handleNavClick('features')}
              >
                <CircleDot size={16} className="inline-block mr-1.5" /> Features
              </a>
              <a 
                href="#dashboard" 
                className={`px-3 py-2 text-sm rounded-md transition-all duration-300 ${
                  activePage === 'dashboard' ? 'bg-primary text-primary-foreground shadow-luxury' : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                }`}
                onClick={handleNavClick('dashboard')}
              >
                <LayoutDashboard size={16} className="inline-block mr-1.5" /> Dashboard
              </a>
              <a 
                href="#pricing" 
                className={`px-3 py-2 text-sm rounded-md transition-all duration-300 ${
                  activePage === 'pricing' ? 'bg-primary text-primary-foreground shadow-luxury' : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                }`}
                onClick={handleNavClick('pricing')}
              >
                <DollarSign size={16} className="inline-block mr-1.5" /> Pricing
              </a>
              
              {/* Add theme toggle for mobile */}
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-muted-foreground">Theme</span>
                <div className="flex items-center gap-2">
                  <Sun size={16} className={`transition-colors ${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                  <Switch 
                    checked={isDarkMode} 
                    onCheckedChange={toggleTheme} 
                    className="data-[state=checked]:bg-primary"
                  />
                  <Moon size={16} className={`transition-colors ${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="hidden md:flex items-center gap-4">
          {/* Theme toggle for desktop */}
          <div className="flex items-center gap-2 rounded-full px-3 py-2">
            <Sun size={18} className={`transition-colors ${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
            <Switch 
              checked={isDarkMode} 
              onCheckedChange={toggleTheme} 
              className="data-[state=checked]:bg-primary"
            />
            <Moon size={18} className={`transition-colors ${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <div className="rounded-2xl">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300">Log in</Button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
