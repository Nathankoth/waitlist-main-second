import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import AnalyticsCarousel from './AnalyticsCarousel';
import { TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-analytics.jpg';
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return <section className="relative w-full py-12 md:py-20 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden min-h-screen">
      {/* Hero Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/75 to-background/85"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-fintech-cyan/20 via-transparent to-fintech-teal/15"></div>
        <div className="absolute inset-0 fintech-gradient opacity-15"></div>
      </div>
      
      {/* Cosmic particle effect */}
      <div className="absolute inset-0 cosmic-grid opacity-20"></div>
      
      {/* Gradient glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full">
        <div className="w-full h-full opacity-20 bg-primary blur-[150px]"></div>
      </div>
      
      <div className={`relative z-10 max-w-4xl text-center space-y-6 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-muted/50 text-primary backdrop-blur-sm border border-primary/20">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            AI-Powered Market Intelligence
            <TrendingUp className="h-4 w-4 text-primary" />
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-balance text-foreground">
          Real-time Market Analytics. <span className="fintech-gradient bg-clip-text text-transparent">Smarter Decisions.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Harness the power of AI-driven insights and real-time market data to make informed investment decisions. Built for traders, analysts, and financial professionals who demand precision.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 items-center">
          <Button className="fintech-gradient text-primary-foreground hover:opacity-90 text-base h-12 px-8 transition-all duration-200 min-h-[48px] shadow-lg">
            Get Started
          </Button>
          <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 text-base h-12 px-8 transition-all duration-200 min-h-[48px]">
            Explore Dashboard Demo
          </Button>
        </div>
        
        <div className="pt-6 text-sm text-muted-foreground">
          Free 14-day trial • No credit card required • Real-time data included
        </div>
      </div>
      
      {/* Analytics Dashboard Preview */}
      <div className={`w-full max-w-7xl mt-16 z-10 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="cosmic-glow relative rounded-xl overflow-hidden border border-primary/20 backdrop-blur-sm bg-card/50 shadow-2xl">
          {/* Dashboard Header */}
          <div className="bg-card/80 backdrop-blur-md w-full border-b border-primary/10">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-md bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <span className="text-foreground font-medium">VistaForge Analytics Dashboard</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-primary/20 border-2 border-card"></div>
                  <div className="h-8 w-8 rounded-full bg-accent/20 border-2 border-card"></div>
                  <div className="h-8 w-8 rounded-full bg-secondary/40 border-2 border-card"></div>
                  <div className="h-8 w-8 rounded-full bg-muted/60 border-2 border-card flex items-center justify-center text-xs text-foreground">+5</div>
                </div>
                
                <div className="h-8 px-3 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm font-medium">
                  Share Dashboard
                </div>
              </div>
            </div>
          </div>
          
          {/* Analytics Carousel */}
          <div className="p-6">
            <AnalyticsCarousel />
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;