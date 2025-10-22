import React from 'react';
import { Rocket, Shield, Layers, Building, TrendingUp } from 'lucide-react';

const phases = [
  {
    icon: Rocket,
    title: 'Pilot Launch',
    status: 'In Progress',
    description: 'Initial beta with core snapshot and ROI features',
  },
  {
    icon: Shield,
    title: 'Legal Verification Integration',
    status: 'Coming Soon',
    description: 'Partner network for authenticated legal exhibits',
  },
  {
    icon: Layers,
    title: 'Batch Triage',
    status: 'Planned',
    description: 'Analyze multiple properties simultaneously',
  },
  {
    icon: Building,
    title: 'Render Marketplace',
    status: 'Planned',
    description: 'Connect with vetted 3D rendering professionals',
  },
  {
    icon: TrendingUp,
    title: 'Market Insights',
    status: 'Future',
    description: 'Comparative market analysis and trend predictions',
  },
];

const Roadmap = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Product Roadmap
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We're continuously evolving to serve you better
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-muted hidden md:block" />
          
          <div className="space-y-8">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isActive = index === 0;
              
              return (
                <div key={index} className="relative flex items-start gap-6">
                  <div className={`flex-shrink-0 flex h-16 w-16 items-center justify-center rounded-full ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-luxury' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                        {phase.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isActive 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {phase.status}
                      </span>
                    </div>
                    <p className="text-base text-muted-foreground">
                      {phase.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
