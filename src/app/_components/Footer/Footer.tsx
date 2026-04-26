import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, CreditCard } from "lucide-react";
import Link from "next/link";
import Logo from "../Navbar/Logo";

export default function Footer() {
  return (
    <footer id="footer" className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand and Contact Info */}
          <div className="lg:col-span-4">
            <Link className="inline-block mb-6" href="/">
              <div className="bg-white rounded-lg px-4 py-2 inline-block">
                <Logo />
              </div>
            </Link>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>
            <div className="space-y-3 mb-6">
              <a href="tel:+18001234567" className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors text-sm">
                <Phone size={16} className="text-green-500" />
                <span>+1 (800) 123-4567</span>
              </a>
              <a href="mailto:support@freshcart.com" className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors text-sm">
                <Mail size={16} className="text-green-500" />
                <span>support@freshcart.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={16} className="text-green-500 mt-0.5" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-colors"
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5 text-white">Shop</h3>
            <ul className="space-y-3">
              {['All Products', 'Categories', 'Brands', 'Electronics', 'Men\'s Fashion', 'Women\'s Fashion'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5 text-white">Account</h3>
            <ul className="space-y-3">
              {['My Account', 'Order History', 'Wishlist', 'Shopping Cart', 'Sign In', 'Create Account'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5 text-white">Support</h3>
            <ul className="space-y-3">
              {['Contact Us', 'Help Center', 'Shipping Info', 'Returns & Refunds', 'Track Order'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-5 text-white">Legal</h3>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} FreshCart. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {['Visa', 'Mastercard', 'PayPal'].map((payment) => (
                <div key={payment} className="flex items-center gap-2 text-gray-500 text-sm">
                  <CreditCard size={14} />
                  <span>{payment}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
