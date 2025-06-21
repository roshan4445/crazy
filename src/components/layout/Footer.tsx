import { Link } from 'react-router-dom';
import { Heart, Shield, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white relative z-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">GovServe</span>
            </div>
            <p className="text-gray-400 text-sm">
              Connecting citizens with government services through digital innovation and accessibility.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/complaints" className="text-gray-400 hover:text-white transition-colors">File Complaint</Link></li>
              <li><Link to="/schemes" className="text-gray-400 hover:text-white transition-colors">Government Schemes</Link></li>
              <li><Link to="/traffic" className="text-gray-400 hover:text-white transition-colors">Traffic Updates</Link></li>
              <li><Link to="/elderly-program" className="text-gray-400 hover:text-white transition-colors">Elderly Program</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>1800-123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@govserve.gov</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Government Complex, New Delhi</span>
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h3 className="font-semibold mb-4">Impact</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-2xl font-bold text-green-400">2.5M+</span>
                <p className="text-gray-400">Citizens Served</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-blue-400">98%</span>
                <p className="text-gray-400">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 GovServe. All rights reserved. Built with{' '}
            <Heart className="w-4 h-4 inline text-red-500" /> for citizens.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}