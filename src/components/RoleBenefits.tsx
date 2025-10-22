import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building2, TrendingUp, Ruler, ClipboardCheck, Home, Scale } from 'lucide-react';

const roles = [
  {
    icon: Building2,
    title: 'Realtor',
    benefits: [
      'Generate stunning listing visuals from basic photos',
      'Provide instant property insights to close deals faster',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Investor',
    benefits: [
      'Quick ROI calculations and risk flags before site visits',
      'Scale your portfolio analysis with automated triage',
    ],
  },
  {
    icon: Ruler,
    title: 'Architect',
    benefits: [
      'Transform site photos into presentation-ready renders',
      'Streamline client communications with visual reports',
    ],
  },
  {
    icon: ClipboardCheck,
    title: 'Surveyor',
    benefits: [
      'Flag potential issues from photos before formal inspection',
      'Order verified reports for legal documentation',
    ],
  },
  {
    icon: Home,
    title: 'Homebuyer / Homeowner',
    benefits: [
      'Understand property condition before making offers',
      'Get renovation cost estimates and ROI projections',
    ],
  },
  {
    icon: Scale,
    title: 'Lawyer',
    benefits: [
      'Access authenticated property reports for due diligence',
      'Order verified exhibits for legal proceedings',
    ],
  },
];

const RoleBenefits = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Built for Every Role
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Tailored benefits for real estate professionals and property stakeholders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <Card 
                key={index}
                className="hover-lift border-border bg-card transition-all duration-300 hover:shadow-luxury"
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl font-heading mb-3">{role.title}</CardTitle>
                  <ul className="space-y-2">
                    {role.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-sm text-muted-foreground">
                        <span className="mr-2 mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoleBenefits;
