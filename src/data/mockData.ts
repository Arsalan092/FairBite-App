import { Restaurant, SubscriptionPlan, Order } from '../types';

export const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    name: 'The Mughal Suite',
    cuisine: 'North Indian, Mughlai, Kebabs',
    rating: 4.8,
    reviewCount: 342,
    deliveryTime: '35-40 min',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800',
    distance: '2.4 km',
    subscription: 'Growth',
    location: 'Bistupur, Jamshedpur',
    address: 'Plot 42, Main Road, Near Jubilee Park, Bistupur, Jamshedpur',
    phone: '+91 98351 22890',
    featured: true,
    isOpen: true,
    monthlyRevenue: 184500,
    commissionSaved: 46125,
    joinedDate: '2023-04-12',
    menu: [
      {
        id: 'm1',
        name: 'Awadhi Mutton Dum Biryani',
        price: 420,
        description: 'Slow-cooked fragrant aged basmati rice layered with tender mutton shank, saffron milk, and royal potli spices in sealed handi.',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a6f8?auto=format&fit=crop&q=80&w=600',
        category: 'Main Course',
        veg: false,
        available: true,
        popular: true
      },
      {
        id: 'm2',
        name: 'Paneer Lababdar Handi',
        price: 340,
        description: 'Soft cottage cheese cubes simmered in rich charred tomato, melon seed, and crushed cardamom gravy finished with butter.',
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=600',
        category: 'Main Course',
        veg: true,
        available: true,
        popular: true
      },
      {
        id: 'm3',
        name: 'Galouti Kebab with Ulta Tawa Paratha',
        price: 380,
        description: 'Finely minced lamb kebabs infused with 160 secret aromatic spices, smoked on brass tawa and served with saffron paratha.',
        image: 'https://images.unsplash.com/photo-1601050638917-3d92296d07e9?auto=format&fit=crop&q=80&w=600',
        category: 'Starters',
        veg: false,
        available: true,
        popular: true
      },
      {
        id: 'm4',
        name: 'Murgh Malai Tikka',
        price: 360,
        description: 'Boneless chicken chunks marinated in hung curd, cashew paste, green cardamom and chargrilled in clay tandoor.',
        image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&q=80&w=600',
        category: 'Starters',
        veg: false,
        available: true
      },
      {
        id: 'm5',
        name: 'Garlic Butter Naan',
        price: 65,
        description: 'Classic leavened flatbread topped with minced garlic, fresh coriander leaves and melted butter.',
        image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=600',
        category: 'Breads',
        veg: true,
        available: true
      },
      {
        id: 'm6',
        name: 'Shahi Tukda with Rabri',
        price: 180,
        description: 'Crisp ghee-fried brioche steeped in saffron syrup, smothered with slow-reduced thick rabri and slivered pistachios.',
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600',
        category: 'Desserts',
        veg: true,
        available: true
      }
    ]
  },
  {
    id: 'r2',
    name: 'Dosa Coffee & Co.',
    cuisine: 'South Indian, Chettinad, Filter Coffee',
    rating: 4.6,
    reviewCount: 489,
    deliveryTime: '20-25 min',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800',
    distance: '1.1 km',
    subscription: 'Premium',
    location: 'Sakchi, Jamshedpur',
    address: 'Shop 14, Boulevard Complex, Sakchi Market, Jamshedpur',
    phone: '+91 94311 09452',
    featured: true,
    isOpen: true,
    monthlyRevenue: 240000,
    commissionSaved: 60000,
    joinedDate: '2023-01-19',
    menu: [
      {
        id: 'm7',
        name: 'Ghee Podi Masala Dosa',
        price: 180,
        description: 'Paper-thin crispy fermented rice crepe generously smeared with aromatic gun-powder spice blend, pure desi ghee and spiced potato mash.',
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&q=80&w=600',
        category: 'Main Course',
        veg: true,
        available: true,
        popular: true
      },
      {
        id: 'm8',
        name: 'Medu Vada Platter (3 pcs)',
        price: 120,
        description: 'Golden fried crispy black gram fritters served piping hot with fresh coconut chutney, tomato rasam and shallot sambar.',
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=600',
        category: 'Starters',
        veg: true,
        available: true
      },
      {
        id: 'm9',
        name: 'Mysore Onion Rava Dosa',
        price: 210,
        description: 'Semolina and rice flour crepe laced with caramelized onions, curry leaves, crushed black pepper and red spicy garlic chutney.',
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=600',
        category: 'Main Course',
        veg: true,
        available: true
      },
      {
        id: 'm10',
        name: 'Special Degree Filter Coffee',
        price: 75,
        description: 'Authentic South Indian chicory and Arabica decoction frothed with boiling farm milk in brass dabarah and tumbler.',
        image: 'https://images.unsplash.com/photo-1594132220612-d46933bc95d4?auto=format&fit=crop&q=80&w=600',
        category: 'Beverages',
        veg: true,
        available: true,
        popular: true
      }
    ]
  },
  {
    id: 'r3',
    name: 'Chopsticks & Co.',
    cuisine: 'Pan-Asian, Chinese, Dim Sums',
    rating: 4.5,
    reviewCount: 218,
    deliveryTime: '30-35 min',
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800',
    distance: '3.8 km',
    subscription: 'Starter',
    location: 'Sonari, Jamshedpur',
    address: 'Kagalnagar Square, Sonari West, Jamshedpur',
    phone: '+91 97714 83201',
    featured: false,
    isOpen: true,
    monthlyRevenue: 98000,
    commissionSaved: 24500,
    joinedDate: '2023-08-05',
    menu: [
      {
        id: 'm11',
        name: 'Chicken Manchurian Dry',
        price: 290,
        description: 'Tender chicken bites tossed in scallions, garlic, dark soy glaze, and fresh bird eye chili.',
        image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=600',
        category: 'Starters',
        veg: false,
        available: true,
        popular: true
      },
      {
        id: 'm12',
        name: 'Steamed Crystal Veg Dim Sums',
        price: 240,
        description: 'Translucent parcels filled with water chestnut, wild mushroom, and bamboo shoots served with spicy dip.',
        image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&q=80&w=600',
        category: 'Starters',
        veg: true,
        available: true
      },
      {
        id: 'm13',
        name: 'Hakka Chili Garlic Noodles',
        price: 260,
        description: 'Wok-tossed handmade wheat noodles with crunchy bell peppers, cabbage, toasted chili and crispy garlic.',
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600',
        category: 'Main Course',
        veg: true,
        available: true,
        popular: true
      }
    ]
  },
  {
    id: 'r4',
    name: 'Artisan Crust Pizza Lab',
    cuisine: 'Italian, Wood-Fired Pizza, Pasta',
    rating: 4.7,
    reviewCount: 195,
    deliveryTime: '25-30 min',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    distance: '2.9 km',
    subscription: 'Growth',
    location: 'Circuit House Area, Jamshedpur',
    address: 'Road No 3, Near Keenan Stadium, Circuit House, Jamshedpur',
    phone: '+91 93041 55678',
    featured: true,
    isOpen: true,
    monthlyRevenue: 154000,
    commissionSaved: 38500,
    joinedDate: '2023-06-14',
    menu: [
      {
        id: 'm14',
        name: 'San Marzano Margherita Pizza (11")',
        price: 360,
        description: '48-hour fermented sourdough crust topped with DOP San Marzano tomatoes, fresh buffalo mozzarella and fresh basil leaves.',
        image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80&w=600',
        category: 'Main Course',
        veg: true,
        available: true,
        popular: true
      },
      {
        id: 'm15',
        name: 'Smoked Pepperoni & Hot Honey',
        price: 490,
        description: 'Crisp cupped pepperoni slices, aged parmesan, chili flakes, and a drizzle of organic wildflower hot honey.',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600',
        category: 'Main Course',
        veg: false,
        available: true
      },
      {
        id: 'm16',
        name: 'Tiramisu Tradizionale',
        price: 220,
        description: 'Espresso-soaked savoiardi ladyfingers layered with velvety mascarpone zabaglione and dusted with Belgian cocoa.',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=600',
        category: 'Desserts',
        veg: true,
        available: true
      }
    ]
  }
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 999,
    annualPrice: 799,
    description: 'Perfect for small cafes and cloud kitchens getting started with direct delivery.',
    ordersCap: 'Up to 150 orders / month',
    features: [
      'Zero commission per order (0%)',
      'Direct customer ordering link',
      'Real-time Kitchen POS dashboard',
      'Standard customer & rider alerts',
      'Weekly automated payouts',
      'Email & WhatsApp support'
    ]
  },
  {
    id: 'growth',
    name: 'Growth',
    monthlyPrice: 2499,
    annualPrice: 1999,
    description: 'Designed for high-volume restaurants wanting unlimited orders and prime visibility.',
    ordersCap: 'Unlimited orders & revenue',
    recommended: true,
    badge: 'Most Popular for Kitchens',
    features: [
      'Everything in Starter with 0% commission',
      'Unlimited monthly order volume',
      'Featured placement in Jamshedpur discovery',
      'Live Fleet dispatch & rider assignment',
      'Menu item surge & live inventory manager',
      'Comprehensive revenue & customer analytics',
      '24/7 Priority restaurant manager support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Enterprise',
    monthlyPrice: 4999,
    annualPrice: 3999,
    description: 'Tailored for multi-outlet chains, gourmet brands, and fine-dining establishments.',
    ordersCap: 'Unlimited + Multi-branch sync',
    features: [
      'All Growth plan capabilities',
      'Multi-outlet synchronized inventory & POS',
      'Custom loyalty points & branded promotional coupons',
      'Dedicated Account Director in Jamshedpur',
      'Custom ERP & billing POS API integrations',
      'VIP front-page banner carousel inclusion',
      'Instant same-day settlement payouts'
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'FB-9921',
    restaurantId: 'r1',
    restaurantName: 'The Mughal Suite',
    restaurantImage: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800',
    items: [
      {
        id: 'm1',
        name: 'Awadhi Mutton Dum Biryani',
        price: 420,
        description: '',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a6f8?auto=format&fit=crop&q=80&w=400',
        category: 'Main Course',
        veg: false,
        quantity: 2
      },
      {
        id: 'm5',
        name: 'Garlic Butter Naan',
        price: 65,
        description: '',
        image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&q=80&w=400',
        category: 'Breads',
        veg: true,
        quantity: 2
      }
    ],
    subtotal: 970,
    deliveryFee: 25,
    taxes: 49,
    platformMarkupSaved: 243, // 25% traditional aggregator markup saved
    total: 1044,
    status: 'delivered',
    date: '2026-08-24',
    time: '8:15 PM',
    address: '12-A, South Park, Bistupur, Jamshedpur',
    customerName: 'Arjun Sharma',
    customerPhone: '+91 98765 43210',
    driverName: 'Ravi Shankar',
    driverPhone: '+91 94311 88762',
    estimatedTime: 'Delivered in 32 min'
  },
  {
    id: 'FB-1042',
    restaurantId: 'r1',
    restaurantName: 'The Mughal Suite',
    restaurantImage: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800',
    items: [
      {
        id: 'm3',
        name: 'Galouti Kebab with Ulta Tawa Paratha',
        price: 380,
        description: '',
        image: 'https://images.unsplash.com/photo-1601050638917-3d92296d07e9?auto=format&fit=crop&q=80&w=400',
        category: 'Starters',
        veg: false,
        quantity: 1
      },
      {
        id: 'm2',
        name: 'Paneer Lababdar Handi',
        price: 340,
        description: '',
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400',
        category: 'Main Course',
        veg: true,
        quantity: 1
      }
    ],
    subtotal: 720,
    deliveryFee: 25,
    taxes: 36,
    platformMarkupSaved: 180,
    total: 781,
    status: 'placed',
    date: '2026-08-25',
    time: 'Just now (8:54 PM)',
    address: 'Bungalow 4, Inner Circle Road, Bistupur',
    customerName: 'Pooja Agarwal',
    customerPhone: '+91 91234 56789',
    estimatedTime: '25-30 min'
  },
  {
    id: 'FB-0988',
    restaurantId: 'r1',
    restaurantName: 'The Mughal Suite',
    restaurantImage: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800',
    items: [
      {
        id: 'm1',
        name: 'Awadhi Mutton Dum Biryani',
        price: 420,
        description: '',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a6f8?auto=format&fit=crop&q=80&w=400',
        category: 'Main Course',
        veg: false,
        quantity: 1
      },
      {
        id: 'm6',
        name: 'Shahi Tukda with Rabri',
        price: 180,
        description: '',
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',
        category: 'Desserts',
        veg: true,
        quantity: 1
      }
    ],
    subtotal: 600,
    deliveryFee: 25,
    taxes: 30,
    platformMarkupSaved: 150,
    total: 655,
    status: 'preparing',
    date: '2026-08-25',
    time: '8:48 PM',
    address: 'Flat 302, Ashiana Gardens, Sonari',
    customerName: 'Vikram Sengupta',
    customerPhone: '+91 99341 12345',
    driverName: 'Ravi Shankar',
    driverPhone: '+91 94311 88762',
    estimatedTime: '15-20 min'
  }
];
