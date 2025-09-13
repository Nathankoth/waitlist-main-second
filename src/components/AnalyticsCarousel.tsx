import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, TrendingUp, BarChart3, Calculator, Search, ShoppingCart, PieChart, Building, Home } from 'lucide-react';
import heroAnalytics from '@/assets/hero-analytics.jpg';
import dashboardCharts from '@/assets/dashboard-charts.jpg';
import workspaceModern from '@/assets/workspace-modern.jpg';
import officeAnalytics from '@/assets/office-analytics.jpg';
import teamCollaboration from '@/assets/team-collaboration.jpg';
import financialData from '@/assets/financial-data.jpg';
import tradingSetup from '@/assets/trading-setup.jpg';
import businessMeeting from '@/assets/business-meeting.jpg';

const AnalyticsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Market Analysis Overview",
      description: "Comprehensive real estate market data and investment insights with real-time analytics",
      image: heroAnalytics,
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      feature: "Real-time Analytics",
      metrics: {
        value: "$2.4M",
        trend: "+12.5%",
        properties: "10K+"
      }
    },
    {
      id: 2,
      title: "2D Rendering & Visualization",
      description: "Advanced visualization tools for property design and planning with AI-powered rendering",
      image: dashboardCharts,
      icon: <BarChart3 className="h-8 w-8 text-accent" />,
      feature: "Design Tools",
      metrics: {
        speed: "89%",
        quality: "4K",
        projects: "500+"
      }
    },
    {
      id: 3,
      title: "ROI Calculator",
      description: "Calculate investment returns with precision and accuracy using advanced algorithms",
      image: workspaceModern,
      icon: <Calculator className="h-8 w-8 text-primary" />,
      feature: "Investment Analysis",
      metrics: {
        roi: "15.8%",
        accuracy: "98%",
        calculations: "1M+"
      }
    },
    {
      id: 4,
      title: "Real Estate Search",
      description: "Discover existing properties with advanced search filters and market intelligence",
      image: officeAnalytics,
      icon: <Search className="h-8 w-8 text-accent" />,
      feature: "Property Discovery",
      metrics: {
        listings: "50K+",
        updated: "Daily",
        matches: "95%"
      }
    },
    {
      id: 5,
      title: "Marketplace",
      description: "Buy and sell properties in our integrated marketplace with secure transactions",
      image: teamCollaboration,
      icon: <ShoppingCart className="h-8 w-8 text-primary" />,
      feature: "Trading Platform",
      metrics: {
        volume: "$50M",
        growth: "+18.9%",
        users: "25K+"
      }
    },
    {
      id: 6,
      title: "Portfolio Visualization",
      description: "Track and visualize your real estate investment portfolio with advanced analytics",
      image: financialData,
      icon: <PieChart className="h-8 w-8 text-accent" />,
      feature: "Portfolio Management",
      metrics: {
        properties: "24",
        growth: "+4",
        value: "$1.2M"
      }
    },
    {
      id: 7,
      title: "Commercial Real Estate News",
      description: "Stay updated with the latest commercial property market trends and opportunities",
      image: tradingSetup,
      icon: <Building className="h-8 w-8 text-primary" />,
      feature: "Market Intelligence",
      metrics: {
        updates: "Daily",
        sources: "100+",
        accuracy: "99%"
      }
    },
    {
      id: 8,
      title: "Residential Real Estate News",
      description: "Latest insights on residential property markets and investment opportunities",
      image: businessMeeting,
      icon: <Home className="h-8 w-8 text-accent" />,
      feature: "Residential Intel",
      metrics: {
        insights: "500+",
        regions: "50",
        verified: "98%"
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
    <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-lg">
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
          <div className="h-full flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 p-3 sm:p-4 md:p-6">
            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-center space-y-3 sm:space-y-4 md:space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {React.cloneElement(slide.icon, { className: "h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" })}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground truncate">{slide.title}</h3>
                  <p className="text-primary text-xs sm:text-sm font-medium truncate">{slide.feature}</p>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed line-clamp-3">
                {slide.description}
              </p>
              
              <Button variant="outline" className="w-fit border-primary/30 text-primary hover:bg-primary/10 text-sm sm:text-base">
                Learn More
              </Button>
            </div>
            
            {/* Image Preview with Overlay */}
            <div className="flex-1 order-1 lg:order-2">
              <div className="h-full min-h-[180px] sm:min-h-[220px] md:min-h-[280px] relative rounded-lg overflow-hidden border border-primary/10">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
                  <h4 className="text-sm sm:text-base md:text-lg font-medium text-foreground mb-2 sm:mb-3 md:mb-4">Live Metrics</h4>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    {Object.entries(slide.metrics).map(([key, value], metricIndex) => (
                      <div key={metricIndex} className="text-center">
                        <div className="text-sm sm:text-base md:text-xl font-bold text-foreground truncate">{value}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground capitalize truncate">{key}</div>
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
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 sm:gap-3 md:gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevSlide}
          className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-background/80 hover:bg-background border border-primary/20"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
        
        <div className="flex gap-1 sm:gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-primary w-4 sm:w-6' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={nextSlide}
          className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-background/80 hover:bg-background border border-primary/20"
        >
          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsCarousel;