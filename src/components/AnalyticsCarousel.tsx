import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, TrendingUp, PieChart, BarChart3, LineChart } from 'lucide-react';

const AnalyticsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Real-time Price Analytics",
      description: "Track market movements as they happen with millisecond precision. Our advanced algorithms process thousands of data points per second.",
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      feature: "Live price feeds from 50+ exchanges",
      mockData: [
        { symbol: "BTC/USD", price: "$67,245.32", change: "+2.45%" },
        { symbol: "ETH/USD", price: "$3,824.56", change: "+1.89%" },
        { symbol: "SPY", price: "$428.91", change: "-0.23%" },
      ]
    },
    {
      title: "AI-Powered Forecasting",
      description: "Leverage machine learning models trained on historical data to predict market trends with 85% accuracy.",
      icon: <LineChart className="h-8 w-8 text-accent" />,
      feature: "Predictive analytics with confidence intervals",
      mockData: [
        { period: "Next 24h", prediction: "Bullish", confidence: "89%" },
        { period: "Next Week", prediction: "Neutral", confidence: "76%" },
        { period: "Next Month", prediction: "Bearish", confidence: "68%" },
      ]
    },
    {
      title: "Portfolio Visualization",
      description: "Manage and track your portfolios with interactive charts and real-time performance metrics.",
      icon: <PieChart className="h-8 w-8 text-fintech-teal" />,
      feature: "Multi-asset portfolio tracking",
      mockData: [
        { asset: "Stocks", allocation: "45%", value: "$125,430" },
        { asset: "Crypto", allocation: "30%", value: "$83,620" },
        { asset: "Bonds", allocation: "25%", value: "$69,684" },
      ]
    },
    {
      title: "Custom Dashboards",
      description: "Create personalized dashboards with drag-and-drop widgets tailored to your trading strategy.",
      icon: <BarChart3 className="h-8 w-8 text-secondary" />,
      feature: "50+ customizable widgets available",
      mockData: [
        { widget: "Price Alerts", active: "12" },
        { widget: "News Feed", active: "8" },
        { widget: "Technical Indicators", active: "15" },
      ]
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
          key={index}
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
            
            {/* Mock Data Visualization */}
            <div className="flex-1">
              <div className="h-full bg-card/50 rounded-lg border border-primary/10 p-6">
                <h4 className="text-lg font-medium text-foreground mb-4">Live Preview</h4>
                <div className="space-y-4">
                  {slide.mockData.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex justify-between items-center p-3 rounded-md bg-muted/20 border border-primary/5"
                    >
                      <div className="flex flex-col">
                        <span className="text-foreground font-medium">
                          {Object.values(item)[0] as string}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {Object.keys(item)[0]}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-foreground font-semibold">
                          {Object.values(item)[1] as string}
                        </div>
                        {Object.values(item)[2] && (
                          <div className={`text-sm ${
                            (Object.values(item)[2] as string).startsWith('+') 
                              ? 'text-green-400' 
                              : (Object.values(item)[2] as string).startsWith('-')
                              ? 'text-red-400'
                              : 'text-muted-foreground'
                          }`}>
                            {Object.values(item)[2] as string}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
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