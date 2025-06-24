import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setSubscribeStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
      // Reset status after 3 seconds
      setTimeout(() => setSubscribeStatus(''), 3000);
    }, 1000);
  };

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Returns', href: '/returns' },
      { name: 'Shipping Info', href: '/shipping' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' }
    ],
    categories: [
      { name: 'Audio', href: '/products?category=Audio' },
      { name: 'Gaming', href: '/products?category=Gaming' },
      { name: 'Wearables', href: '/products?category=Wearables' },
      { name: 'Accessories', href: '/products?category=Accessories' }
    ]
  };

  const socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'X (Twitter)',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-surface/80 to-surface/60 backdrop-blur-xl border-t border-white/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30" />
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                    TechShop Pro
                  </span>
                </h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Your premier destination for cutting-edge technology. We bring you the latest gadgets, 
                  electronics, and tech accessories with unmatched quality and service.
                </p>
                
                {/* Newsletter Signup */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-4 py-3 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary border border-white/20 text-white placeholder:text-gray-400"
                    />
                    <button
                      type="submit"
                      disabled={subscribeStatus === 'loading'}
                      className={`px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium 
                        hover:scale-105 transition-all duration-300 whitespace-nowrap
                        ${subscribeStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                    </button>
                  </form>
                  {subscribeStatus === 'success' && (
                    <p
                      className="text-green-400 text-sm"
                    >
                      Thank you for subscribing!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Categories</h4>
              <ul className="space-y-3">
                {footerLinks.categories.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-white/10 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="text-gray-400">Follow us:</span>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/20 transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Payment Methods:</span>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-xs">Visa</div>
                  <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-xs">MC</div>
                  <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-xs">PayPal</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-surface/40">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <span>&copy; 2025 TechShop Pro. All rights reserved.</span>
                <div className="hidden md:block w-1 h-1 bg-gray-600 rounded-full" />
                <span>Made with ❤️ by Nicolette Mashaba</span>
              </div>
              
              <div className="flex items-center gap-6">
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
                <span className="hidden md:block">|</span>
                <span className="text-primary font-medium">v1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
