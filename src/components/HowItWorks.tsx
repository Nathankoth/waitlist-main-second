import React from 'react';
import { Upload, Zap, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Snap & Upload',
    description: 'Take 4-8 photos with your phone and upload them directly through our platform.',
  },
  {
    icon: Zap,
    title: 'Auto-Infer',
    description: 'Our AI analyzes the images to detect issues, calculate ROI, and generate insights instantly.',
  },
  {
    icon: CheckCircle,
    title: 'Decide or Verify',
    description: 'Review the automated report and optionally order professional verification or premium renders.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            From phone photos to professional insights in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative text-center">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-accent" />
                )}
                
                <div className="relative z-10 mb-6">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-luxury">
                    <Icon className="h-10 w-10" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
