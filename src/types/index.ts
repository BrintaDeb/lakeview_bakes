export interface ProductVariant {
  id: string | number;
  title: string;
  price: number;
  available: boolean;
  options?: (string | null)[];
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface Product {
  id: string | number;
  handle: string;
  title: string;
  original_url?: string;
  product_type: string;
  tags?: string[];
  image: string;
  original_cdn_image?: string;
  description: string;
  options: ProductOption[];
  variants: ProductVariant[];
  price_min: number;
  price_max: number;
}

export interface Collection {
  id: number;
  title: string;
  handle: string;
  description: string;
  image?: {
    src: string;
    alt?: string | null;
  };
  products_count?: number;
}

export interface CartItem {
  id: string; // unique item id combining product id and variant id
  productId: string | number;
  variantId: string | number;
  title: string;
  variantTitle: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  eggless?: boolean;
  messageOnCake?: string;
  sundaeDetails?: {
    scoops: string[];
    sauce: string;
    toppings: string[];
    glassType: string;
  };
}

export interface Outlet {
  id: string;
  name: string;
  address: string;
  phone: string;
  google_maps_query: string;
  established_year: number;
  significance?: string;
  timings?: string;
  image?: string;
}

export interface Testimonial {
  reviewer_name: string;
  rating: number;
  review_text: string;
  image: string;
}

export interface BrandValue {
  title: string;
  icon: string;
  original_file: string;
  description?: string;
}

export interface UserAddress {
  id: string;
  label: string; // e.g., "Home", "Office", "Party Venue"
  address: string;
  pincode: string;
  isDefault?: boolean;
}

export interface UserVehicle {
  id: string;
  makeModel: string;
  plateNumber: string;
  color?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email?: string;
  createdAt: number;
  memberSince?: string;
  addresses?: UserAddress[];
  savedVehicles?: UserVehicle[];
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  createdAt: number;
  estimatedDeliveryTime?: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "paid" | "pending" | "failed";
  orderStatus: "Order Received" | "Baking in Progress" | "Quality Packed" | "Out for Delivery" | "Delivered";
  deliveryDate?: string;
  deliveryTimeSlot?: string;
  notes?: string;
  isDriveIn?: boolean;
  vehicleMakeModel?: string;
  vehiclePlateNumber?: string;
  pickupOutletId?: string;
  pickupOutletName?: string;
}
