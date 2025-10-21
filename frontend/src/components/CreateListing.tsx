import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Leaf } from 'lucide-react';
import { useAuth } from '../utils/supabase/context';

interface FormData {
  title: string;
  type: string;
  quantity: string;
  price: string;
  location: string;
  description: string;
  image: string;
  farmer: string;
}

export function CreateListing() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    type: '',
    quantity: '',
    price: '',
    location: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1532902264729-64c5e6e36c8d',
    farmer: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user?.name) {
      setFormData(prev => ({ ...prev, farmer: user.name }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, type: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch( `${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify({ ...formData, farmer: user?.name || 'Unknown Farmer' }), // Farmer का नाम यहाँ जोड़ें
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create listing');
      }

      const result = await response.json();
      setSuccess('Listing created successfully!');
      console.log("Server response:", result);

      setFormData({
        title: '',
        type: '',
        quantity: '',
        price: '',
        location: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1532902264729-64c5e6e36c8d',
        farmer: user?.name || '',
      });

    } catch (err: any) {
      setError(err.message);
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            Create a New Waste Listing
          </CardTitle>
          <CardDescription>
            Fill out the details below to list your agricultural waste on the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Listing Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Premium Rice Husks" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Waste Type</Label>
              <Select name="type" onValueChange={handleSelectChange} value={formData.type} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select waste type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rice Waste">Rice Waste</SelectItem>
                  <SelectItem value="Wheat Waste">Wheat Waste</SelectItem>
                  <SelectItem value="Corn Waste">Corn Waste</SelectItem>
                  <SelectItem value="Sugarcane Waste">Sugarcane Waste</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="e.g., 500 tons" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" value={formData.price} onChange={handleChange} placeholder="e.g., ₹4,500/ton" required />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Punjab, India" required />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Describe the quality and condition of the waste" required />
            </div>

            <div className="md:col-span-2">
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                {loading ? 'Submitting...' : 'Create Listing'}
              </Button>
            </div>
          </form>

          {error && <Alert variant="destructive" className="mt-4"><AlertDescription>{error}</AlertDescription></Alert>}
          {success && <Alert className="mt-4 border-green-500 text-green-700"><AlertDescription>{success}</AlertDescription></Alert>}
        </CardContent>
      </Card>
    </div>
  );
}
