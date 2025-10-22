
import React from 'react';
import Header from '@/components/Header';
import WaitlistHero from '@/components/WaitlistHero';
import MVPFeatures from '@/components/MVPFeatures';
import HowItWorks from '@/components/HowItWorks';
import RoleBenefits from '@/components/RoleBenefits';
import Roadmap from '@/components/Roadmap';
import PricingTeaser from '@/components/PricingTeaser';
import Testimonials from '@/components/Testimonials';
import WaitlistFAQ from '@/components/WaitlistFAQ';
import Footer from '@/components/Footer';
import StickyWaitlistCTA from '@/components/StickyWaitlistCTA';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main>
        <WaitlistHero />
        <MVPFeatures />
        <HowItWorks />
        <RoleBenefits />
        <Roadmap />
        <PricingTeaser />
        <Testimonials />
        <WaitlistFAQ />
      </main>
      <Footer />
      <StickyWaitlistCTA />
    </div>
  );
};

export default Index;
