import { Link } from 'react-router';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Find Gyms', path: '/gyms' },
  { name: 'About', path: '/about' },
];

const supportLinks = [
  { name: 'Contact', path: '/contact' },
  { name: 'FAQ', path: '/contact#faq' },
  { name: 'Dashboard', path: '/dashboard' },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="bg-gradient-to-r from-[#fb791c] to-[#ff6a00] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                RenewRubber
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Premium climbing shoe resoling
            </p>
            <p className="mt-1 text-sm leading-relaxed text-gray-500">
              Giving your favourite climbing shoes a second life with expert craftsmanship and sustainable practices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 transition-colors hover:text-[#fb791c]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Support
            </h3>
            <ul className="mt-4 space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 transition-colors hover:text-[#fb791c]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:info@renewrubber.nl"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#fb791c]"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  info@renewrubber.nl
                </a>
              </li>
              <li>
                <a
                  href="tel:+31201234567"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-[#fb791c]"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  +31 20 123 4567
                </a>
              </li>
              <li>
                <span className="inline-flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="h-4 w-4 shrink-0" />
                  Amsterdam, Netherlands
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-10 flex justify-center gap-4 lg:mt-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-400 transition-colors hover:bg-[#fb791c] hover:text-white"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-400 transition-colors hover:bg-[#fb791c] hover:text-white"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="mailto:info@renewrubber.nl"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gray-400 transition-colors hover:bg-[#fb791c] hover:text-white"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500">
            &copy; 2026 RenewRubber. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Sustainable climbing gear care
          </p>
        </div>
      </div>
    </footer>
  );
}
