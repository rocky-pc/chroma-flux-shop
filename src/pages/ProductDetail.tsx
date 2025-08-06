import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Heart, Share, ShoppingCart, Minus, Plus, Shield, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const product = products.find((p) => p.id === id);
  
  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Product link has been copied to clipboard.",
      });
    }
  };

  // Mock additional images
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </motion.nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="glass rounded-2xl overflow-hidden border border-glass-border">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`glass rounded-lg overflow-hidden border transition-all duration-200 ${
                    selectedImage === index
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-glass-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Category & Stock */}
            <div className="flex items-center justify-between">
              <Badge className="bg-gradient-instagram text-white">
                {product.category}
              </Badge>
              {product.inStock ? (
                <Badge variant="outline" className="text-green-500 border-green-500">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="outline" className="text-red-500 border-red-500">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Product Name & Price */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-4xl font-bold bg-gradient-instagram bg-clip-text text-transparent">
                ${product.price.toLocaleString()}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <Separator />

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center glass rounded-lg border border-glass-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-gradient-instagram hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 h-12"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" size="lg" className="glass border-glass-border">
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleShare}
                    className="glass border-glass-border"
                  >
                    <Share className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 glass rounded-lg p-4 border border-glass-border">
                <Shield className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium text-sm">Warranty</p>
                  <p className="text-xs text-muted-foreground">2 Year Global</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 glass rounded-lg p-4 border border-glass-border">
                <Truck className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium text-sm">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">Worldwide</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 glass rounded-lg p-4 border border-glass-border">
                <RefreshCw className="w-6 h-6 text-primary" />
                <div>
                  <p className="font-medium text-sm">Returns</p>
                  <p className="text-xs text-muted-foreground">30 Day Policy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass border border-glass-border">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="glass rounded-2xl p-8 border border-glass-border">
                <h3 className="text-2xl font-bold mb-4">Product Description</h3>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p>{product.description}</p>
                  <p>Experience the future with this revolutionary product that combines cutting-edge technology with sleek design. Perfect for professionals and enthusiasts alike.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Advanced technology integration</li>
                    <li>Premium build quality</li>
                    <li>Intuitive user interface</li>
                    <li>Future-proof design</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <div className="glass rounded-2xl p-8 border border-glass-border">
                <h3 className="text-2xl font-bold mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">General</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><span className="font-medium">Category:</span> {product.category}</li>
                      <li><span className="font-medium">Model:</span> {product.name}</li>
                      <li><span className="font-medium">Warranty:</span> 2 Years</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Features</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li><span className="font-medium">Rating:</span> {product.rating}/5</li>
                      <li><span className="font-medium">Reviews:</span> {product.reviews}</li>
                      <li><span className="font-medium">Availability:</span> {product.inStock ? "In Stock" : "Out of Stock"}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="glass rounded-2xl p-8 border border-glass-border">
                <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  {/* Mock reviews */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-glass-border pb-6 last:border-b-0">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className="w-4 h-4 text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="font-medium">Anonymous User</span>
                      </div>
                      <p className="text-muted-foreground">
                        Amazing product! The quality is exceptional and it works exactly as described. 
                        Highly recommended for anyone looking for cutting-edge technology.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  index={index}
                />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;