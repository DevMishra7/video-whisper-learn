
import React from 'react';
import { Link } from 'react-router-dom';
import { Languages, Github, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Languages className="h-6 w-6 text-linguify-primary" />
              <span className="ml-2 text-lg font-bold text-linguify-primary">Linguify</span>
            </div>
            <p className="text-sm text-gray-500">
              Learn languages through real-world videos with AI-powered assistance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-linguify-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-linguify-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <li><Link to="/learn" className="text-gray-500 hover:text-linguify-primary">Learn</Link></li>
              <li><Link to="/dashboard" className="text-gray-500 hover:text-linguify-primary">Dashboard</Link></li>
              <li><Link to="/vocabulary" className="text-gray-500 hover:text-linguify-primary">Vocabulary</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-linguify-primary">Help Center</a></li>
              <li><a href="#" className="text-gray-500 hover:text-linguify-primary">Contact Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-linguify-primary">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-linguify-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-linguify-primary">Terms of Service</a></li>
              <li><a href="#" className="text-gray-500 hover:text-linguify-primary">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400 text-center flex items-center justify-center">
            &copy; {new Date().getFullYear()} Linguify. Made with 
            <Heart className="h-4 w-4 text-linguify-primary mx-1" />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
