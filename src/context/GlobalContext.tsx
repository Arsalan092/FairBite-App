import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Restaurant, CartState, Order, OrderStatus, MenuItem } from '../types';
import { INITIAL_RESTAURANTS, INITIAL_ORDERS } from '../data/mockData';

interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface ConflictModalData {
  isOpen: boolean;
  newRestaurant: Restaurant | null;
  pendingItem: MenuItem | null;
}

interface GlobalContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  switchRole: (role: 'customer' | 'restaurant' | 'admin') => void;
  restaurants: Restaurant[];
  setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
  activeRestaurantId: string;
  setActiveRestaurantId: (id: string) => void;
  selectedRestaurant: Restaurant | undefined;
  cart: CartState;
  addToCart: (restaurant: Restaurant, item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  placeOrder: (notes?: string) => string;
  orders: Order[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deliveryAddress: string;
  setDeliveryAddress: (address: string) => void;
  showTransparencyModal: boolean;
  setShowTransparencyModal: (show: boolean) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  conflictModal: ConflictModalData;
  resolveConflict: (confirmSwitch: boolean) => void;
  toggleItemAvailability: (restaurantId: string, itemId: string) => void;
  toggleRestaurantOpenStatus: (restaurantId: string) => void;
  addNewRestaurant: (newRestaurant: Omit<Restaurant, 'id'>) => void;
  updateSubscription: (restaurantId: string, plan: 'Starter' | 'Growth' | 'Premium') => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>({
    id: 'u1',
    name: 'Arjun Sharma',
    email: 'arjun.sharma@example.com',
    role: 'customer',
    phone: '+91 98765 43210',
    address: '12-A, South Park, Bistupur, Jamshedpur',
    restaurantId: 'r1'
  });

  const [restaurants, setRestaurants] = useState<Restaurant[]>(() => {
    const saved = localStorage.getItem('fairbite_restaurants');
    return saved ? JSON.parse(saved) : INITIAL_RESTAURANTS;
  });

  const [activeRestaurantId, setActiveRestaurantId] = useState<string>('r1');

  const [cart, setCart] = useState<CartState>(() => {
    const saved = localStorage.getItem('fairbite_cart');
    return saved ? JSON.parse(saved) : { restaurant: null, items: [], subtotal: 0 };
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('fairbite_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [deliveryAddress, setDeliveryAddress] = useState<string>('12-A, South Park, Bistupur, Jamshedpur');
  const [showTransparencyModal, setShowTransparencyModal] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [conflictModal, setConflictModal] = useState<ConflictModalData>({
    isOpen: false,
    newRestaurant: null,
    pendingItem: null
  });

  // Local persistence sync
  useEffect(() => {
    localStorage.setItem('fairbite_restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  useEffect(() => {
    localStorage.setItem('fairbite_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fairbite_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const switchRole = (role: 'customer' | 'restaurant' | 'admin') => {
    if (role === 'customer') {
      setUser({
        id: 'u1',
        name: 'Arjun Sharma',
        email: 'arjun.sharma@example.com',
        role: 'customer',
        phone: '+91 98765 43210',
        address: deliveryAddress,
        restaurantId: null
      });
      showToast('Switched to Customer View', 'info');
    } else if (role === 'restaurant') {
      setUser({
        id: 'u2',
        name: 'Chef Kabir (The Mughal Suite)',
        email: 'manager@mughalsuite.com',
        role: 'restaurant',
        phone: '+91 98351 22890',
        address: 'Bistupur, Jamshedpur',
        restaurantId: activeRestaurantId
      });
      showToast('Switched to Restaurant POS Portal', 'info');
    } else {
      setUser({
        id: 'u3',
        name: 'FairBite Admin Director',
        email: 'ops@fairbite.in',
        role: 'admin',
        phone: '+91 80000 12345',
        address: 'Central Operations, Jamshedpur',
        restaurantId: null
      });
      showToast('Switched to Platform Admin', 'info');
    }
  };

  const addToCart = (restaurant: Restaurant, item: MenuItem) => {
    // If cart has items from another restaurant, prompt user
    if (cart.restaurant && cart.restaurant.id !== restaurant.id && cart.items.length > 0) {
      setConflictModal({
        isOpen: true,
        newRestaurant: restaurant,
        pendingItem: item
      });
      return;
    }

    setCart(prev => {
      const existingItem = prev.items.find(i => i.id === item.id);
      let updatedItems;
      if (existingItem) {
        updatedItems = prev.items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updatedItems = [...prev.items, { ...item, quantity: 1 }];
      }
      const subtotal = updatedItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
      return {
        restaurant,
        items: updatedItems,
        subtotal
      };
    });

    showToast(`Added "${item.name}" to cart`);
  };

  const resolveConflict = (confirmSwitch: boolean) => {
    if (confirmSwitch && conflictModal.newRestaurant && conflictModal.pendingItem) {
      setCart({
        restaurant: conflictModal.newRestaurant,
        items: [{ ...conflictModal.pendingItem, quantity: 1 }],
        subtotal: conflictModal.pendingItem.price
      });
      showToast(`Cart reset. Added item from ${conflictModal.newRestaurant.name}`);
    }
    setConflictModal({ isOpen: false, newRestaurant: null, pendingItem: null });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existingItem = prev.items.find(i => i.id === itemId);
      if (!existingItem) return prev;

      let updatedItems;
      if (existingItem.quantity > 1) {
        updatedItems = prev.items.map(i =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        );
      } else {
        updatedItems = prev.items.filter(i => i.id !== itemId);
      }

      const subtotal = updatedItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
      return {
        restaurant: updatedItems.length === 0 ? null : prev.restaurant,
        items: updatedItems,
        subtotal
      };
    });
  };

  const clearCart = () => {
    setCart({ restaurant: null, items: [], subtotal: 0 });
  };

  const placeOrder = (notes?: string): string => {
    if (!cart.restaurant || cart.items.length === 0) return '';

    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `FB-${orderNum}`;
    const deliveryFee = 25;
    const taxes = Math.round(cart.subtotal * 0.05);
    const platformMarkupSaved = Math.round(cart.subtotal * 0.25); // Estimated 25% aggregator markup
    const total = cart.subtotal + deliveryFee + taxes;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      id: orderId,
      restaurantId: cart.restaurant.id,
      restaurantName: cart.restaurant.name,
      restaurantImage: cart.restaurant.image,
      items: [...cart.items],
      subtotal: cart.subtotal,
      deliveryFee,
      taxes,
      platformMarkupSaved,
      total,
      status: 'placed',
      date: now.toISOString().split('T')[0],
      time: `Just now (${timeString})`,
      address: deliveryAddress,
      customerName: user.name,
      customerPhone: user.phone,
      driverName: 'Ravi Shankar',
      driverPhone: '+91 94311 88762',
      estimatedTime: '25-35 min',
      note: notes
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast(`Order #${orderId} placed successfully!`, 'success');
    return orderId;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          return { ...ord, status };
        }
        return ord;
      })
    );
    showToast(`Order #${orderId} updated to ${status.replace('_', ' ')}`, 'info');
  };

  const toggleItemAvailability = (restaurantId: string, itemId: string) => {
    setRestaurants(prev =>
      prev.map(r => {
        if (r.id === restaurantId) {
          return {
            ...r,
            menu: r.menu.map(item =>
              item.id === itemId ? { ...item, available: item.available === false ? true : false } : item
            )
          };
        }
        return r;
      })
    );
    showToast('Menu availability updated', 'info');
  };

  const toggleRestaurantOpenStatus = (restaurantId: string) => {
    setRestaurants(prev =>
      prev.map(r => {
        if (r.id === restaurantId) {
          const next = !r.isOpen;
          showToast(`${r.name} is now ${next ? 'Accepting Orders' : 'Paused / Offline'}`, next ? 'success' : 'warning');
          return { ...r, isOpen: next };
        }
        return r;
      })
    );
  };

  const addNewRestaurant = (newRestData: Omit<Restaurant, 'id'>) => {
    const newId = `r_${Date.now()}`;
    const newRest: Restaurant = {
      ...newRestData,
      id: newId
    };
    setRestaurants(prev => [newRest, ...prev]);
    setActiveRestaurantId(newId);
    showToast(`Partner restaurant "${newRest.name}" added to FairBite!`, 'success');
  };

  const updateSubscription = (restaurantId: string, plan: 'Starter' | 'Growth' | 'Premium') => {
    setRestaurants(prev =>
      prev.map(r => (r.id === restaurantId ? { ...r, subscription: plan } : r))
    );
    showToast(`Subscription updated to ${plan} Plan!`, 'success');
  };

  const selectedRestaurant = restaurants.find(r => r.id === activeRestaurantId) || restaurants[0];

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        switchRole,
        restaurants,
        setRestaurants,
        activeRestaurantId,
        setActiveRestaurantId,
        selectedRestaurant,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        placeOrder,
        orders,
        updateOrderStatus,
        deliveryAddress,
        setDeliveryAddress,
        showTransparencyModal,
        setShowTransparencyModal,
        toasts,
        showToast,
        conflictModal,
        resolveConflict,
        toggleItemAvailability,
        toggleRestaurantOpenStatus,
        addNewRestaurant,
        updateSubscription
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
