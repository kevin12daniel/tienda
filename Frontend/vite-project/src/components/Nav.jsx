import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#productos", label: "Productos" },
    { href: "#ofertas", label: "Ofertas", badge: "Nuevo" },
    { href: "#contacto", label: "Contacto" }
  ];

  return (
    <>
      <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-white shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MiLogo
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-3 lg:px-4 py-2 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:text-blue-600 hover:bg-blue-50 group"
                >
                  <span className="relative z-10">{link.label}</span>
                  {link.badge && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold animate-pulse">
                      {link.badge}
                    </span>
                  )}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* Search Button */}
              <button className="hidden sm:flex items-center justify-center w-10 h-10 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200">
                <Search size={20} />
              </button>
              
              {/* Shopping Cart */}
              <button className="relative flex items-center justify-center w-10 h-10 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200">
                <ShoppingBag size={20} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                  3
                </span>
              </button>

              {/* User Account */}
              <button className="hidden sm:flex items-center justify-center w-10 h-10 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200">
                <User size={20} />
              </button>

              {/* CTA Button */}
              <button className="hidden lg:block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
                Comprar Ahora
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden flex items-center justify-center w-10 h-10 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
              >
                {open ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-4 bg-white/95 backdrop-blur-md border-t border-gray-100">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative flex items-center justify-between px-4 py-3 text-gray-700 font-medium rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                  onClick={() => setOpen(false)}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}
            </div>
            
            {/* Mobile Actions */}
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                <Search size={20} />
                <span>Buscar</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200">
                <User size={20} />
                <span>Mi Cuenta</span>
              </button>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
                Comprar Ahora
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Demo Content */}
      <div className="pt-20 lg:pt-24">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Navbar Mejorado
            </h1>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Navega por las secciones para ver los efectos de scroll y las animaciones mejoradas
            </p>
          </div>
        </div>
        
        {/* Sample Sections */}
        {['inicio', 'productos', 'ofertas', 'contacto'].map((section) => (
          <div key={section} id={section} className="min-h-screen flex items-center justify-center bg-white even:bg-gray-50">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 capitalize mb-4">
                Sección {section}
              </h2>
              <p className="text-gray-600 max-w-lg mx-auto">
                Esta es la sección de {section}. El navbar cambia su apariencia cuando haces scroll.
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Navbar;