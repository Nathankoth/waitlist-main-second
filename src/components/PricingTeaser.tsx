import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import WaitlistForm from './WaitlistForm';

const tiers = [
  {
    name: 'Free',
    tagline: 'Get Started',
    description: 'Perfect for trying out VistaForge',
    features: [
      'Up to 3 snapshots per month',
      'Basic ROI calculator',
      'Standard image enhancement',
      'Community support',
    ],
    cta: 'Join Waitlist',
  },
  {
    name: 'Pro',
    tagline: 'Most Popular',
    description: 'For active real estate professionals',
    features: [
      'Unlimited snapshots',
      'Advanced ROI analytics',
      'Premium image generation',
      'Shareable PDF reports',
      'Priority support',
      '10% off verification services',
    ],
    cta: 'Join Waitlist',
    featured: true,
  },
  {
    name: 'Enterprise',
    tagline: 'Custom Solutions',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Batch processing',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
      'White-label options',
    ],
    cta: 'Contact Sales',
  },
];

const PricingTeaser = () => {
  const [showWaitlist, setShowWaitlist] = useState(false);

  return (
    <section id="pricing" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
          Early Access & Exclusive Benefits
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
          Join the waitlist for early access pricing and exclusive launch discounts. Early members will receive priority access and special pricing on all VistaForge features.
        </p>
        <Button 
          size="lg"
          onClick={() => setShowWaitlist(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Join the Waitlist
        </Button>
      </div>

      <WaitlistForm isOpen={showWaitlist} onClose={() => setShowWaitlist(false)} />
    </section>
  );
};

export default PricingTeaser;
