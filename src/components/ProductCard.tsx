import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/contexts/CartContext";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="glass hover:glass-hover rounded-2xl overflow-hidden transition-all duration-300 border border-glass-border group-hover:border-primary/30">
          {/* Product Image */}
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 glass rounded-full text-white hover:text-primary transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 glass rounded-full text-white hover:text-primary transition-colors"
                aria-label="Quick view"
              >
                <Eye className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Stock Status */}
            {!product.inStock && (
              <Badge className="absolute top-3 left-3 bg-destructive/90">
                Out of Stock
              </Badge>
            )}

            {/* Category Badge */}
            <Badge className="absolute top-3 right-3 bg-gradient-instagram text-white">
              {product.category}
            </Badge>
          </div>

          {/* Product Info */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-2xl font-bold bg-gradient-instagram bg-clip-text text-transparent">
                  ${product.price.toLocaleString()}
                </p>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="bg-gradient-instagram hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                size="sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;