import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/yourusername' },
    { icon: <FiTwitter />, url: 'https://twitter.com/yourusername' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com/in/yourusername' },
    { icon: <FiMail />, url: 'mailto:contact@assentech.com' },
  ];

  const footerLinks = [
    { title: 'Company', links: ['About', 'Careers', 'Blog'] },
    { title: 'Resources', links: ['Documentation', 'Tutorials', 'API Status'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Cookie Policy'] },
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Assentech
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Building the future of technology solutions.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label={social.url.split('/')[2]}
                >
                  <span className="text-xl">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {currentYear} Assentech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
