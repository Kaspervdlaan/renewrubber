import type { RouteObject } from 'react-router';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Gyms from './pages/Gyms';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function ProtectedDashboard() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

export const routes: RouteObject[] = [
  { path: '/', Component: Home },
  { path: '/shop', Component: Shop },
  { path: '/shop/:id', Component: ProductDetail },
  { path: '/cart', Component: Cart },
  { path: '/checkout', Component: Checkout },
  { path: '/order-success/:orderId', Component: OrderSuccess },
  { path: '/gyms', Component: Gyms },
  { path: '/dashboard', Component: ProtectedDashboard },
  { path: '/login', Component: Login },
  { path: '/signup', Component: SignUp },
  { path: '/about', Component: About },
  { path: '/contact', Component: Contact },
  { path: '*', Component: NotFound },
];
