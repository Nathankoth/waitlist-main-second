import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, TrendingUp, PieChart, BarChart3, LineChart } from 'lucide-react';
import chartsImage from '@/assets/dashboard-charts.jpg';
import workspaceImage from '@/assets/workspace-modern.jpg';
import tradingImage from '@/assets/trading-setup.jpg';
import financialImage from '@/assets/financial-data.jpg';

const AnalyticsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Real-time Market Data",
      description: "Track price movements and market trends with millisecond precision",
      image: chartsImage,
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      feature: "Live price feeds from 50+ exchanges",
      metrics: {
        price: "$42,156.78",
        change: "+2.45%",
        volume: "2.1M"
      }
    },
    {
      id: 2,
      title: "AI-Powered Predictions",
      description: "Advanced machine learning algorithms analyze market patterns",
      image: tradingImage,
      icon: <LineChart className="h-8 w-8 text-accent" />,
      feature: "Predictive analytics with confidence intervals",
      metrics: {
        accuracy: "94.2%",
        signals: "127",
        confidence: "High"
      }
    },
    {
      id: 3,
      title: "Portfolio Analytics",
      description: "Comprehensive portfolio tracking and risk assessment tools",
      image: financialImage,
      icon: <PieChart className="h-8 w-8 text-fintech-teal" />,
      feature: "Multi-asset portfolio tracking",
      metrics: {
        returns: "+18.5%",
        risk: "Medium",
        allocation: "Balanced"
      }
    },
    {
      id: 4,
      title: "Professional Workspace",
      description: "Modern analytics workspace designed for financial professionals",
      image: workspaceImage,
      icon: <BarChart3 className="h-8 w-8 text-secondary" />,
      feature: "Enterprise-grade analytics platform",
      metrics: {
        uptime: "99.9%",
        speed: "2.1s",
        users: "50K+"
      }
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
            index === currentSlide
              ? 'translate-x-0 opacity-100'
              : index < currentSlide
              ? '-translate-x-full opacity-0'
              : 'translate-x-full opacity-0'
          }`}
        >
          <div className="h-full flex flex-col lg:flex-row gap-8 p-6">
            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  {slide.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">{slide.title}</h3>
                  <p className="text-primary text-sm font-medium">{slide.feature}</p>
                </div>
              </div>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                {slide.description}
              </p>
              
              <Button variant="outline" className="w-fit border-primary/30 text-primary hover:bg-primary/10">
                Learn More
              </Button>
            </div>
            
            {/* Image Preview with Overlay */}
            <div className="flex-1">
              <div className="h-full relative rounded-lg overflow-hidden border border-primary/10">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-fintech-cyan/10 via-transparent to-fintech-teal/10"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h4 className="text-lg font-medium text-foreground mb-4">Live Metrics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(slide.metrics).map(([key, value], metricIndex) => (
                      <div key={metricIndex} className="text-center">
                        <div className="text-xl font-bold text-foreground">{value}</div>
                        <div className="text-sm text-muted-foreground capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevSlide}
          className="h-10 w-10 rounded-full bg-background/80 hover:bg-background border border-primary/20"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-primary w-6' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={nextSlide}
          className="h-10 w-10 rounded-full bg-background/80 hover:bg-background border border-primary/20"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsCarousel;