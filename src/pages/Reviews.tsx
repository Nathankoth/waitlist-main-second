import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const Reviews = () => {
  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState(0)

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Excellent platform for real estate analysis. The ROI calculator is incredibly accurate!",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 4,
      comment: "Great 3D rendering capabilities. Helped me visualize my property investments perfectly.",
      date: "2024-01-10"
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 5,
      comment: "The market analysis tools are top-notch. Highly recommend for any real estate investor.",
      date: "2024-01-08"
    }
  ]

  const handleSubmitReview = () => {
    if (newReview.trim() && rating > 0) {
      // In a real app, this would submit to a backend
      console.log("Submitting review:", { rating, comment: newReview })
      setNewReview("")
      setRating(0)
    }
  }

  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-muted-foreground"
        } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
        onClick={interactive ? () => setRating(i + 1) : undefined}
      />
    ))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reviews</h1>
          <p className="text-muted-foreground">What our users say</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{review.name}</CardTitle>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-muted-foreground ml-2">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Leave a Review</CardTitle>
              <CardDescription>Share your experience with VistaFold</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Rating</label>
                <div className="flex gap-1">
                  {renderStars(rating, true)}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Your Review</label>
                <Textarea
                  placeholder="Tell us about your experience..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  rows={4}
                />
              </div>
              
              <Button 
                onClick={handleSubmitReview}
                disabled={!newReview.trim() || rating === 0}
                className="w-full"
              >
                Submit Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Reviews