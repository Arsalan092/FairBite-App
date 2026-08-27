import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Store, 
  ShieldCheck, 
  CreditCard, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle, 
  ArrowRight,
  ExternalLink,
  Layers
} from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';
import { AddRestaurantModal } from './AddRestaurantModal';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { restaurants, setActiveRestaurantId, switchRole, updateSubscription } = useGlobal();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlanFilter, setSelectedPlanFilter] = useState('All');

  const filtered = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || r.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) || r.location.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (selectedPlanFilter !== 'All' && r.subscription !== selectedPlanFilter) return false;
    return true;
  });

  const totalMonthlyGMV = restaurants.reduce((acc, curr) => acc + (curr.monthlyRevenue || 120000), 0);
  const totalCommissionSaved = Math.round(totalMonthlyGMV * 0.28);

  return (
    <div className="min-h-screen bg-[#F8F1E4] p-4 sm:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#3B0A14] text-[#C9A227] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-[#C9A227]/30 font-mono">
                Central Operations
              </span>
              <span className="text-xs text-[#6B5347] font-serif italic">Jamshedpur Direct Node</span>
            </div>
            <h1 className="font-serif font-black text-3xl sm:text-5xl text-[#3B0A14] mt-1 tracking-tight">
              Platform Governance & Metrics
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#3B0A14] hover:bg-[#57182A] text-[#F8F1E4] px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl transition-transform active:scale-95 cursor-pointer"
            >
              <Plus size={16} className="text-[#C9A227]" />
              <span>Onboard Partner</span>
            </button>
          </div>
        </div>

        {/* Macro KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Revenue */}
          <div className="bg-[#3B0A14] text-[#F8F1E4] p-6 sm:p-7 rounded-3xl border border-[#C9A227]/40 shadow-xl">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[9px] uppercase font-bold text-[#C9A227] tracking-widest font-mono">
                Monthly GMV Throughput
              </p>
              <TrendingUp size={18} className="text-[#3B8C5A]" />
            </div>
            <h3 className="font-serif font-black text-3xl sm:text-4xl text-[#F8F1E4]">
              ₹{totalMonthlyGMV.toLocaleString()}
            </h3>
            <p className="text-[10px] text-[#3B8C5A] font-bold mt-2 font-mono">
              +18.4% volume vs last month
            </p>
          </div>

          {/* Active Kitchens */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#3B0A14]/15 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[9px] uppercase font-black text-[#6B5347] tracking-widest font-mono">
                Partner Kitchens
              </p>
              <Store size={18} className="text-[#C9A227]" />
            </div>
            <h3 className="font-serif font-black text-3xl sm:text-4xl text-[#3B0A14]">
              {restaurants.length + 38}
            </h3>
            <p className="text-[10px] text-[#C9A227] font-bold mt-2 font-serif italic">
              100% verified dine-in pricing
            </p>
          </div>

          {/* Retention & Subscriptions */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#3B0A14]/15 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[9px] uppercase font-black text-[#6B5347] tracking-widest font-mono">
                Active Subscriptions
              </p>
              <Layers size={18} className="text-[#3B8C5A]" />
            </div>
            <h3 className="font-serif font-black text-3xl sm:text-4xl text-[#3B0A14]">
              98.4%
            </h3>
            <p className="text-[10px] text-[#6B5347] font-bold mt-2 font-serif italic">
              Zero restaurant churn
            </p>
          </div>

          {/* Total Community Savings */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#3B0A14]/15 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[9px] uppercase font-black text-[#6B5347] tracking-widest font-mono">
                Saved for Restaurants
              </p>
              <ShieldCheck size={18} className="text-[#3B8C5A]" />
            </div>
            <h3 className="font-serif font-black text-3xl sm:text-4xl text-[#3B8C5A]">
              ₹{totalCommissionSaved.toLocaleString()}
            </h3>
            <p className="text-[10px] text-[#6B5347] font-bold mt-2 font-serif italic">
              Kept in local economy
            </p>
          </div>
        </div>

        {/* Restaurant Directory Management */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#3B0A14]/15 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#3B0A14]/10">
            <div>
              <h3 className="font-serif font-black text-2xl text-[#3B0A14] uppercase tracking-tight">
                Partner Directory & Subscriptions
              </h3>
              <p className="text-xs text-[#6B5347] font-medium">
                Manage subscription tiers and jump directly to kitchen POS consoles.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B5347]" />
                <input
                  type="text"
                  placeholder="Filter by name or area..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#F8F1E4] border border-[#3B0A14]/20 rounded-full pl-9 pr-4 py-2 text-xs text-[#3B0A14] focus:outline-none focus:ring-1 focus:ring-[#C9A227]"
                />
              </div>

              <select
                value={selectedPlanFilter}
                onChange={(e) => setSelectedPlanFilter(e.target.value)}
                className="w-full sm:w-auto bg-[#F8F1E4] border border-[#3B0A14]/20 rounded-full px-4 py-2 text-xs text-[#3B0A14] font-serif font-bold focus:outline-none"
              >
                <option value="All">All Plans</option>
                <option value="Starter">Starter (₹999)</option>
                <option value="Growth">Growth (₹2,499)</option>
                <option value="Premium">Premium (₹4,999)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F1E4] text-[#6B5347] font-black uppercase text-[9px] tracking-widest font-mono rounded-xl">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Restaurant / Outlet</th>
                  <th className="p-3.5">Cuisine</th>
                  <th className="p-3.5">Plan Tier</th>
                  <th className="p-3.5">Rating</th>
                  <th className="p-3.5">30d Revenue</th>
                  <th className="p-3.5">Commission Saved</th>
                  <th className="p-3.5 text-right rounded-r-xl">POS Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3B0A14]/10 font-medium">
                {filtered.map((res) => (
                  <tr key={res.id} className="hover:bg-[#F8F1E4]/50 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={res.image}
                          alt={res.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover border border-[#3B0A14]/15"
                        />
                        <div>
                          <p className="font-serif font-bold text-sm text-[#3B0A14]">{res.name}</p>
                          <p className="text-[10px] text-[#6B5347]">{res.location}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 text-[#6B5347] max-w-[180px] truncate">
                      {res.cuisine}
                    </td>

                    <td className="p-3.5">
                      <select
                        value={res.subscription}
                        onChange={(e) => updateSubscription(res.id, e.target.value as any)}
                        className="bg-[#F8F1E4] border border-[#C9A227]/40 text-[#3B0A14] font-bold rounded-lg px-2.5 py-1 text-xs focus:outline-none"
                      >
                        <option value="Starter">Starter (₹999)</option>
                        <option value="Growth">Growth (₹2,499)</option>
                        <option value="Premium">Premium (₹4,999)</option>
                      </select>
                    </td>

                    <td className="p-3.5 font-bold text-[#3B0A14]">
                      ★ {res.rating} ({res.reviewCount})
                    </td>

                    <td className="p-3.5 font-serif font-bold text-sm text-[#3B0A14]">
                      ₹{(res.monthlyRevenue || 120000).toLocaleString()}
                    </td>

                    <td className="p-3.5 font-serif font-black text-sm text-[#3B8C5A]">
                      +₹{Math.round((res.monthlyRevenue || 120000) * 0.28).toLocaleString()}
                    </td>

                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          setActiveRestaurantId(res.id);
                          switchRole('restaurant');
                          navigate('/business');
                        }}
                        className="bg-[#3B0A14] hover:bg-[#57182A] text-[#C9A227] px-4 py-2 rounded-full font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                      >
                        <span>Open POS</span>
                        <ExternalLink size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Restaurant Modal */}
      <AddRestaurantModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};
