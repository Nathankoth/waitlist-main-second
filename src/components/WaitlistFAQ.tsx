import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Is Snapshot a legal survey?',
    answer: 'No — Snapshot is a diagnostic tool designed for quick property assessment. It provides insights based on visual analysis but is not a substitute for professional legal surveys. Legal exhibits and verified reports are available as paid services through our partner network.',
  },
  {
    question: 'How accurate is the ROI calculator?',
    answer: 'Our ROI calculator uses industry-standard formulas and market data to provide estimates. While highly accurate for preliminary analysis, we recommend consulting with financial advisors for final investment decisions. The calculator is designed to help you quickly identify promising opportunities.',
  },
  {
    question: 'What file formats are supported for photo uploads?',
    answer: 'We support all common image formats including JPEG, PNG, HEIC, and WebP. For best results, upload 4-8 clear photos showing different angles of the property. Our AI works with standard smartphone camera quality.',
  },
  {
    question: 'When will VistaForge launch?',
    answer: 'We\'re currently in private beta with select partners. Waitlist members will receive priority access as we scale up capacity. Early access invitations will be sent based on signup order and use case fit. Join the waitlist to be among the first to try VistaForge!',
  },
];

const WaitlistFAQ = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Everything you need to know about VistaForge
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-border rounded-lg px-6 bg-card hover:shadow-premium transition-all duration-300"
            >
              <AccordionTrigger className="text-left font-heading font-semibold text-lg hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default WaitlistFAQ;
