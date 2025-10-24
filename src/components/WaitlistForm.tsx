import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, CheckCircle2, Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import copy from '@/content/copy.json';

interface WaitlistFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistForm = ({ isOpen, onClose }: WaitlistFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    role: '',
    company: '',
    monthly_listings: '',
    how_heard: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Call serverless endpoint
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          monthly_listings: formData.monthly_listings ? parseInt(formData.monthly_listings) : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join waitlist');
      }

      setIsSuccess(true);
      toast({
        title: copy.thankYou.title,
        description: copy.thankYou.message,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    const shareUrl = window.location.origin;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "Share link has been copied to clipboard.",
    });
  };

  const resetForm = () => {
    setFormData({
      email: '',
      role: '',
      company: '',
      monthly_listings: '',
      how_heard: '',
    });
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={resetForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-center">{copy.thankYou.title}</DialogTitle>
            <DialogDescription className="text-center">
              {copy.thankYou.message}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-2 mt-4">
            <Button onClick={handleShare} variant="outline" className="w-full">
              <Copy className="mr-2 h-4 w-4" />
              Copy link to share
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join the Waitlist</DialogTitle>
          <DialogDescription>
            {copy.hero.subheadline}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder={copy.hero.emailPlaceholder}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger className={errors.role ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtor">Realtor</SelectItem>
                <SelectItem value="investor">Investor</SelectItem>
                <SelectItem value="architect">Architect</SelectItem>
                <SelectItem value="surveyor">Surveyor</SelectItem>
                <SelectItem value="homebuyer">Homebuyer</SelectItem>
                <SelectItem value="homeowner">Homeowner</SelectItem>
                <SelectItem value="lawyer">Lawyer</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company (optional)</Label>
            <Input
              id="company"
              type="text"
              placeholder="Your company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthly_listings">Monthly Listings (optional)</Label>
            <Input
              id="monthly_listings"
              type="number"
              placeholder="Number of listings per month"
              value={formData.monthly_listings}
              onChange={(e) => setFormData({ ...formData, monthly_listings: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="how_heard">How did you hear about us? (optional)</Label>
            <Input
              id="how_heard"
              type="text"
              placeholder="e.g., Twitter, LinkedIn, referral"
              value={formData.how_heard}
              onChange={(e) => setFormData({ ...formData, how_heard: e.target.value })}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              'Join Waitlist'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistForm;
