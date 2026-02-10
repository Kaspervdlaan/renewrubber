import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '../lib/CartContext';
import { useAuth } from '../lib/AuthContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Find Gyms', path: '/gyms' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { totalItems, isCartAnimating } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
          hasScrolled ? 'shadow-md' : 'shadow-none'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <span className="bg-gradient-to-r from-[#fb791c] to-[#ff6a00] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
              RenewRubber
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-[#fb791c]'
                    : 'text-[#4a4a4a] hover:text-[#1a1a1a]'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#fb791c] to-[#ff6a00]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link to="/cart" className="relative p-2">
              <motion.div
                animate={isCartAnimating ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <ShoppingBag className="h-5 w-5 text-[#4a4a4a] transition-colors hover:text-[#1a1a1a]" />
              </motion.div>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#fb791c] to-[#ff6a00] text-[10px] font-bold text-white"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {/* Auth Link - Desktop */}
            <Link
              to={user ? '/dashboard' : '/login'}
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[#4a4a4a] transition-colors hover:text-[#1a1a1a] md:flex"
            >
              <User className="h-4 w-4" />
              {user ? 'Dashboard' : 'Login'}
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-lg p-2 text-[#4a4a4a] transition-colors hover:bg-gray-100 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                <span className="bg-gradient-to-r from-[#fb791c] to-[#ff6a00] bg-clip-text text-xl font-bold text-transparent">
                  RenewRubber
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg p-2 text-[#4a4a4a] transition-colors hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col px-6 py-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                        isActive(link.path)
                          ? 'bg-orange-50 text-[#fb791c]'
                          : 'text-[#4a4a4a] hover:bg-gray-50 hover:text-[#1a1a1a]'
                      }`}
                    >
                      {link.name}
                      {isActive(link.path) && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#fb791c]" />
                      )}
                    </Link>
                  </motion.div>
                ))}

                <div className="my-4 border-t border-gray-100" />

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  <Link
                    to={user ? '/dashboard' : '/login'}
                    className="flex items-center gap-2 rounded-lg px-3 py-3 text-base font-medium text-[#4a4a4a] transition-colors hover:bg-gray-50 hover:text-[#1a1a1a]"
                  >
                    <User className="h-5 w-5" />
                    {user ? 'Dashboard' : 'Login'}
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
