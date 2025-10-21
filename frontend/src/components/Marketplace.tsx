import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, MapPin, Calendar, TrendingUp, Leaf, Factory } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WasteItem {
  _id: string;
  title: string;
  type: string;
  quantity: string;
  price: string;
  location: string;
  farmer: string;
  createdAt: string;
  image: string;
  description: string;
  verified: boolean;
}

interface Company {
  id: string;
  name: string;
  type: string;
  location: string;
  rating: number;
  wasteTypes: string[];
  description: string;
  image: string;
  verified: boolean;
}

const companies: Company[] = [
  {
    id: '1',
    name: 'GreenTech Bioplastics',
    type: 'Bio-plastic Manufacturing',
    location: 'Mumbai, Maharashtra',
    rating: 4.8,
    wasteTypes: ['Rice Waste', 'Wheat Waste', 'Corn Waste'],
    description: 'Leading manufacturer of biodegradable plastics from agricultural waste',
    image: 'https://images.unsplash.com/photo-1744230673231-865d54a0aba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjB0ZWNobm9sb2d5JTIwbW9iaWxlfGVufDF8fHx8MTc1OTI2MDcxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true
  },
  {
    id: '2',
    name: 'BioFuel Solutions',
    type: 'Biofuel Production',
    location: 'Bangalore, Karnataka',
    rating: 4.6,
    wasteTypes: ['Sugarcane Waste', 'Corn Waste', 'Rice Waste'],
    description: 'Converting agricultural waste into clean, renewable biofuels',
    image: 'https://images.unsplash.com/photo-1744230673231-865d54a0aba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjB0ZWNobm9sb2d5JTIwbW9iaWxlfGVufDF8fHx8MTc1OTI2MDcxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true
  },
  {
    id: '3',
    name: 'EcoPlastic India',
    type: 'Eco-friendly Packaging',
    location: 'Delhi, NCR',
    rating: 4.7,
    wasteTypes: ['Wheat Waste', 'Rice Waste'],
    description: 'Sustainable packaging solutions from agricultural residues',
    image: 'https://images.unsplash.com/photo-1744230673231-865d54a0aba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtZXIlMjB0ZWNobm9sb2d5JTIwbW9iaWxlfGVufDF8fHx8MTc1OTI2MDcxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    verified: true
  }
];

export function Marketplace() {
  const [listings, setListings] = useState<WasteItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch( `${import.meta.env.VITE_API_URL}/api/auth/signup`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };
    fetchListings();
  }, []);

  const filteredWaste = listings.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="marketplace" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Agricultural Waste Marketplace</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect farmers with bio-plastic and fuel companies. Turn agricultural waste into valuable resources.
          </p>
        </motion.div>

        <Tabs defaultValue="waste" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="waste" className="flex items-center space-x-2">
              <Leaf className="w-4 h-4" />
              <span>Waste Listings</span>
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center space-x-2">
              <Factory className="w-4 h-4" />
              <span>Companies</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="waste" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search waste types..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Rice Waste">Rice Waste</SelectItem>
                  <SelectItem value="Wheat Waste">Wheat Waste</SelectItem>
                  <SelectItem value="Corn Waste">Corn Waste</SelectItem>
                  <SelectItem value="Sugarcane Waste">Sugarcane Waste</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWaste.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="relative">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      {item.verified && (
                        <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Quantity:</span>
                          <span className="font-medium">{item.quantity}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Price:</span>
                          <span className="font-medium text-green-600">{item.price}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1" />
                          {item.location}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          Posted {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Farmer: {item.farmer}</span>
                          <Button
  size="sm"
  className="bg-green-600 hover:bg-green-700"
  onClick={() => alert(`Contacting seller: ${item.farmer}`)} // Yeh line add karein
>
  Contact Seller
</Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {companies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <ImageWithFallback
                          src={company.image}
                          alt={company.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        {company.verified && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center border-2 border-white">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-semibold mb-1">{company.name}</h3>
                          <p className="text-sm text-muted-foreground">{company.type}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${i < Math.floor(company.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">({company.rating})</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{company.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1" />
                          {company.location}
                        </div>
                        <div className="space-y-2">
                          <span className="text-sm text-muted-foreground">Interested in:</span>
                          <div className="flex flex-wrap gap-1">
                            {company.wasteTypes.map((type) => (
                              <Badge key={type} variant="secondary" className="text-xs">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View Profile
                          </Button>
                          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                            Contact Company
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
