import { Product } from "@/contexts/CartContext";
import hololensPro from "@/assets/hololens-pro.jpg";
import quantumPhone from "@/assets/quantum-phone.jpg";
import neuralInterface from "@/assets/neural-interface.jpg";
import plasmaDisplay from "@/assets/plasma-display.jpg";
import wirelessPower from "@/assets/wireless-power.jpg";
import aiCube from "@/assets/ai-cube.jpg";

export const products: Product[] = [
  {
    id: "1",
    name: "HoloLens Pro X",
    price: 2499.99,
    image: hololensPro,
    description: "Next-generation mixed reality headset with ultra-high resolution displays and advanced hand tracking.",
    category: "VR/AR",
    rating: 4.8,
    reviews: 156,
    inStock: true,
  },
  {
    id: "2",
    name: "QuantumPhone Elite",
    price: 1299.99,
    image: quantumPhone,
    description: "Revolutionary smartphone with quantum encryption and holographic display technology.",
    category: "Smartphones",
    rating: 4.9,
    reviews: 342,
    inStock: true,
  },
  {
    id: "3",
    name: "Neural Interface Controller",
    price: 899.99,
    image: neuralInterface,
    description: "Direct neural input device for seamless brain-computer interaction and control.",
    category: "Controllers",
    rating: 4.7,
    reviews: 89,
    inStock: true,
  },
  {
    id: "4",
    name: "Plasma Display 8K",
    price: 3999.99,
    image: plasmaDisplay,
    description: "Ultra-thin plasma display with perfect blacks and infinite contrast ratio in stunning 8K resolution.",
    category: "Displays",
    rating: 4.9,
    reviews: 203,
    inStock: false,
  },
  {
    id: "5",
    name: "Wireless Power Sphere",
    price: 199.99,
    image: wirelessPower,
    description: "Revolutionary wireless charging device that powers multiple devices within a 10-foot radius.",
    category: "Accessories",
    rating: 4.6,
    reviews: 78,
    inStock: true,
  },
  {
    id: "6",
    name: "AI Assistant Cube",
    price: 599.99,
    image: aiCube,
    description: "Advanced AI companion with emotional intelligence and holographic projection capabilities.",
    category: "AI",
    rating: 4.8,
    reviews: 167,
    inStock: true,
  },
  {
    id: "7",
    name: "Gravity Boots",
    price: 1599.99,
    image: hololensPro, // Reusing image for demo
    description: "Anti-gravity footwear with magnetic levitation technology for enhanced mobility.",
    category: "Wearables",
    rating: 4.5,
    reviews: 45,
    inStock: true,
  },
  {
    id: "8",
    name: "Holographic Keyboard",
    price: 299.99,
    image: quantumPhone, // Reusing image for demo
    description: "Projected holographic keyboard with haptic feedback and gesture recognition.",
    category: "Input Devices",
    rating: 4.4,
    reviews: 112,
    inStock: true,
  },
  {
    id: "9",
    name: "Time Distortion Watch",
    price: 4999.99,
    image: neuralInterface, // Reusing image for demo
    description: "Luxury timepiece with temporal manipulation features and quantum time synchronization.",
    category: "Luxury",
    rating: 5.0,
    reviews: 23,
    inStock: false,
  },
  {
    id: "10",
    name: "Molecular Printer 3D",
    price: 7999.99,
    image: plasmaDisplay, // Reusing image for demo
    description: "Atomic-level 3D printer capable of creating objects at the molecular scale.",
    category: "Manufacturing",
    rating: 4.9,
    reviews: 67,
    inStock: true,
  },
  {
    id: "11",
    name: "Energy Shield Generator",
    price: 2199.99,
    image: wirelessPower, // Reusing image for demo
    description: "Personal force field generator providing protection from electromagnetic interference.",
    category: "Security",
    rating: 4.7,
    reviews: 91,
    inStock: true,
  },
  {
    id: "12",
    name: "Biometric Scanner Pro",
    price: 799.99,
    image: aiCube, // Reusing image for demo
    description: "Advanced biometric authentication device with DNA analysis and retinal scanning.",
    category: "Security",
    rating: 4.8,
    reviews: 134,
    inStock: true,
  }
];

export const categories = [
  "All",
  "VR/AR",
  "Smartphones",
  "Controllers",
  "Displays",
  "Accessories",
  "AI",
  "Wearables",
  "Input Devices",
  "Luxury",
  "Manufacturing",
  "Security"
];

export const featuredProducts = products.slice(0, 6);