import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Home, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GynecologyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Add event listener for outside clicks
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { path: "/gynecology", label: "Overview" },
    { path: "/gynecology/doctor", label: "Dr. Nisha Bhatnagar" },
    { 
      path: "/gynecology/appointment", 
      label: "Book Appointment",
      isHighlight: true
    },
  ];

  // Call button click handler
  const handleCallClick = () => {
    window.location.href = 'tel:+919999999999'; // Replace with actual phone number
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
          : 'bg-white/90 backdrop-blur-sm py-3'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center h-full group" aria-label="Home">
            <motion.div 
              className="h-12 w-auto flex items-center transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img 
                src="/eyefemm_pic_uploads/6c43213d-6d60-4790-b8ff-d662e634ee59.png"
                alt="EyeFem Clinic"
                className="h-12 w-auto object-contain transition-all duration-300"
                width={160}
                height={48}
                loading="eager"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                location.pathname === "/"
                  ? "text-primary bg-primary/10"
                  : "text-gray-700 hover:text-primary hover:bg-gray-100"
              }`}
              aria-current={location.pathname === "/" ? "page" : undefined}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
            
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  location.pathname === link.path
                    ? link.isHighlight 
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'text-primary bg-primary/10'
                    : link.isHighlight
                    ? 'bg-primary/90 text-white hover:bg-primary'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                }`}
                aria-current={location.pathname === link.path ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            
            <button
              onClick={handleCallClick}
              className="ml-2 flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
              aria-label="Call us"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 -mr-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            className="md:hidden fixed inset-x-0 top-16 bg-white shadow-xl z-40 overflow-y-auto"
            style={{ height: 'calc(100vh - 4rem)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              <Link
                to="/"
                className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  location.pathname === "/"
                    ? 'bg-gray-100 text-primary'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Home className="w-5 h-5 mr-3 text-gray-500" />
                Home
              </Link>
              
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? link.isHighlight 
                        ? 'bg-primary/10 text-primary'
                        : 'bg-gray-100 text-primary'
                      : link.isHighlight
                      ? 'bg-primary/5 text-gray-900 hover:bg-primary/10'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span>{link.label}</span>
                  {link.isHighlight && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                      New
                    </span>
                  )}
                </Link>
              ))}
              
              <button
                onClick={() => {
                  handleCallClick();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center mt-4 px-4 py-3 text-base font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </button>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4">
                  <a 
                    href="tel:+919999999999" 
                    className="p-2 text-gray-600 hover:text-primary transition-colors"
                    aria-label="Call us"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                  <a 
                    href="mailto:info@eyefem.com" 
                    className="p-2 text-gray-600 hover:text-primary transition-colors"
                    aria-label="Email us"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
                <p className="mt-2 text-center text-sm text-gray-500">
                  Open 24/7 for emergencies
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default GynecologyNavbar;
