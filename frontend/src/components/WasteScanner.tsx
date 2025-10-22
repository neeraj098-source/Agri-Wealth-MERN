import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { Badge } from './ui/Badge';
import { Camera, Upload, Scan, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface WasteScannerProps {
  user: {
    id?: string;
    email?: string;
    accessToken?: string;
  } | null;
  onScanComplete?: (analysis: any) => void;
}

interface WasteAnalysis {
  wasteType: string;
  qualityScore: number;
  pricePerKg: number;
  estimatedValue: number;
  recommendations: string[];
  timestamp: string;
}

export function WasteScanner({ user, onScanComplete }: WasteScannerProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState<WasteAnalysis | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [wasteType, setWasteType] = useState('');
  const [weight, setWeight] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const wasteTypes = [
    { value: 'rice_husk', label: 'Rice Husk' },
    { value: 'wheat_straw', label: 'Wheat Straw' },
    { value: 'corn_stalks', label: 'Corn Stalks' },
    { value: 'sugarcane_bagasse', label: 'Sugarcane Bagasse' },
    { value: 'cotton_stalks', label: 'Cotton Stalks' },
    { value: 'coconut_coir', label: 'Coconut Coir' },
    { value: 'banana_leaves', label: 'Banana Leaves' },
    { value: 'vegetable_waste', label: 'Vegetable Waste' }
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError('');
    }
  };

  const simulateProgress = () => {
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleScan = async () => {
    if (!selectedFile || !wasteType || !weight) {
      setError('Please provide all required information');
      return;
    }

    if (parseFloat(weight) <= 0) {
      setError('Please enter a valid weight');
      return;
    }

    if (!user?.accessToken) {
      setError('User authentication required');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis(null);
    simulateProgress();

    try {
      // Convert file to base64 for sending to server
      const reader = new FileReader();
      reader.onload = async () => {
        const imageData = reader.result as string;

        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-210c7063/analyze-waste`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
          },
          body: JSON.stringify({
            wasteType,
            imageData,
            weight: parseFloat(weight)
          })
        });

        const result = await response.json();

        if (!response.ok) {
          setError(result.error || 'Analysis failed');
          return;
        }

        setAnalysis(result.analysis);
        onScanComplete?.(result.analysis);
      };

      reader.readAsDataURL(selectedFile);
    } catch (err) {
      setError('Analysis failed. Please try again.');
      console.error('Scan error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getQualityGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 85) return 'A';
    if (score >= 75) return 'B+';
    if (score >= 65) return 'B';
    return 'C';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Waste Quality Scanner</h1>
        <p className="text-gray-600">Upload an image of your agricultural waste to get instant quality analysis and pricing</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scan className="h-5 w-5" />
              Scan Waste
            </CardTitle>
            <CardDescription>
              Upload an image and provide details about your agricultural waste
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Waste Type</Label>
              <Select value={wasteType} onValueChange={setWasteType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select waste type" />
                </SelectTrigger>
                <SelectContent className="z-500">
                  {wasteTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                min="0"
                placeholder="Enter weight in kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Upload Image</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex items-center gap-2"
                >
                  <Camera className="h-4 w-4" />
                  Camera
                </Button>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </div>
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileSelect}
                className="hidden"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {selectedFile && (
              <div className="space-y-2">
                <Label>Selected Image</Label>
                <div className="relative">
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected waste"
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Ready
                  </Badge>
                </div>
              </div>
            )}

            {loading && (
              <div className="space-y-2">
                <Label>Analyzing...</Label>
                <Progress value={scanProgress} className="w-full" />
                <p className="text-sm text-gray-500 text-center">
                  AI is analyzing your waste quality...
                </p>
              </div>
            )}

            <Button
              onClick={handleScan}
              disabled={!selectedFile || !wasteType || !weight || loading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {loading ? 'Analyzing...' : 'Analyze Waste'}
            </Button>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Analysis Results
            </CardTitle>
            <CardDescription>
              Quality assessment and pricing information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {analysis ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${getQualityColor(analysis.qualityScore)}`}>
                    {analysis.qualityScore}%
                  </div>
                  <div className="text-lg font-medium text-gray-600">
                    Quality Grade: {getQualityGrade(analysis.qualityScore)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      ₹{analysis.pricePerKg}
                    </div>
                    <div className="text-sm text-gray-600">Per kg</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      ₹{analysis.estimatedValue.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">Total Value</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Recommendations</Label>
                  <ul className="space-y-1">
                    {analysis.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    This analysis is AI-generated. Final pricing may vary based on market conditions and buyer requirements.
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Scan className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Upload an image and analyze your waste to see results here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}