import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff, User, Loader2, MapPin } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { gymLocations } from '../lib/maps';

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [preferredGym, setPreferredGym] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreedToTerms) {
      setError('You must agree to the terms and conditions.');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, {
        fullName,
        preferredGym: preferredGym || undefined,
      });
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="rounded-2xl bg-white px-8 py-10 shadow-lg shadow-black/5 ring-1 ring-gray-100">
          {/* Branding */}
          <div className="mb-8 text-center">
            <Link to="/" className="inline-block">
              <span className="bg-gradient-to-r from-[#fb791c] to-[#ff6a00] bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                RenewRubber
              </span>
            </Link>
            <p className="mt-2 text-sm text-[#4a4a4a]">
              Create your account to start resoling
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-[#ef4444]"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-[#1a1a1a]">
                Full name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex van der Berg"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-[#1a1a1a] placeholder:text-gray-400 transition-colors focus:border-[#fb791c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fb791c]/20"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#1a1a1a]">
                Email address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-[#1a1a1a] placeholder:text-gray-400 transition-colors focus:border-[#fb791c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fb791c]/20"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#1a1a1a]">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-10 text-sm text-[#1a1a1a] placeholder:text-gray-400 transition-colors focus:border-[#fb791c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fb791c]/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {password && password.length < 6 && (
                <p className="mt-1 text-xs text-[#ef4444]">Password must be at least 6 characters</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-[#1a1a1a]">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-10 text-sm text-[#1a1a1a] placeholder:text-gray-400 transition-colors focus:border-[#fb791c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fb791c]/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-[#ef4444]">Passwords do not match</p>
              )}
            </div>

            {/* Preferred Gym */}
            <div>
              <label htmlFor="preferredGym" className="mb-1.5 block text-sm font-medium text-[#1a1a1a]">
                Preferred gym <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select
                  id="preferredGym"
                  value={preferredGym}
                  onChange={(e) => setPreferredGym(e.target.value)}
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

            {/* Terms */}
            <label className="flex items-start gap-2.5 text-sm text-[#4a4a4a]">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#fb791c] focus:ring-[#fb791c]/20"
              />
              <span>
                I agree to the{' '}
                <button type="button" className="font-medium text-[#fb791c] hover:text-[#ff6a00] underline">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="font-medium text-[#fb791c] hover:text-[#ff6a00] underline">
                  Privacy Policy
                </button>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#fb791c] to-[#ff6a00] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/30 hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-[#4a4a4a]">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[#fb791c] hover:text-[#ff6a00] transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
