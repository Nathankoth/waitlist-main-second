import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Box } from "lucide-react"

const Rendering3D = () => {
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
          <h1 className="text-3xl font-bold">3D Rendering</h1>
          <p className="text-muted-foreground">Interactive 3D visualization</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload 3D Model
              </CardTitle>
              <CardDescription>Upload 3D scans or models for rendering</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".obj,.fbx,.gltf,.glb,.3ds,.ply"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Box className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports: OBJ, FBX, GLTF, GLB, 3DS, PLY files
                  </p>
                </label>
              </div>
              
              {uploadedFile && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Uploaded file:</p>
                  <p className="text-sm text-muted-foreground">{uploadedFile.name}</p>
                </div>
              )}
              
              <Button className="w-full mt-4" disabled={!uploadedFile}>
                Generate 3D Render
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>3D Viewer</CardTitle>
              <CardDescription>Interactive 3D model preview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Box className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Upload a 3D model to view</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Interactive controls will be available after upload
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Rendering3D