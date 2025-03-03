
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { ShoppingCart, IndianRupee, ArrowLeft, Star, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define product types
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity?: number;
  isPopular?: boolean;
  nutrition?: {
    calories: string;
    fat: string;
    protein: string;
    carbs: string;
    calcium: string;
  };
  ingredients?: string[];
  benefits?: string[];
  reviews?: {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
};

// Sample product data - same as in Products.tsx
const allProducts: Product[] = [
  {
    id: 1,
    name: "Whole Milk",
    description: "Creamy and rich whole milk from grass-fed cows. Our whole milk is pasteurized to ensure safety while preserving the rich, natural flavor that makes it perfect for drinking, cooking, or adding to your favorite cereals and beverages.",
    price: 299,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
    category: "regular",
    isPopular: true,
    nutrition: {
      calories: "150 kcal per cup",
      fat: "8g",
      protein: "8g",
      carbs: "12g",
      calcium: "30% DV"
    },
    ingredients: ["Whole Milk", "Vitamin D"],
    benefits: [
      "Rich source of calcium for strong bones",
      "Contains vitamin D for calcium absorption",
      "Provides complete protein with all essential amino acids",
      "Contains vitamin A for eye health"
    ],
    reviews: [
      {
        id: 1,
        user: "Priya S.",
        rating: 5,
        comment: "Absolutely delicious milk! You can really taste the difference from store brands.",
        date: "2023-12-15"
      },
      {
        id: 2,
        user: "Rohit M.",
        rating: 4,
        comment: "Great quality, my kids love it. Would recommend!",
        date: "2023-11-22"
      }
    ]
  },
  {
    id: 2,
    name: "Low-Fat Milk",
    description: "Low-fat milk with all the nutrition and less fat. Perfect for those who want the nutritional benefits of milk with reduced fat content. Great for everyday use in coffee, tea, cereal, or just to drink on its own.",
    price: 259,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
    category: "regular",
    nutrition: {
      calories: "102 kcal per cup",
      fat: "2.4g",
      protein: "8.2g",
      carbs: "12.2g",
      calcium: "30% DV"
    },
    ingredients: ["Low-Fat Milk", "Vitamin A", "Vitamin D"],
    benefits: [
      "Lower in calories than whole milk",
      "Contains the same calcium and protein as whole milk",
      "Fortified with vitamins A and D",
      "Good option for weight management"
    ],
    reviews: [
      {
        id: 1,
        user: "Amit K.",
        rating: 5,
        comment: "Perfect balance of flavor and nutrition without the extra fat.",
        date: "2024-01-05"
      },
      {
        id: 2,
        user: "Sunita R.",
        rating: 4,
        comment: "Great for my morning coffee and cereal. Will buy again!",
        date: "2023-12-10"
      }
    ]
  },
  {
    id: 3,
    name: "Organic Milk",
    description: "Certified organic milk from free-range, grass-fed cows. Our organic milk comes from cows raised on certified organic farms where they graze on pesticide-free pastures and are never treated with antibiotics or growth hormones.",
    price: 450,
    image: "public/lovable-uploads/efa98d8f-6eb0-4b3b-9f48-623c7aaca7f2.png",
    category: "organic",
    isPopular: true,
    nutrition: {
      calories: "150 kcal per cup",
      fat: "8g",
      protein: "8g",
      carbs: "12g",
      calcium: "30% DV"
    },
    ingredients: ["Organic Whole Milk", "Vitamin D"],
    benefits: [
      "No artificial hormones or antibiotics",
      "Produced using sustainable farming practices",
      "May contain higher levels of beneficial omega-3 fatty acids",
      "Supports ecological balance and biodiversity"
    ],
    reviews: [
      {
        id: 1,
        user: "Neha T.",
        rating: 5,
        comment: "You can taste the difference in organic milk. Worth every rupee!",
        date: "2024-02-18"
      },
      {
        id: 2,
        user: "Vikram S.",
        rating: 5,
        comment: "Our family has switched to this organic milk and we'll never go back.",
        date: "2024-01-30"
      }
    ]
  },
  {
    id: 4,
    name: "Almond Milk",
    description: "Plant-based milk alternative made from almonds. Our almond milk is smooth, creamy, and perfect for those looking for a dairy-free alternative. It's lightly sweetened with a hint of vanilla.",
    price: 375,
    image: "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
    category: "plant-based",
    nutrition: {
      calories: "60 kcal per cup",
      fat: "2.5g",
      protein: "1g",
      carbs: "8g",
      calcium: "45% DV"
    },
    ingredients: ["Filtered Water", "Almonds", "Calcium Carbonate", "Sea Salt", "Natural Flavor", "Vitamin D2", "Vitamin E"],
    benefits: [
      "Lactose-free and dairy-free",
      "Lower in calories than dairy milk",
      "Fortified with calcium and vitamin D",
      "Good source of vitamin E, an antioxidant"
    ],
    reviews: [
      {
        id: 1,
        user: "Ananya P.",
        rating: 4,
        comment: "Great alternative to dairy, nice texture and not too sweet.",
        date: "2024-02-05"
      },
      {
        id: 2,
        user: "Karan M.",
        rating: 5,
        comment: "Perfect for my morning smoothies and coffee!",
        date: "2024-01-12"
      }
    ]
  },
  {
    id: 5,
    name: "Oat Milk",
    description: "Creamy plant-based milk alternative made from oats. Our oat milk has a naturally sweet flavor and creamy texture that works wonderfully in coffee, tea, cereal, or on its own.",
    price: 340,
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
    category: "plant-based",
    nutrition: {
      calories: "120 kcal per cup",
      fat: "5g",
      protein: "3g",
      carbs: "16g",
      calcium: "35% DV"
    },
    ingredients: ["Filtered Water", "Oats", "Sunflower Oil", "Calcium Carbonate", "Sea Salt", "Vitamin D2", "Vitamin B12"],
    benefits: [
      "Naturally free of dairy, lactose, soy, and nuts",
      "Contains beta-glucans that may help lower cholesterol",
      "Environmentally friendly production compared to dairy and almond milk",
      "Creamy texture that works well in coffee"
    ],
    reviews: [
      {
        id: 1,
        user: "Rahul S.",
        rating: 5,
        comment: "The best plant milk for coffee! Creates a perfect foam and doesn't separate.",
        date: "2024-01-25"
      },
      {
        id: 2,
        user: "Deepika N.",
        rating: 4,
        comment: "Great taste and texture, my whole family enjoys it.",
        date: "2023-12-30"
      }
    ]
  },
  {
    id: 6,
    name: "Chocolate Milk",
    description: "Delicious chocolate-flavored milk, perfect for a treat. Made with real cocoa and just the right amount of sweetness, our chocolate milk is a delightful indulgence that both kids and adults will love.",
    price: 320,
    image: "https://images.unsplash.com/photo-1554654402-bb7e384beef5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
    category: "flavored",
    nutrition: {
      calories: "180 kcal per cup",
      fat: "8g",
      protein: "8g",
      carbs: "24g",
      calcium: "30% DV"
    },
    ingredients: ["Whole Milk", "Sugar", "Cocoa Powder", "Vitamin D", "Natural Flavor"],
    benefits: [
      "Great source of protein for muscle recovery after exercise",
      "Provides calcium and vitamin D for bone health",
      "Contains antioxidants from cocoa",
      "Perfect balance of carbs and protein for post-workout recovery"
    ],
    reviews: [
      {
        id: 1,
        user: "Arjun K.",
        rating: 5,
        comment: "My kids absolutely love this! Not too sweet and great chocolate flavor.",
        date: "2024-02-10"
      },
      {
        id: 2,
        user: "Meera L.",
        rating: 4,
        comment: "Perfect treat that still provides good nutrition. Tastes like a dessert!",
        date: "2024-01-15"
      }
    ]
  },
  {
    id: 7,
    name: "A2 Milk",
    description: "Premium A2 protein milk for better digestion. Our A2 milk comes from specially selected cows that naturally produce only the A2 protein, which may be easier to digest for people who experience discomfort with regular milk.",
    price: 599,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
    category: "regular",
    isPopular: true,
    nutrition: {
      calories: "150 kcal per cup",
      fat: "8g",
      protein: "8g",
      carbs: "12g",
      calcium: "30% DV"
    },
    ingredients: ["A2 Whole Milk", "Vitamin D"],
    benefits: [
      "May be easier to digest for some people who experience discomfort with regular milk",
      "Contains all the same nutrients as regular milk",
      "Full, rich flavor of whole milk",
      "From cows that naturally produce only the A2 beta-casein protein"
    ],
    reviews: [
      {
        id: 1,
        user: "Nandini R.",
        rating: 5,
        comment: "I couldn't drink milk before discovering A2! Now I can enjoy it without discomfort.",
        date: "2024-02-20"
      },
      {
        id: 2,
        user: "Sanjay P.",
        rating: 4,
        comment: "Excellent product. Tastes great and feels easier on my stomach.",
        date: "2024-01-08"
      }
    ]
  },
  {
    id: 8,
    name: "Fresh Paneer",
    description: "Homemade soft and tender paneer made from whole milk. Our fresh paneer is made daily using traditional methods, resulting in a soft, non-crumbly texture perfect for all your favorite paneer dishes.",
    price: 399,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
    category: "dairy-products",
    nutrition: {
      calories: "365 kcal per 100g",
      fat: "28g",
      protein: "25g",
      carbs: "3.4g",
      calcium: "40% DV"
    },
    ingredients: ["Whole Milk", "Food Grade Citric Acid"],
    benefits: [
      "Excellent source of protein",
      "Rich in calcium for bone health",
      "Low in carbohydrates",
      "Versatile ingredient for many dishes"
    ],
    reviews: [
      {
        id: 1,
        user: "Lakshmi T.",
        rating: 5,
        comment: "Such fresh, soft paneer! Makes the best palak paneer.",
        date: "2024-02-15"
      },
      {
        id: 2,
        user: "Raj M.",
        rating: 5,
        comment: "The quality is outstanding. Doesn't crumble and has perfect texture.",
        date: "2024-01-22"
      }
    ]
  },
  {
    id: 9,
    name: "Natural Yogurt",
    description: "Probiotic-rich yogurt made with fresh milk. Our natural yogurt is thick, creamy, and made with live cultures for a tangy flavor and all the probiotic benefits.",
    price: 220,
    image: "https://images.unsplash.com/photo-1570696516188-ade861b84a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80",
    category: "dairy-products",
    nutrition: {
      calories: "150 kcal per cup",
      fat: "8g",
      protein: "8.5g",
      carbs: "11.4g",
      calcium: "30% DV"
    },
    ingredients: ["Whole Milk", "Live Active Cultures (S. Thermophilus, L. Bulgaricus, L. Acidophilus)"],
    benefits: [
      "Contains probiotics for gut health",
      "Good source of protein and calcium",
      "Helps support digestive health",
      "Versatile ingredient for both sweet and savory dishes"
    ],
    reviews: [
      {
        id: 1,
        user: "Aditi S.",
        rating: 4,
        comment: "Perfect consistency and tanginess. Great for making raita!",
        date: "2024-02-08"
      },
      {
        id: 2,
        user: "Vivek R.",
        rating: 5,
        comment: "The best yogurt I've found locally. Rich and creamy with great flavor.",
        date: "2024-01-17"
      }
    ]
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Format price in INR
  const formatPrice = (price: number) => {
    return (
      <div className="flex items-center">
        <IndianRupee className="h-3.5 w-3.5 mr-1" />
        <span>{price.toFixed(2)}</span>
      </div>
    );
  };

  useEffect(() => {
    // Find the product based on the ID from the URL
    const productId = parseInt(id || "0");
    const foundProduct = allProducts.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // If product not found, redirect to products page
      navigate("/products");
      toast("Product not found", { description: "The requested product could not be found." });
    }
  }, [id, navigate]);

  const addToCart = () => {
    if (product) {
      toast("Added to cart", {
        description: `${quantity} ${quantity > 1 ? "units" : "unit"} of ${product.name} added to your cart.`
      });
    }
  };

  if (!product) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <p>Loading product details...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/products")} 
          className="mb-6 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="h-full w-full object-cover"
              />
            </div>
            {product.isPopular && (
              <Badge className="absolute top-4 left-4" variant="secondary">
                Popular
              </Badge>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="mt-2 flex items-center">
                <div className="text-xl font-semibold text-startwell-purple">
                  {formatPrice(product.price)}
                </div>
                <Badge variant="outline" className="ml-4">
                  {product.category.replace('-', ' ')}
                </Badge>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-5 w-5 ${star <= 4.5 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                4.5 (Based on {product.reviews?.length || 0} reviews)
              </span>
            </div>

            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-800">Quality Guaranteed</span>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
              <Button className="flex-1" onClick={addToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>

            <Separator />

            <Tabs defaultValue="nutrition">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
              </TabsList>
              <TabsContent value="nutrition" className="space-y-4 mt-4">
                <h3 className="font-medium">Nutrition Information</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.nutrition && Object.entries(product.nutrition).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-3 rounded">
                      <p className="text-sm text-gray-500 capitalize">{key}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="ingredients" className="mt-4">
                <h3 className="font-medium mb-3">Ingredients</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {product.ingredients?.map((ingredient, index) => (
                    <li key={index} className="text-gray-700">{ingredient}</li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="benefits" className="mt-4">
                <h3 className="font-medium mb-3">Health Benefits</h3>
                <ul className="space-y-2">
                  {product.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-startwell-lavender flex items-center justify-center mt-0.5 mr-2">
                        <span className="text-xs text-startwell-purple font-medium">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-medium">{review.user}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-4 w-4 ${star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProducts
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Card key={relatedProduct.id} className="overflow-hidden h-full flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <h3 className="font-medium mb-1">{relatedProduct.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{formatPrice(relatedProduct.price)}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-auto"
                      onClick={() => navigate(`/products/${relatedProduct.id}`)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
