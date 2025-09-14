import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator } from "lucide-react"

const ROICalculator = () => {
  const [propertyValue, setPropertyValue] = useState("")
  const [expectedRent, setExpectedRent] = useState("")
  const [expenses, setExpenses] = useState("")
  const [result, setResult] = useState<{
    monthlyROI: number
    annualROI: number
    monthlyCashFlow: number
    capRate: number
    cashOnCashReturn: number
    breakEvenRatio: number
  } | null>(null)

  const calculateROI = () => {
    const value = parseFloat(propertyValue)
    const rent = parseFloat(expectedRent)
    const monthlyExpenses = parseFloat(expenses)

    if (value && rent && monthlyExpenses >= 0) {
      const monthlyCashFlow = rent - monthlyExpenses
      const annualCashFlow = monthlyCashFlow * 12
      const monthlyROI = (monthlyCashFlow / value) * 100
      const annualROI = monthlyROI * 12
      const capRate = (annualCashFlow / value) * 100
      const downPayment = value * 0.2 // Assuming 20% down payment
      const cashOnCashReturn = downPayment > 0 ? (annualCashFlow / downPayment) * 100 : 0
      const breakEvenRatio = rent > 0 ? (monthlyExpenses / rent) * 100 : 0

      setResult({
        monthlyROI,
        annualROI,
        monthlyCashFlow,
        capRate,
        cashOnCashReturn,
        breakEvenRatio
      })
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">ROI Calculator</h1>
          <p className="text-muted-foreground">Estimate returns on investment</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Investment Calculator
              </CardTitle>
              <CardDescription>Enter your property details to calculate ROI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="propertyValue">Property Value ($)</Label>
                <Input
                  id="propertyValue"
                  type="number"
                  placeholder="e.g., 500000"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expectedRent">Expected Monthly Rent ($)</Label>
                <Input
                  id="expectedRent"
                  type="number"
                  placeholder="e.g., 3000"
                  value={expectedRent}
                  onChange={(e) => setExpectedRent(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expenses">Monthly Expenses ($)</Label>
                <Input
                  id="expenses"
                  type="number"
                  placeholder="e.g., 800"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                />
              </div>
              
              <Button onClick={calculateROI} className="w-full">
                Calculate ROI
              </Button>
            </CardContent>
          </Card>
          
          {result && (
            <Card>
              <CardHeader>
                <CardTitle>Investment Analysis Results</CardTitle>
                <CardDescription>Comprehensive property investment metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="text-2xl font-bold text-primary">
                      {result.monthlyCashFlow >= 0 ? '+' : ''}${result.monthlyCashFlow.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">Monthly Cash Flow</div>
                  </div>
                  
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <div className="text-2xl font-bold text-accent-foreground">
                      {result.capRate.toFixed(2)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Cap Rate</div>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-foreground">
                      {result.monthlyROI.toFixed(2)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Monthly ROI</div>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-foreground">
                      {result.annualROI.toFixed(2)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Annual ROI</div>
                  </div>
                  
                  <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                    <div className="text-2xl font-bold text-secondary-foreground">
                      {result.cashOnCashReturn.toFixed(2)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Cash-on-Cash Return</div>
                    <div className="text-xs text-muted-foreground mt-1">Based on 20% down payment</div>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-foreground">
                      {result.breakEvenRatio.toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Expense Ratio</div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h5 className="font-semibold mb-2">Investment Summary</h5>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Annual Income:</span>
                      <p className="font-semibold">${(result.monthlyCashFlow * 12).toFixed(2)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Investment Grade:</span>
                      <p className="font-semibold text-primary">
                        {result.capRate >= 8 ? "Excellent" : result.capRate >= 6 ? "Good" : result.capRate >= 4 ? "Fair" : "Poor"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  * Results are estimates and don't include taxes, insurance, maintenance, vacancy, or other potential costs
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ROICalculator