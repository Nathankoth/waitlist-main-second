import { DashboardLayout } from "@/components/DashboardLayout"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {
  const faqItems = [
    {
      question: "What is VistaForge?",
      answer: "VistaForge is a comprehensive real estate platform that provides market analysis, ROI calculations, 2D/3D rendering, property search, and portfolio management tools for real estate professionals and investors."
    },
    {
      question: "How accurate is the ROI Calculator?",
      answer: "Our ROI Calculator uses industry-standard formulas and real-time market data to provide highly accurate estimates. However, results should be used as guidance alongside professional financial advice."
    },
    {
      question: "What file formats do you support for 2D/3D rendering?",
      answer: "For 2D rendering, we support JPG, PNG, PDF, and DWG files. For 3D rendering, we support OBJ, FBX, GLTF, GLB, 3DS, and PLY file formats."
    },
    {
      question: "How do I search for properties?",
      answer: "Use our Property Search feature to filter by location, price range, property type, and other criteria. You can search by city name, zip code, or use our interactive map interface."
    },
    {
      question: "Can I track multiple properties in my portfolio?",
      answer: "Yes! Our Portfolio feature allows you to add multiple properties, track their performance, monitor market value changes, and analyze your overall investment performance."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use industry-standard encryption and security measures to protect your personal and financial information. Your data is never shared with third parties without your explicit consent."
    },
    {
      question: "How often is market data updated?",
      answer: "Our market analysis data is updated in real-time from multiple reliable sources including MLS systems, public records, and market research firms to ensure you have the most current information."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes, we provide 24/7 customer support through chat, email, and phone. Our team of real estate and technical experts is always ready to help you make the most of our platform."
    },
    {
      question: "Can I export my data?",
      answer: "Yes, you can export your portfolio data, analysis reports, and calculations in various formats including PDF, Excel, and CSV for your records and presentations."
    },
    {
      question: "Are there any usage limits?",
      answer: "Our platform offers different tiers with varying limits on renderings, searches, and portfolio size. Check your account settings to see your current plan and usage limits."
    }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">Find answers to common questions about VistaForge</p>
        </div>
        
        <div className="max-w-4xl">
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default FAQ