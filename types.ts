export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string; // e.g., "25-40 דק'"
  deliveryFee: number;
  minOrder: number;
  tags: string[];
  image: string;
  categories: MenuCategory[];
  isClosed?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
  restaurantId: string;
}

export interface UserAddress {
  street: string;
  city: string;
  floor?: string;
  apt?: string;
}
