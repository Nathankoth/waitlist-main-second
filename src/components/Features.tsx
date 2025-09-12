
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Layers, Grid3x3, ListCheck, BookOpen, Star, LayoutDashboard } from "lucide-react";

const Features = () => {
  const [openFeature, setOpenFeature] = useState<number | null>(null);
  
  const features = [
    {
      title: "Real-time Price Analytics",
      description: "Monitor market movements with millisecond precision across 50+ exchanges and asset classes.",
      expandedDescription: "Access live price feeds, volume data, and order book information from major exchanges worldwide. Track cryptocurrencies, stocks, forex, commodities, and derivatives with advanced charting tools and technical indicators.",
      icon: (
        <TrendingUp size={24} className="text-primary" />
      )
    },
    {
      title: "Market Trend Predictions",
      description: "AI-powered forecasting models with 85% accuracy to predict market movements.",
      expandedDescription: "Leverage machine learning algorithms trained on historical data, sentiment analysis, and market indicators. Get predictions with confidence intervals, risk assessments, and automated alerts for significant trend changes.",
      icon: (
        <Grid3x3 size={24} className="text-accent" />
      )
    },
    {
      title: "Portfolio Visualization",
      description: "Interactive dashboards to track and analyze your investment portfolios in real-time.",
      expandedDescription: "Visualize portfolio performance with advanced charts, heat maps, and correlation analysis. Track asset allocation, risk metrics, and performance attribution across multiple accounts and time periods.",
      icon: (
        <LayoutDashboard size={24} className="text-fintech-teal" />
      )
    },
    {
      title: "Custom Dashboards",
      description: "Build personalized analytics dashboards with drag-and-drop widgets and tools.",
      expandedDescription: "Create custom layouts with 50+ widgets including price charts, news feeds, economic calendars, and technical indicators. Save multiple dashboard configurations and share insights with your team.",
      icon: (
        <ListCheck size={24} className="text-primary" />
      )
    },
    {
      title: "Risk Management Tools",
      description: "Advanced risk analytics and portfolio optimization tools for informed decision making.",
      expandedDescription: "Calculate Value at Risk (VaR), beta, volatility, and correlation metrics. Set up automated alerts for risk thresholds and portfolio rebalancing recommendations based on your risk tolerance.",
      icon: (
        <Star size={24} className="text-accent" />
      )
    },
    {
      title: "API Integration",
      description: "Robust APIs for seamless integration with trading platforms and financial systems.",
      expandedDescription: "Connect with brokers, exchanges, and third-party tools through our comprehensive REST and WebSocket APIs. Real-time data streaming, automated trading capabilities, and extensive documentation with code examples.",
      icon: (
        <BookOpen size={24} className="text-fintech-teal" />
      )
    }
  ];
  
  const toggleFeature = (index: number) => {
    setOpenFeature(openFeature === index ? null : index);
  };
  
  return (
    <section id="features" className="w-full py-12 md:py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter">
            Everything you need for market analytics
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive fintech tools to analyze markets, predict trends, and optimize your investment strategy
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Collapsible
              key={index}
              open={openFeature === index}
              onOpenChange={() => toggleFeature(index)}
              className={`rounded-xl border ${openFeature === index ? 'border-cosmic-light/40' : 'border-cosmic-light/20'} cosmic-gradient transition-all duration-300`}
            >
              <CollapsibleTrigger className="w-full text-left p-6 flex flex-col">
                <div className="flex justify-between items-start">
                  <div className="h-16 w-16 rounded-full bg-cosmic-light/10 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-cosmic-muted transition-transform duration-200 ${
                      openFeature === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <h3 className="text-xl font-medium tracking-tighter mb-3">{feature.title}</h3>
                <p className="text-cosmic-muted">{feature.description}</p>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6 pt-2">
                <div className="pt-3 border-t border-cosmic-light/10">
                  <p className="text-cosmic-muted">{feature.expandedDescription}</p>
                  <div className="mt-4 flex justify-end">
                    <button className="text-cosmic-accent hover:text-cosmic-accent/80 text-sm font-medium">
                      Learn more →
                    </button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
