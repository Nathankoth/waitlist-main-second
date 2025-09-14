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
  } | null>(null)

  const calculateROI = () => {
    const value = parseFloat(propertyValue)
    const rent = parseFloat(expectedRent)
    const monthlyExpenses = parseFloat(expenses)

    if (value && rent && monthlyExpenses >= 0) {
      const monthlyCashFlow = rent - monthlyExpenses
      const monthlyROI = (monthlyCashFlow / value) * 100
      const annualROI = monthlyROI * 12

      setResult({
        monthlyROI,
        annualROI,
        monthlyCashFlow
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
                <CardTitle>Results</CardTitle>
                <CardDescription>Your investment analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {result.monthlyCashFlow >= 0 ? '+' : ''}${result.monthlyCashFlow.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">Monthly Cash Flow</div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {result.monthlyROI.toFixed(2)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Monthly ROI</div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {result.annualROI.toFixed(2)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Annual ROI</div>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  * This calculation doesn't include taxes, insurance, or other fees
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