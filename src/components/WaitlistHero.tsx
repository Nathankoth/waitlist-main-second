import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-analytics.jpg';
import WaitlistForm from './WaitlistForm';

const WaitlistHero = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden hero-background" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="relative z-20 text-center space-y-6 md:space-y-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="space-y-4 md:space-y-6">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary text-xs sm:text-sm font-medium animate-fade-in">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1.5 sm:mr-2" />
            <span>Vistaforge — Early Access</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-tight text-white leading-tight px-2 sm:px-0">
            Instant property snapshots — from phone photos to clear next steps
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-body px-4 sm:px-0">
            Upload phone photos or plans, get instant 2D diagnostic insights, a lightweight ROI triage, and an easy path to paid verification & photoreal renders.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
          <Button 
            size="lg"
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-500 hover:scale-105 shadow-luxury hover:shadow-xl"
          >
            <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Join the Waitlist
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-white/30 text-white hover:bg-white/10 hover:border-primary/50 font-semibold backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
          >
            Request a demo
          </Button>
        </div>
        
        <div className="text-xs sm:text-sm text-gray-300 font-body px-4 sm:px-0">
          Early access launching soon • Priority for waitlist members
        </div>
      </div>

      <WaitlistForm isOpen={showForm} onClose={() => setShowForm(false)} />

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistHero;
