import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, CircleDot } from 'lucide-react';
import AnalyticsCarousel from './AnalyticsCarousel';
import heroImage from '@/assets/hero-analytics.jpg';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    const dashboardTimer = setTimeout(() => {
      setDashboardVisible(true);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(dashboardTimer);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
      </div>
      
      {/* Premium gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-overlay)' }}></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent/60 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-accent/50 rounded-full animate-ping delay-500"></div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 text-center space-y-8 max-w-4xl mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="space-y-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary text-sm font-medium animate-fade-in">
            <CircleDot className="w-3 h-3 mr-2" />
            AI-Powered Market Intelligence
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-white leading-tight">
            Real-time Market Analytics.
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Smarter Decisions.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-body">
            Harness AI-driven insights and real-time real estate data for smarter investment and visualization.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="text-lg px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-500 hover:scale-105 shadow-luxury hover:shadow-xl"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10 hover:border-primary/50 font-semibold backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
          >
            <Play className="mr-2 h-5 w-5" />
            Explore Dashboard Demo
          </Button>
        </div>
        
        <div className="text-sm text-gray-300 font-body">
          Free 14-day trial • No credit card required • Real-time data included
        </div>
      </div>

      {/* Analytics Dashboard Preview */}
      <div className={`w-full max-w-7xl mt-16 px-6 z-10 transition-all duration-1000 delay-500 ${dashboardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-glass backdrop-blur-xl" style={{ background: 'var(--gradient-glass)' }}>
          {/* Dashboard Header */}
          <div className="bg-background/10 backdrop-blur-md w-full border-b border-white/10">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <div className="h-5 w-5 rounded bg-primary/80"></div>
                </div>
                <span className="text-white font-heading font-semibold text-lg">VistaForge Analytics Dashboard</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-primary/30 border-2 border-white/20"></div>
                  <div className="h-8 w-8 rounded-full bg-accent/30 border-2 border-white/20"></div>
                  <div className="h-8 w-8 rounded-full bg-white/20 border-2 border-white/20"></div>
                  <div className="h-8 w-8 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center text-xs text-white">+12</div>
                </div>
                
                <Button size="sm" className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 backdrop-blur-sm">
                  Share Dashboard
                </Button>
              </div>
            </div>
          </div>
          
          {/* Analytics Carousel */}
          <div className="p-6">
            <AnalyticsCarousel />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;