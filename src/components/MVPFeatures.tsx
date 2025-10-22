import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Image, Box, AlertTriangle, Calculator, FileText, Shield } from 'lucide-react';

const features = [
  {
    icon: Image,
    title: '2D Image Generation',
    description: 'Enhance and clean phone photos; generate presentation-ready 2D visuals and quick pseudo-3D previews for listings.',
  },
  {
    icon: Box,
    title: '3D & Photoreal Renders',
    description: 'Order premium renders from trusted partners or freelancers. Pay-per-render — delivered to your inbox.',
  },
  {
    icon: AlertTriangle,
    title: 'Snapshot & Flagging',
    description: 'Upload 4–8 photos: the system detects visible issues (roof, cracks, drainage, access) and returns a score and top flags.',
  },
  {
    icon: Calculator,
    title: 'ROI Calculator / Triage',
    description: 'Quick inputs (price, repair, rent) produce ROI %, payback months, and a red/yellow/green indicator for quick decisions.',
  },
  {
    icon: FileText,
    title: 'Reports & Shareable PDFs',
    description: 'One-page buyer snapshots you can download or share via expiring links for clients or listings.',
  },
  {
    icon: Shield,
    title: 'Admin Queue & Verification',
    description: 'Paid verification and legal exhibits are routed to our admin/freelancer queue for manual checks and authenticated deliverables.',
  },
];

const MVPFeatures = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Core Features
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to transform phone photos into actionable property insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="hover-lift border-border bg-card transition-all duration-300 hover:shadow-luxury"
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-heading mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MVPFeatures;
