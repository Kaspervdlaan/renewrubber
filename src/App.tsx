import { BrowserRouter, useRoutes, useLocation } from 'react-router';
import { useEffect } from 'react';
import { CartProvider } from './lib/CartContext';
import { AuthProvider } from './lib/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import { routes } from './routes';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppLayout />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
