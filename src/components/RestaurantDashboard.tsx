import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Menu as MenuIcon, 
  Truck, 
  TrendingUp, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ToggleLeft, 
  ToggleRight, 
  Layers, 
  Plus,
  RefreshCw,
  Bell,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';
import { OrderStatus } from '../types';

export const RestaurantDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { 
    restaurants, 
    activeRestaurantId, 
    setActiveRestaurantId, 
    selectedRestaurant, 
    orders, 
    updateOrderStatus, 
    toggleItemAvailability, 
    toggleRestaurantOpenStatus 
  } = useGlobal();

  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'fleet' | 'analytics'>('orders');

  const restaurant = selectedRestaurant || restaurants[0];

  // Filter orders for this restaurant
  const restaurantOrders = orders.filter(o => o.restaurantId === restaurant.id);
  const incomingOrders = restaurantOrders.filter(o => o.status === 'placed');
  const preparingOrders = restaurantOrders.filter(o => o.status === 'accepted' || o.status === 'preparing');
  const outForDeliveryOrders = restaurantOrders.filter(o => o.status === 'out_for_delivery');
  const deliveredOrders = restaurantOrders.filter(o => o.status === 'delivered');

  const totalRevenue = restaurantOrders.reduce((acc, curr) => acc + curr.total, 0);
  const totalCommissionSaved = Math.round(totalRevenue * 0.28); // 28% aggregator commission saved

  return (
    <div className="min-h-screen bg-[#FBF6EE] flex flex-col md:flex-row">
      {/* Desktop & Tablet Sidebar */}
      <aside className="w-full md:w-64 bg-[#3B0A14] text-[#F8F1E4] p-6 flex flex-col justify-between border-r border-[#57182A] shrink-0">
        <div>
          {/* Logo / Branch Tag */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-full bg-[#C9A227] text-[#3B0A14] flex items-center justify-center font-serif font-black text-lg shadow-sm">
              FB
            </div>
            <div>
              <h1 className="font-serif font-black text-xl text-[#F8F1E4] tracking-tight leading-none">
                FAIR<span className="text-[#C9A227]">BITE</span>
              </h1>
              <span className="text-[9px] text-[#C9A227] uppercase font-bold tracking-widest font-mono">
                Kitchen POS Portal
              </span>
            </div>
          </div>

          {/* Restaurant Selector */}
          <div className="mb-6 bg-[#57182A] p-3.5 rounded-2xl border border-[#C9A227]/30">
            <label className="text-[9px] font-black uppercase text-[#C9A227] tracking-widest block mb-1">
              Active Outlet
            </label>
            <select
              value={activeRestaurantId}
              onChange={(e) => setActiveRestaurantId(e.target.value)}
              className="w-full bg-[#3B0A14] text-[#F8F1E4] text-xs font-serif font-bold rounded-xl p-2 border border-[#C9A227]/40 focus:outline-none"
            >
              {restaurants.map(r => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.location})
                </option>
              ))}
            </select>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#C9A227] text-[#3B0A14] shadow-md'
                  : 'text-[#F8F1E4] hover:bg-[#57182A]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package size={16} />
                <span className="uppercase tracking-wider text-[11px]">Live Orders</span>
              </div>
              {incomingOrders.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#3B0A14] text-[#C9A227] text-[10px] flex items-center justify-center font-mono font-black">
                  {incomingOrders.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('menu')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'menu'
                  ? 'bg-[#C9A227] text-[#3B0A14] shadow-md'
                  : 'text-[#F8F1E4] hover:bg-[#57182A]'
              }`}
            >
              <MenuIcon size={16} />
              <span className="uppercase tracking-wider text-[11px]">Menu & In-Stock</span>
            </button>

            <button
              onClick={() => setActiveTab('fleet')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'fleet'
                  ? 'bg-[#C9A227] text-[#3B0A14] shadow-md'
                  : 'text-[#F8F1E4] hover:bg-[#57182A]'
              }`}
            >
              <Truck size={16} />
              <span className="uppercase tracking-wider text-[11px]">Fleet & Dispatch</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-[#C9A227] text-[#3B0A14] shadow-md'
                  : 'text-[#F8F1E4] hover:bg-[#57182A]'
              }`}
            >
              <TrendingUp size={16} />
              <span className="uppercase tracking-wider text-[11px]">Revenue & Savings</span>
            </button>

            <button
              onClick={() => navigate('/business/subscription')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold text-[#C9A227] bg-[#57182A]/70 hover:bg-[#57182A] border border-[#C9A227]/30 transition-all cursor-pointer mt-4"
            >
              <div className="flex items-center gap-2.5">
                <Layers size={16} className="text-[#C9A227]" />
                <span className="uppercase tracking-wider text-[10px]">Plan Tier</span>
              </div>
              <span className="text-[10px] bg-[#C9A227] text-[#3B0A14] px-2.5 py-0.5 rounded-full font-black uppercase">
                {restaurant.subscription}
              </span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="mt-8 pt-6 border-t border-[#57182A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C9A227] text-[#3B0A14] flex items-center justify-center font-serif font-bold text-xs shadow">
              {restaurant.name[0]}
            </div>
            <div className="overflow-hidden">
              <p className="font-serif font-bold text-xs text-[#F8F1E4] truncate">{restaurant.name}</p>
              <p className="text-[9px] text-[#C9A227] font-mono uppercase">0% Commission Partner</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main POS Content */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl overflow-y-auto">
        {/* Top Header & Kitchen Status Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#3B0A14] text-[#C9A227] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-[#C9A227]/30">
                Live Kitchen Console
              </span>
              <span className="text-xs text-[#6B5347] font-semibold font-serif italic">Jamshedpur North Node</span>
            </div>
            <h2 className="font-serif font-black text-2xl sm:text-4xl text-[#3B0A14] mt-1 tracking-tight">
              {restaurant.name}
            </h2>
          </div>

          {/* Kitchen Open/Close Status Toggle */}
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-full border border-[#3B0A14]/15 shadow-sm">
            <div className="text-right">
              <p className="text-[9px] font-black uppercase text-[#6B5347] tracking-widest font-mono">
                Kitchen Status
              </p>
              <p className={`text-xs font-black uppercase font-mono ${restaurant.isOpen ? 'text-[#3B8C5A]' : 'text-red-700'}`}>
                {restaurant.isOpen ? 'ACCEPTING ORDERS' : 'PAUSED / BUSY'}
              </p>
            </div>

            <button
              onClick={() => toggleRestaurantOpenStatus(restaurant.id)}
              className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-colors cursor-pointer ${
                restaurant.isOpen
                  ? 'bg-[#3B8C5A] text-white hover:bg-[#2A6B42]'
                  : 'bg-red-700 text-white hover:bg-red-800'
              }`}
            >
              {restaurant.isOpen ? 'Go Offline' : 'Open Kitchen'}
            </button>
          </div>
        </div>

        {/* Top KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Daily Orders */}
          <div className="bg-white p-6 rounded-3xl border border-[#3B0A14]/15 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-full bg-[#F8F1E4] text-[#3B0A14] flex items-center justify-center border border-[#3B0A14]/10">
                <Package size={18} />
              </div>
              <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded-full bg-[#3B8C5A]/10 text-[#3B8C5A]">
                +14% volume
              </span>
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest text-[#6B5347]">
              Today's Orders
            </p>
            <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#3B0A14] mt-0.5">
              {restaurantOrders.length + 18} orders
            </h3>
          </div>

          {/* Today's Direct Revenue */}
          <div className="bg-white p-6 rounded-3xl border border-[#3B0A14]/15 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-full bg-[#F8F1E4] text-[#3B0A14] flex items-center justify-center border border-[#3B0A14]/10">
                <CreditCard size={18} />
              </div>
              <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded-full bg-[#3B8C5A]/10 text-[#3B8C5A]">
                100% Payout
              </span>
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest text-[#6B5347]">
              Today's Revenue
            </p>
            <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#3B0A14] mt-0.5">
              ₹{(totalRevenue + 12800).toLocaleString()}
            </h3>
          </div>

          {/* Average Order Value */}
          <div className="bg-white p-6 rounded-3xl border border-[#3B0A14]/15 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-full bg-[#F8F1E4] text-[#3B0A14] flex items-center justify-center border border-[#3B0A14]/10">
                <TrendingUp size={18} />
              </div>
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest text-[#6B5347]">
              Average Order Value
            </p>
            <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#3B0A14] mt-0.5">
              ₹580
            </h3>
          </div>

          {/* Commission Saved Banner */}
          <div className="bg-[#3B0A14] text-[#F8F1E4] p-6 rounded-3xl border border-[#C9A227] shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-full bg-white/10 text-[#C9A227] flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-[#3B8C5A] text-white">
                0% Commission
              </span>
            </div>
            <p className="text-[9px] font-black uppercase tracking-widest text-[#C9A227]">
              Aggregator Cut Saved
            </p>
            <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#C9A227] mt-0.5">
              ₹{(totalCommissionSaved + 3580).toLocaleString()}
            </h3>
            <p className="text-[9px] text-[#F8F1E4]/70 mt-1 font-serif italic">Direct profit retained in your pocket</p>
          </div>
        </div>

        {/* TAB 1: Live Kitchen Orders Kanban */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-serif font-black text-xl text-[#3B0A14]">
                  Active Kitchen Orders
                </h3>
                <p className="text-xs text-[#6B5347]">
                  Manage tickets in real-time from placement to rider handover.
                </p>
              </div>

              <span className="text-xs font-bold text-[#6B5347] bg-white px-3 py-1.5 rounded-xl border border-neutral-200">
                Live Auto-Refresh • ON
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Column 1: Incoming Orders */}
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-amber-50 border border-amber-200 p-3 rounded-2xl">
                  <h4 className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    <span>Incoming ({incomingOrders.length})</span>
                  </h4>
                  <span className="text-[10px] font-extrabold text-amber-800">Action Required</span>
                </div>

                {incomingOrders.length === 0 ? (
                  <div className="bg-white rounded-2xl p-6 text-center border border-neutral-200 text-xs text-[#6B5347]">
                    No incoming pending orders right now.
                  </div>
                ) : (
                  incomingOrders.map(order => (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl p-5 border-2 border-amber-300 shadow-md space-y-3 animate-in fade-in"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-serif font-black text-sm text-[#3B0A14]">
                            #{order.id}
                          </span>
                          <p className="text-[10px] text-neutral-400 font-semibold">{order.time}</p>
                        </div>
                        <span className="font-serif font-black text-base text-[#3B0A14]">
                          ₹{order.total}
                        </span>
                      </div>

                      <div className="bg-[#F8F1E4] p-3 rounded-xl space-y-1">
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between text-xs font-semibold text-[#3B0A14]">
                            <span>{item.quantity}x {item.name}</span>
                            <span>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="text-[11px] text-[#6B5347]">
                        <p><strong>Customer:</strong> {order.customerName}</p>
                        <p className="truncate"><strong>Destination:</strong> {order.address}</p>
                        {order.note && (
                          <p className="text-amber-800 bg-amber-50 p-1.5 rounded-lg mt-1 text-[10px]">
                            <strong>Note:</strong> {order.note}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-neutral-100">
                        <button
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                          className="flex-1 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, 'accepted')}
                          className="flex-1 py-2 rounded-xl text-xs font-bold bg-[#3B0A14] text-white hover:bg-[#240610] transition-colors cursor-pointer shadow"
                        >
                          Accept Order
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Column 2: In Kitchen / Cooking */}
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-blue-50 border border-blue-200 p-3 rounded-2xl">
                  <h4 className="font-bold text-xs text-blue-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>In Kitchen Preparation ({preparingOrders.length})</span>
                  </h4>
                  <span className="text-[10px] font-extrabold text-blue-800">Timer Active</span>
                </div>

                {preparingOrders.length === 0 ? (
                  <div className="bg-white rounded-2xl p-6 text-center border border-neutral-200 text-xs text-[#6B5347]">
                    No tickets currently on stoves.
                  </div>
                ) : (
                  preparingOrders.map(order => (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl p-5 border border-blue-200 shadow-sm space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-serif font-black text-sm text-[#3B0A14]">
                            #{order.id}
                          </span>
                          <span className="ml-2 text-[10px] font-black uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            {order.status === 'accepted' ? 'Accepted' : 'On Stove'}
                          </span>
                        </div>
                        <span className="font-serif font-black text-sm text-[#3B0A14]">
                          ₹{order.total}
                        </span>
                      </div>

                      <div className="bg-[#F8F1E4] p-3 rounded-xl space-y-1">
                        {order.items.map(item => (
                          <div key={item.id} className="text-xs font-semibold text-[#3B0A14]">
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => updateOrderStatus(order.id, 'out_for_delivery')}
                        className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#3B8C5A] text-white hover:bg-[#2A6B42] transition-colors cursor-pointer shadow flex items-center justify-center gap-1.5"
                      >
                        <Truck size={14} />
                        <span>Ready & Hand to Rider</span>
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Column 3: Out for Delivery */}
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-green-50 border border-green-200 p-3 rounded-2xl">
                  <h4 className="font-bold text-xs text-green-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-600" />
                    <span>Out on Road ({outForDeliveryOrders.length})</span>
                  </h4>
                  <span className="text-[10px] font-extrabold text-green-800">With Rider</span>
                </div>

                {outForDeliveryOrders.length === 0 ? (
                  <div className="bg-white rounded-2xl p-6 text-center border border-neutral-200 text-xs text-[#6B5347]">
                    No active deliveries on the road right now.
                  </div>
                ) : (
                  outForDeliveryOrders.map(order => (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl p-5 border border-green-200 shadow-sm space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-serif font-black text-sm text-[#3B0A14]">
                          #{order.id}
                        </span>
                        <span className="text-xs font-bold text-[#3B8C5A]">
                          Rider: {order.driverName || 'Ravi Shankar'}
                        </span>
                      </div>

                      <p className="text-xs text-[#6B5347] truncate">
                        Delivering to: {order.address}
                      </p>

                      <button
                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                        className="w-full py-2 rounded-xl text-xs font-bold border border-green-600 text-green-800 hover:bg-green-50 transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <CheckCircle size={14} />
                        <span>Mark as Delivered</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Menu & In-Stock Manager */}
        {activeTab === 'menu' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-neutral-100">
              <div>
                <h3 className="font-serif font-black text-xl text-[#3B0A14]">
                  Menu & In-Stock Management
                </h3>
                <p className="text-xs text-[#6B5347]">
                  Instantly toggle item availability. Out-of-stock items will not appear for customers.
                </p>
              </div>

              <button
                onClick={() => alert('New item form modal')}
                className="bg-[#3B0A14] text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#240610]"
              >
                <Plus size={14} />
                <span>Add Dish</span>
              </button>
            </div>

            <div className="divide-y divide-neutral-100">
              {restaurant.menu.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-2xl object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-xs ${item.veg ? 'bg-green-600' : 'bg-red-600'}`} />
                        <h4 className="font-bold text-sm text-[#3B0A14]">{item.name}</h4>
                        <span className="text-[10px] text-neutral-400 font-semibold">({item.category})</span>
                      </div>
                      <p className="text-xs font-serif font-black text-[#3B0A14] mt-0.5">
                        ₹{item.price}{' '}
                        <span className="text-[10px] font-sans font-bold text-[#3B8C5A]">
                          (Dine-in exact)
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-extrabold ${item.available !== false ? 'text-[#3B8C5A]' : 'text-neutral-400'}`}>
                      {item.available !== false ? 'In Stock' : 'Sold Out'}
                    </span>

                    <button
                      onClick={() => toggleItemAvailability(restaurant.id, item.id)}
                      className="cursor-pointer text-[#3B0A14] hover:scale-105 transition-transform"
                      title="Toggle availability"
                    >
                      {item.available !== false ? (
                        <ToggleRight size={32} className="text-[#3B8C5A]" />
                      ) : (
                        <ToggleLeft size={32} className="text-neutral-300" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Fleet & Dispatch */}
        {activeTab === 'fleet' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
            <div>
              <h3 className="font-serif font-black text-xl text-[#3B0A14]">
                Dedicated Delivery Fleet
              </h3>
              <p className="text-xs text-[#6B5347]">
                FairBite connects kitchens with pooled local riders in Jamshedpur with zero surge manipulation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Ravi Shankar', bike: 'JH-05-AB-4412', rating: '4.9 ★', status: 'On Delivery', activeOrders: 1 },
                { name: 'Sunil Mahto', bike: 'JH-05-CC-8901', rating: '4.8 ★', status: 'Available at Node', activeOrders: 0 },
                { name: 'Deepak Roy', bike: 'JH-05-KL-1290', rating: '4.9 ★', status: 'Available at Node', activeOrders: 0 }
              ].map((rider, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F8F1E4] border border-[#E8C468]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#3B0A14] text-[#E8C468] flex items-center justify-center font-bold">
                      <Truck size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#3B0A14]">{rider.name}</h4>
                      <p className="text-[10px] text-[#6B5347]">{rider.bike} • {rider.rating}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                    rider.status === 'On Delivery' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-[#3B8C5A]'
                  }`}>
                    {rider.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Analytics & Commission Report */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-[#3B0A14] text-[#F8F1E4] p-6 sm:p-8 rounded-3xl shadow-xl border border-[#C9A227]/40">
              <div className="max-w-xl">
                <span className="bg-[#C9A227] text-[#3B0A14] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  Zero Commission Ledger
                </span>
                <h3 className="font-serif font-black text-2xl text-[#F8F1E4] mt-2">
                  Monthly Direct Margin Protection
                </h3>
                <p className="text-xs text-[#E8C468] mt-1">
                  On other platforms, 28% of this revenue would have been deducted as fees.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#57182A]">
                <div>
                  <p className="text-[10px] font-bold text-white/70 uppercase">30-Day Gross Orders</p>
                  <p className="font-serif font-black text-2xl text-white">₹1,84,500</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/70 uppercase">Flat Subscription Paid</p>
                  <p className="font-serif font-black text-2xl text-[#E8C468]">₹2,499</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/70 uppercase">Net Saved vs 28% Cut</p>
                  <p className="font-serif font-black text-2xl text-[#3B8C5A]">+₹49,161</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
