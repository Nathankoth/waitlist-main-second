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
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the waitlist to lock in early access pricing and exclusive discounts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {tiers.map((tier, index) => (
            <Card 
              key={index}
              className={`relative transition-all duration-300 ${
                tier.featured 
                  ? 'border-primary shadow-luxury scale-105 md:scale-110' 
                  : 'border-border hover:shadow-premium'
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  {tier.tagline}
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-heading mb-2">{tier.name}</CardTitle>
                {!tier.featured && (
                  <p className="text-sm text-muted-foreground">{tier.tagline}</p>
                )}
                <CardDescription className="mt-4">{tier.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="mr-2 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button 
                  onClick={() => setShowWaitlist(true)}
                  className={`w-full ${
                    tier.featured 
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-luxury' 
                      : 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                  }`}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          * Pricing details will be shared with waitlist members before launch
        </p>
      </div>

      <WaitlistForm isOpen={showWaitlist} onClose={() => setShowWaitlist(false)} />
    </section>
  );
};

export default PricingTeaser;
