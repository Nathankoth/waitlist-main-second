import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, CheckCircle2, Share2, Copy, Linkedin, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface WaitlistFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const WaitlistForm = ({ isOpen, onClose }: WaitlistFormProps) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    role: '',
    years_experience: '',
    monthly_listings: '',
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
    
    if (!formData.full_name) {
      newErrors.full_name = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.role) {
      newErrors.role = 'Role is required';
    }
    
    if (!formData.monthly_listings) {
      newErrors.monthly_listings = 'Monthly listings is required';
    }
    
    if (!formData.years_experience) {
      newErrors.years_experience = 'Years of experience is required';
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
      // Submit to API route
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.full_name.trim(),
          email: formData.email.toLowerCase().trim(),
          role: formData.role.trim(),
          years_experience: formData.years_experience.trim(),
          monthly_listings: formData.monthly_listings.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to join waitlist. Please try again.');
      }

      console.log('Waitlist submission successful:', result.data);
      setIsSuccess(true);
      toast({
        title: "You're on the list!",
        description: "We'll email you with early access and launch discounts.",
      });
    } catch (error) {
      console.error('Error joining waitlist:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    const shareUrl = window.location.origin;
    const shareText = "Join me on the VistaForge waitlist - instant property insights from phone photos!";
    
    if (platform === 'twitter') {
      window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard.",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      full_name: '',
      email: '',
      role: '',
      years_experience: '',
      monthly_listings: '',
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
            <DialogTitle className="text-center">Thanks — you're on the list!</DialogTitle>
            <DialogDescription className="text-center">
              We'll email early access + launch discounts. Invite a friend to move up the list!
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-2 mt-4">
            <Button onClick={() => handleShare('twitter')} variant="outline" className="w-full">
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13.3964 11.224L20.2964 4H18.7964L12.7964 10.506L8.19641 4H3.79641L10.9964 13.224L10.9964 20H13.3964V11.224ZM11.7964 9.688L11.2464 9.168L5.04641 5.496H7.44641L12.6964 11.64L13.2464 12.16L18.7964 18.4H16.3964L11.7964 12.432V9.688Z"/>
              </svg>
              Share on X
            </Button>
            <Button onClick={() => handleShare('linkedin')} variant="outline" className="w-full">
              <Linkedin className="mr-2 h-4 w-4" />
              Share on LinkedIn
            </Button>
            <Button onClick={() => handleShare('copy')} variant="outline" className="w-full">
              <Copy className="mr-2 h-4 w-4" />
              Copy Link
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
            Get early access and exclusive launch discounts
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              type="text"
              placeholder="Your full name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className={errors.full_name ? 'border-destructive' : ''}
            />
            {errors.full_name && (
              <p className="text-sm text-destructive">{errors.full_name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
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
              <SelectContent position="item-aligned">
                <SelectItem value="realtor">Realtor / Agent</SelectItem>
                <SelectItem value="homeowner">Homeowner / Homebuyer</SelectItem>
                <SelectItem value="investor">Investor</SelectItem>
                <SelectItem value="lawyer">Lawyer</SelectItem>
                <SelectItem value="surveyor">Surveyor</SelectItem>
                <SelectItem value="architect">Architect</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthly_listings">Monthly Listings *</Label>
            <Select
              value={formData.monthly_listings}
              onValueChange={(value) => setFormData({ ...formData, monthly_listings: value })}
            >
              <SelectTrigger className={errors.monthly_listings ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select approximate number of listings" />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                <SelectItem value="0-5">0 - 5</SelectItem>
                <SelectItem value="5-10">5 - 10</SelectItem>
                <SelectItem value="10-15">10 - 15</SelectItem>
                <SelectItem value="15-20">15 - 20</SelectItem>
                <SelectItem value="20+">20+</SelectItem>
              </SelectContent>
            </Select>
            {errors.monthly_listings && (
              <p className="text-sm text-destructive">{errors.monthly_listings}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="years_experience">Years of Experience *</Label>
            <Select
              value={formData.years_experience}
              onValueChange={(value) => setFormData({ ...formData, years_experience: value })}
            >
              <SelectTrigger className={errors.years_experience ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select years of experience" />
              </SelectTrigger>
              <SelectContent position="item-aligned">
                <SelectItem value="0-5">0 - 5 years</SelectItem>
                <SelectItem value="5-10">5 - 10 years</SelectItem>
                <SelectItem value="10-15">10 - 15 years</SelectItem>
                <SelectItem value="15-20">15 - 20 years</SelectItem>
                <SelectItem value="20+">20+ years</SelectItem>
              </SelectContent>
            </Select>
            {errors.years_experience && (
              <p className="text-sm text-destructive">{errors.years_experience}</p>
            )}
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
