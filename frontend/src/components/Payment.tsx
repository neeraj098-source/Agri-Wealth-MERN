import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/Badge';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  CreditCard,
  Smartphone,
  Building,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  User,
  Banknote
} from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface PaymentProps {
  user: {
    id?: string;
    email?: string;
    accessToken?: string;
  } | null;
  paymentData?: {
    farmerId: string;
    farmerName: string;
    wasteDetails: any;
    amount: number;
  };
  onPaymentComplete?: (payment: any) => void;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  type: 'wallet' | 'bank' | 'card';
}

export function Payment({ user, paymentData, onPaymentComplete }: PaymentProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [step, setStep] = useState<'details' | 'method' | 'confirm' | 'processing' | 'success'>('details');
  const [amount, setAmount] = useState(paymentData?.amount?.toString() || '');
  const [farmerDetails, setFarmerDetails] = useState({
    farmerId: paymentData?.farmerId || '',
    farmerName: paymentData?.farmerName || '',
    phone: '',
    upiId: ''
  });
  const [paymentResult, setPaymentResult] = useState<any>(null);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'upi',
      name: 'UPI',
      icon: <Smartphone className="h-5 w-5" />,
      type: 'wallet'
    },
    {
      id: 'wallet',
      name: 'Agri-Wallet',
      icon: <CreditCard className="h-5 w-5" />,
      type: 'wallet'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: <Building className="h-5 w-5" />,
      type: 'bank'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="h-5 w-5" />,
      type: 'card'
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod || !amount || !farmerDetails.farmerId) {
      setError('Please fill all required fields');
      return;
    }

    if (!user?.accessToken || !user?.id) {
      setError('User authentication required');
      setStep('method');
      return;
    }

    setLoading(true);
    setError('');
    setStep('processing');

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-210c7063/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.accessToken}`
        },
        body: JSON.stringify({
          farmerId: farmerDetails.farmerId,
          companyId: user.id,
          amount: parseFloat(amount),
          wasteDetails: paymentData?.wasteDetails || {},
          paymentMethod: selectedMethod
        })
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Payment failed');
        setStep('method');
        return;
      }

      setPaymentResult(result.payment);
      setStep('success');
      setSuccess(true);
      onPaymentComplete?.(result.payment);
    } catch (err) {
      setError('Payment failed. Please try again.');
      console.error('Payment error:', err);
      setStep('method');
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { id: 'details', label: 'Details' },
      { id: 'method', label: 'Payment Method' },
      { id: 'confirm', label: 'Confirm' },
      { id: 'processing', label: 'Processing' },
      { id: 'success', label: 'Complete' }
    ];

    const currentIndex = steps.findIndex(s => s.id === step);

    return (
      <div className="flex items-center justify-center mb-6">
        {steps.map((s, index) => (
          <div key={s.id} className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${index <= currentIndex
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-600'
              }
            `}>
              {index < currentIndex ? <CheckCircle className="h-4 w-4" /> : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className={`
                w-12 h-0.5 mx-2
                ${index < currentIndex ? 'bg-green-600' : 'bg-gray-200'}
              `} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Secure Payment</h1>
        <p className="text-gray-600">Pay farmers instantly for their agricultural waste</p>
      </div>

      {renderStepIndicator()}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            {step === 'success' ? 'Payment Successful' : 'Payment Details'}
          </CardTitle>
          <CardDescription>
            {step === 'success'
              ? 'Your payment has been processed successfully'
              : 'Secure payment processing powered by Agri-Wealth'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 'details' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Payment Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmer-id">Farmer ID</Label>
                <Input
                  id="farmer-id"
                  placeholder="Enter farmer ID"
                  value={farmerDetails.farmerId}
                  onChange={(e) => setFarmerDetails({ ...farmerDetails, farmerId: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmer-name">Farmer Name</Label>
                <Input
                  id="farmer-name"
                  placeholder="Enter farmer name"
                  value={farmerDetails.farmerName}
                  onChange={(e) => setFarmerDetails({ ...farmerDetails, farmerName: e.target.value })}
                />
              </div>

              <Button
                onClick={() => setStep('method')}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!amount || !farmerDetails.farmerId || !farmerDetails.farmerName}
              >
                Continue to Payment Method
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}

          {step === 'method' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Payment Method</Label>
                <div className="grid gap-3">
                  {paymentMethods.map((method) => (
                    <Button
                      key={method.id}
                      variant={selectedMethod === method.id ? 'default' : 'outline'}
                      className="flex items-center justify-start gap-3 h-12"
                      onClick={() => setSelectedMethod(method.id)}
                    >
                      {method.icon}
                      {method.name}
                      {method.id === 'upi' && <Badge variant="secondary" className="ml-auto">Recommended</Badge>}
                    </Button>
                  ))}
                </div>
              </div>

              {selectedMethod === 'upi' && (
                <div className="space-y-2">
                  <Label htmlFor="upi-id">Farmer's UPI ID</Label>
                  <Input
                    id="upi-id"
                    placeholder="farmer@upi"
                    value={farmerDetails.upiId}
                    onChange={(e) => setFarmerDetails({ ...farmerDetails, upiId: e.target.value })}
                  />
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('details')} className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={() => setStep('confirm')}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  disabled={!selectedMethod}
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 'confirm' && (
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Avatar>
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{farmerDetails.farmerName}</div>
                    <div className="text-sm text-gray-600">ID: {farmerDetails.farmerId}</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Amount</span>
                    <span className="font-medium">₹{amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <span className="font-medium">
                      {paymentMethods.find(m => m.id === selectedMethod)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span>₹{amount}</span>
                </div>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Your payment is secured with 256-bit SSL encryption. Transaction details will be shared with both parties.
                </AlertDescription>
              </Alert>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('method')} className="flex-1">
                  Back
                </Button>
                <Button onClick={handlePayment} className="flex-1 bg-green-600 hover:bg-green-700" disabled={loading}>
                  {loading ? 'Processing...' : `Pay ₹${amount}`}
                  <Banknote className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-green-600 animate-spin" />
              </div>
              <h3 className="text-lg font-medium mb-2">Processing Payment</h3>
              <p className="text-gray-600 mb-4">Please wait while we process your payment securely...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
            </div>
          )}

          {step === 'success' && paymentResult && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium mb-2">Payment Successful!</h3>
              <p className="text-gray-600 mb-6">Your payment has been sent to the farmer</p>

              <div className="space-y-4 text-left bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span>Transaction ID</span>
                  <span className="font-mono text-sm">{paymentResult.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount</span>
                  <span className="font-medium">₹{paymentResult.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time</span>
                  <span>{new Date(paymentResult.timestamp).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <Badge className="bg-green-500 text-white">Completed</Badge>
                </div>
              </div>

              <Button
                onClick={() => window.location.reload()}
                className="w-full mt-6"
              >
                Make Another Payment
              </Button>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}