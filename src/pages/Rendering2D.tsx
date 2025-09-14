import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Image as ImageIcon } from "lucide-react"

const Rendering2D = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">2D Rendering</h1>
          <p className="text-muted-foreground">Visualize architectural designs</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Floorplan
              </CardTitle>
              <CardDescription>Upload your architectural drawings for 2D rendering</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*,.pdf,.dwg"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports: JPG, PNG, PDF, DWG files
                  </p>
                </label>
              </div>
              
              {uploadedFile && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Uploaded file:</p>
                  <p className="text-sm text-muted-foreground">{uploadedFile.name}</p>
                </div>
              )}
              
              <div className="flex gap-2 mt-4">
                <Button className="flex-1" disabled={!uploadedFile}>
                  Generate 2D Render
                </Button>
                {uploadedFile && (
                  <Button variant="outline" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Render Preview</CardTitle>
              <CardDescription>Your 2D visualization will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-gradient-to-br from-muted via-muted/50 to-background rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                {uploadedFile ? (
                  <div className="text-center p-6">
                    <div className="animate-pulse">
                      <ImageIcon className="h-16 w-16 mx-auto text-primary mb-4" />
                      <p className="text-foreground font-medium">Processing your file...</p>
                      <p className="text-muted-foreground text-sm mt-2">2D rendering will appear here</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Upload a file to see the preview</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Rendering2D