import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import {
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
  MapPin,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Loader2,
  LogOut,
  Save,
  Lock,
  User,
  Phone,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { fetchUserOrders, updateProfile, resetPassword } from '../lib/supabase';
import { formatPrice } from '../lib/medusa';
import { gymLocations } from '../lib/maps';
import type { Order, OrderStatus, TrackingStep } from '../types';

type Tab = 'overview' | 'orders' | 'settings';

const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'settings', label: 'Profile Settings', icon: Settings },
];

const statusColor: Record<OrderStatus, string> = {
  Received: 'bg-blue-100 text-blue-700',
  'In Progress': 'bg-orange-100 text-[#fb791c]',
  'Ready for Pickup': 'bg-green-100 text-[#10b981]',
  Completed: 'bg-gray-100 text-[#4a4a4a]',
};

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Profile form state
  const [profileName, setProfileName] = useState(user?.fullName ?? '');
  const [profilePhone, setProfilePhone] = useState(user?.phone ?? '');
  const [profileGym, setProfileGym] = useState(user?.preferredGym ?? '');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    fetchUserOrders()
      .then(setOrders)
      .finally(() => setOrdersLoading(false));
  }, []);

  // Derived stats
  const inProgressCount = orders.filter(
    (o) => o.status === 'In Progress' || o.status === 'Received'
  ).length;
  const completedCount = orders.filter(
    (o) => o.status === 'Completed' || o.status === 'Ready for Pickup'
  ).length;
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const recentOrders = orders.slice(0, 2);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleProfileSave = async (e: FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSuccess(false);
    try {
      await updateProfile({
        fullName: profileName,
        phone: profilePhone,
        preferredGym: profileGym || undefined,
      });
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError('Please fill in all password fields.');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setPasswordSaving(true);
    try {
      await resetPassword(user?.email ?? '');
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch {
      setPasswordError('Failed to update password.');
    } finally {
      setPasswordSaving(false);
    }
  };

  /* ------------------------------------------------------------------
   * Sub-components
   * ----------------------------------------------------------------*/

  function OverviewTab() {
    return (
      <motion.div
        key="overview"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-bold text-[#1a1a1a]">
            Welcome back, {user?.fullName?.split(' ')[0] ?? 'Climber'}!
          </h2>
          <p className="mt-1 text-[#4a4a4a]">Here&apos;s what&apos;s happening with your orders.</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            icon={<Clock className="h-5 w-5 text-[#fb791c]" />}
            label="Orders In Progress"
            value={inProgressCount}
          />
          <StatCard
            icon={<CheckCircle2 className="h-5 w-5 text-[#10b981]" />}
            label="Completed Orders"
            value={completedCount}
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5 text-[#fb791c]" />}
            label="Total Spent"
            value={formatPrice(totalSpent)}
          />
        </div>

        {/* Recent Orders */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#1a1a1a]">Recent Orders</h3>
            <button
              onClick={() => setActiveTab('orders')}
              className="text-sm font-medium text-[#fb791c] hover:text-[#ff6a00] transition-colors"
            >
              View all
            </button>
          </div>
          {ordersLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-[#fb791c]" />
            </div>
          ) : recentOrders.length === 0 ? (
            <p className="rounded-lg border border-dashed border-gray-200 py-8 text-center text-sm text-[#4a4a4a]">
              No orders yet. Start by placing your first order!
            </p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            to="/shop"
            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-[#fb791c]/30"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#fb791c] to-[#ff6a00]">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-[#1a1a1a]">New Order</p>
              <p className="text-xs text-[#4a4a4a]">Browse resoling services</p>
            </div>
          </Link>
          <Link
            to="/gyms"
            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-[#fb791c]/30"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#fb791c] to-[#ff6a00]">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-[#1a1a1a]">Find Gym</p>
              <p className="text-xs text-[#4a4a4a]">Locate drop-off points</p>
            </div>
          </Link>
        </div>
      </motion.div>
    );
  }

  function OrdersTab() {
    return (
      <motion.div
        key="orders"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold text-[#1a1a1a]">My Orders</h2>

        {ordersLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-[#fb791c]" />
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 py-16 text-center">
            <Package className="mx-auto h-10 w-10 text-gray-300" />
            <p className="mt-3 text-sm text-[#4a4a4a]">No orders yet.</p>
            <Link
              to="/shop"
              className="mt-4 inline-block rounded-lg bg-gradient-to-r from-[#fb791c] to-[#ff6a00] px-5 py-2 text-sm font-semibold text-white"
            >
              Place your first order
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} expandable />
            ))}
          </div>
        )}
      </motion.div>
    );
  }

  function SettingsTab() {
    return (
      <motion.div
        key="settings"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        <h2 className="text-2xl font-bold text-[#1a1a1a]">Profile Settings</h2>

        {/* Profile form */}
        <form onSubmit={handleProfileSave} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
          <h3 className="text-lg font-semibold text-[#1a1a1a]">Personal Information</h3>

          {profileSuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="rounded-lg bg-green-50 px-4 py-3 text-sm text-[#10b981]"
            >
              Profile updated successfully!
            </motion.div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label htmlFor="profileName" className="mb-1.5 block text-sm font-medium text-[#1a1a1a]">
                Full name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="profileName"
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-[#1a1a1a] transition-colors focus:border-[#fb791c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fb791c]/20"
                />
              </div>
            </div>

            {/* Email (disabled) */}
            <div>
              <label htmlFor="profileEmail" className="mb-1.5 block text-sm font-medium text-[#1a1a1a]">
                Email
              </label>
              <input
                id="profileEmail"
                type="email"
                value={user?.email ?? ''}
                disabled
                className="w-full rounded-lg border border-gray-200 bg-gray-100 py-2.5 px-4 text-sm text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="profilePhone" className="mb-1.5 block text-sm font-medium text-[#1a1a1a]">
                Phone
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="profilePhone"
                  type="tel"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  placeholder="+31 6 1234 5678"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-[#1a1a1a] placeholder:text-gray-400 transition-colors focus:border-[#fb791c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fb791c]/20"
                />
              </div>
            </div>

            {/* Preferred Gym */}
            <div>
              <label htmlFor="profileGym" className="mb-1.5 block text-sm font-medium text-[#1a1a1a]">
                Preferred gym
              </label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select
                  id="profileGym"
                  value={profileGym}
                  onChange={(e) => setProfileGym(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-8 text-sm text-[#1a1a1a] transition-colors focus:border-[#fb791c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fb791c]/20"
                >
                  <option value="">Select a gym...</option>
                  {gymLocations.map((gym) => (
                    <option key={gym.id} value={gym.name}>
                      {gym.name} — {gym.city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={profileSaving}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#fb791c] to-[#ff6a00] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:brightness-105 disabled:opacity-60"
            >
              {profileSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Changes
            </button>
          </div>
        </form>

        {/* Change Password */}
        <form onSubmit={handlePasswordChange} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
          <h3 className="text-lg font-semibold text-[#1a1a1a]">Change Password</h3>

          {passwordError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="rounded-lg bg-red-50 px-4 py-3 text-sm text-[#ef4444]"
            >
              {passwordError}
            </motion.div>
          )}
          {passwordSuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="rounded-lg bg-green-50 px-4 py-3 text-sm text-[#10b981]"
            >
              Password updated successfully!
            </motion.div>
          )}

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="currentPassword" className="mb-1.5 block text-sm font-medium text-[#1a1a1a]">
                Current password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-[#1a1a1a] transition-colors focus:border-[#fb791c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fb791c]/20"
                />
              </div>
            </div>
            <div>
              <label htmlFor="newPassword" className="mb-1.5 block text-sm font-medium text-[#1a1a1a]">
                New password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-[#1a1a1a] placeholder:text-gray-400 transition-colors focus:border-[#fb791c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fb791c]/20"
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirmNewPassword" className="mb-1.5 block text-sm font-medium text-[#1a1a1a]">
                Confirm new password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="confirmNewPassword"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-[#1a1a1a] transition-colors focus:border-[#fb791c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fb791c]/20"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={passwordSaving}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#fb791c] to-[#ff6a00] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:brightness-105 disabled:opacity-60"
            >
              {passwordSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              Update Password
            </button>
          </div>
        </form>

        {/* Logout */}
        <div className="rounded-xl border border-red-100 bg-red-50/50 p-6">
          <h3 className="text-lg font-semibold text-[#1a1a1a]">Sign Out</h3>
          <p className="mt-1 text-sm text-[#4a4a4a]">Sign out of your RenewRubber account.</p>
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-2 rounded-lg bg-[#ef4444] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </motion.div>
    );
  }

  /* ------------------------------------------------------------------
   * Shared sub-components
   * ----------------------------------------------------------------*/

  function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50">{icon}</div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#4a4a4a]">{label}</p>
            <p className="text-xl font-bold text-[#1a1a1a]">{value}</p>
          </div>
        </div>
      </div>
    );
  }

  function OrderCard({ order, expandable = false }: { order: Order; expandable?: boolean }) {
    const isExpanded = expandedOrder === order.id;

    return (
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
        <div
          className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between ${expandable ? 'cursor-pointer' : ''}`}
          onClick={() => expandable && setExpandedOrder(isExpanded ? null : order.id)}
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-[#1a1a1a]">{order.id}</span>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor[order.status]}`}>
                {order.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-[#4a4a4a]">
              {order.items.map((i) => i.productName).join(', ')}
            </p>
            <p className="mt-0.5 text-xs text-gray-400">
              {new Date(order.date).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
              {order.pickupGym && ` · ${order.pickupGym}`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-[#1a1a1a]">{formatPrice(order.total)}</span>
            {expandable && (
              isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )
            )}
          </div>
        </div>

        {/* Expandable Tracking Timeline */}
        <AnimatePresence>
          {expandable && isExpanded && order.trackingTimeline && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-gray-100 px-5 py-5">
                <h4 className="mb-4 text-sm font-semibold text-[#1a1a1a]">Order Tracking</h4>
                <TrackingTimeline steps={order.trackingTimeline} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  function TrackingTimeline({ steps }: { steps: TrackingStep[] }) {
    return (
      <div className="relative ml-3">
        {/* Vertical line */}
        <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-gray-200" />

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="relative flex items-start gap-4 pl-6">
              {/* Dot */}
              <div
                className={`absolute left-0 top-0.5 h-3 w-3 -translate-x-[5px] rounded-full border-2 ${
                  step.completed
                    ? 'border-[#10b981] bg-[#10b981]'
                    : 'border-gray-300 bg-white'
                }`}
              />
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium ${step.completed ? 'text-[#1a1a1a]' : 'text-gray-400'}`}>
                  {step.label}
                </p>
                {step.date && (
                  <p className="text-xs text-gray-400">
                    {new Date(step.date).toLocaleDateString('nl-NL', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                )}
              </div>
              {step.completed && (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10b981]" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------
   * Main render
   * ----------------------------------------------------------------*/

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-8 flex items-center gap-1 overflow-x-auto rounded-xl border border-gray-100 bg-white p-1.5 shadow-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-[#4a4a4a] hover:text-[#1a1a1a] hover:bg-gray-50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#fb791c] to-[#ff6a00]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'orders' && <OrdersTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </AnimatePresence>
      </div>
    </div>
  );
}
