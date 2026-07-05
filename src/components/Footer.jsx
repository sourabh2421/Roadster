import { Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaPhoneAlt } from 'react-icons/fa';
import { MapPin, Mail } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/fleet', label: 'Fleet' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-black border-t-2 border-racing-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Racing Stripe Divider */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-racing-red to-transparent mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="text-3xl font-heading mb-4">
              <span className="text-racing-red">ROAD</span>
              <span className="text-white">STER</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Premium Service, Every Mile
            </p>
            <p className="text-gray-400 text-sm">
              24/7 self-drive car rentals in Brahmpur, Greater Noida region.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading text-white mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-racing-red transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-heading text-white mb-4">CONTACT</h3>
            <div className="space-y-3">
              <a
                href="tel:+919540771001"
                className="flex items-center gap-2 text-gray-400 hover:text-racing-red transition-colors text-sm"
              >
                <FaPhoneAlt className="text-racing-red" />
                <span>9540771001</span>
              </a>
              <a
                href="tel:+918470004900"
                className="flex items-center gap-2 text-gray-400 hover:text-racing-red transition-colors text-sm"
              >
                <FaPhoneAlt className="text-racing-red" />
                <span>8470004900</span>
              </a>
              <a
                href="https://wa.me/919540771001?text=Hi%2C%20I%27m%20interested%20in%20renting%20a%20car"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-racing-red transition-colors text-sm"
              >
                <FaWhatsapp className="text-racing-red" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://instagram.com/r0adster_drive"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-racing-red transition-colors text-sm"
              >
                <FaInstagram className="text-racing-red" />
                <span>@r0adster_drive</span>
              </a>
              <div className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="text-racing-red mt-0.5 flex-shrink-0" size={16} />
                <span>13th St, Sector Alpha II, Brahmpur Rajraula Urf Nawada, UP 201310</span>
              </div>
            </div>
          </div>
        </div>

        {/* Racing Stripe Divider */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-racing-red to-transparent my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Roadster. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Self-Drive Cars | 24/7 Availability | Zero Security Deposit</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
