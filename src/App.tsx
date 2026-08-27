/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import { Navbar } from './components/Navbar';
import { WebsiteHome } from './components/WebsiteHome';
import { CustomerHome } from './components/CustomerHome';
import { HowItWorksPage } from './components/HowItWorksPage';
import { ForRestaurantsPage } from './components/ForRestaurantsPage';
import { PricingPage } from './components/PricingPage';
import { AboutPage } from './components/AboutPage';
import { FaqPage } from './components/FaqPage';
import { ContactPage } from './components/ContactPage';
import { CalculatorPage } from './components/CalculatorPage';
import { RestaurantDetail } from './components/RestaurantDetail';
import { CartView } from './components/CartView';
import { OrderTracking } from './components/OrderTracking';
import { RestaurantDashboard } from './components/RestaurantDashboard';
import { SubscriptionView } from './components/SubscriptionView';
import { AdminDashboard } from './components/AdminDashboard';
import { PriceTransparencyModal } from './components/PriceTransparencyModal';
import { ConflictModal } from './components/ConflictModal';
import { ToastContainer } from './components/ToastContainer';
import { AIChatbotWidget } from './components/AIChatbotWidget';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <Router>
      <GlobalProvider>
        <div className="min-h-screen bg-[#F8F1E4] text-[#2A0D16] flex flex-col selection:bg-[#C9A227] selection:text-[#3B0A14]">
          <Navbar />

          <div className="flex-1">
            <Routes>
              {/* Primary Food Delivery App Routes */}
              <Route path="/" element={<CustomerHome />} />
              <Route path="/order" element={<CustomerHome />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route path="/cart" element={<CartView />} />
              <Route path="/track/:id" element={<OrderTracking />} />
              
              {/* Restaurant POS & Business Routes */}
              <Route path="/business" element={<RestaurantDashboard />} />
              <Route path="/business/subscription" element={<SubscriptionView />} />
              
              {/* Central Admin Governance Route */}
              <Route path="/admin" element={<AdminDashboard />} />

              {/* Information & Feature Pages */}
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/for-restaurants" element={<ForRestaurantsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/website" element={<WebsiteHome />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <Footer />

          {/* Global Interactive Widgets & Modals */}
          <AIChatbotWidget />
          <PriceTransparencyModal />
          <ConflictModal />
          <ToastContainer />
        </div>
      </GlobalProvider>
    </Router>
  );
}
