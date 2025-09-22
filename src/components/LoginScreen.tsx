import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Shield, Users, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface LoginScreenProps {
  onLogin: (role: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    otp: ''
  });

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.role) {
      toast.error('Please fill all fields');
      return;
    }
    
    toast.success('OTP sent successfully');
    setStep('otp');
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.otp || formData.otp.length !== 6) {
      toast.error('Please enter valid 6-digit OTP');
      return;
    }

    toast.success('OTP verified successfully, logging in to system');
    setTimeout(() => {
      onLogin(formData.role);
    }, 1500);
  };

  const handleBackToLogin = () => {
    setStep('login');
    setFormData(prev => ({ ...prev, otp: '' }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1568644559664-e4a5735c37ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub3J0aGVhc3QlMjBpbmRpYSUyMGxhbmRzY2FwZSUyMG1vdW50YWluc3xlbnwxfHx8fDE3NTc3OTUwMDV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Northeast India landscape background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Login Form */}
      <Card className="w-full max-w-md mx-4 relative z-10 backdrop-blur-sm bg-white/95">
        <CardHeader className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">
            {step === 'login' ? 'Tourist Safety Portal' : 'OTP Verification'}
          </CardTitle>
          <CardDescription>
            {step === 'login' 
              ? 'Northeast India Tourist Monitoring System'
              : 'Enter the OTP sent to your registered email'
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 'login' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label>Select Department</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="police">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Police Department
                      </div>
                    </SelectItem>
                    <SelectItem value="tourism">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Tourism Department
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Send OTP Button */}
              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={!formData.role}>
                  Send OTP
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              {/* Back Button */}
              <Button 
                type="button" 
                variant="ghost" 
                onClick={handleBackToLogin}
                className="w-full mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>

              {/* OTP Input */}
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  value={formData.otp}
                  onChange={(e) => setFormData(prev => ({ ...prev, otp: e.target.value.replace(/\D/g, '') }))}
                  className="text-center text-2xl tracking-widest"
                  required
                />
                <p className="text-sm text-muted-foreground text-center">
                  OTP sent to {formData.email}
                </p>
              </div>

              {/* Verify Button */}
              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={formData.otp.length !== 6}>
                  Verify OTP
                </Button>
              </div>

              {/* Resend OTP */}
              <Button 
                type="button" 
                variant="link" 
                className="w-full"
                onClick={() => toast.success('OTP resent successfully')}
              >
                Resend OTP
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}