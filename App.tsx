import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { RestaurantDetails } from './pages/RestaurantDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderTracking } from './pages/OrderTracking';

// Helper to hide navbar on certain pages
const Layout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const hideNavbarPaths = ['/cart', '/checkout', '/tracking'];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname) && !location.pathname.startsWith('/restaurant/');

  return (
    <>
      <div className={shouldShowNavbar ? 'pb-16' : ''}>
        {children}
      </div>
      {shouldShowNavbar && <Navbar />}
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/tracking" element={<OrderTracking />} />
            {/* Fallback routes */}
            <Route path="/search" element={<Home />} />
            <Route path="/profile" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;