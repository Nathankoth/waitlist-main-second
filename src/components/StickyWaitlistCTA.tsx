import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import WaitlistForm from './WaitlistForm';

const StickyWaitlistCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden animate-slide-up">
        <Button
          size="lg"
          onClick={() => setShowForm(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-luxury hover:shadow-xl transition-all duration-300 px-8"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Join the Waitlist
        </Button>
      </div>

      <WaitlistForm isOpen={showForm} onClose={() => setShowForm(false)} />
    </>
  );
};

export default StickyWaitlistCTA;
