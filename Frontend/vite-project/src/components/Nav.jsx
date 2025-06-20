import { useState, useEffect } from 'react';
import { Menu, X, Home, Smartphone, Zap, Phone, ShoppingBag } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('inicio');
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'productos', label: 'Productos', icon: Smartphone },
    { id: 'ofertas', label: 'Ofertas', icon: Zap, badge: 5 },
    { id: 'contacto', label: 'Contacto', icon: Phone }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl shadow-blue-500/10' 
          : 'bg-slate-900/60 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-105">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-xl blur opacity-60 group-hover:opacity-80 transition-opacity duration-300 -z-10"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                  TechStore
                </h1>
                <p className="text-xs text-slate-400 -mt-1">Technology & Innovation</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 group ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 transition-transform duration-300 ${
                        isActive ? 'scale-110' : 'group-hover:scale-110'
                      }`} />
                      <span>{item.label}</span>
                      
                      {/* Badge */}
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-red-500/30">
                          {item.badge}
                        </span>
                      )}
                      
                      {/* Hover effect */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 transition-all duration-300 -z-10 ${
                        !isActive ? 'group-hover:from-blue-500/10 group-hover:to-purple-500/10' : ''
                      }`}></div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Shopping Cart */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="relative p-2 text-slate-300 hover:text-white transition-colors duration-300 hover:bg-slate-800/50 rounded-xl group">
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  2
                </span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 ease-in-out ${
          isOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-4 pt-2 pb-6 space-y-2 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            
            {/* Mobile Cart */}
            <button className="w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 text-slate-300 hover:text-white hover:bg-slate-800/50">
              <ShoppingBag className="w-5 h-5" />
              <span className="flex-1 text-left">Carrito</span>
              <span className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Demo Content */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section */}
        <div className="pt-24 pb-16 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
                Bienvenido a
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  TechStore
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
                Descubre la última tecnología con innovación, calidad y los mejores precios
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => handleItemClick('productos')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                >
                  <Smartphone className="w-5 h-5" />
                  <span>Ver Productos</span>
                </button>
                <button 
                  onClick={() => handleItemClick('ofertas')}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-2xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                >
                  <Zap className="w-5 h-5" />
                  <span>Ofertas Especiales</span>
                </button>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              {[
                { label: 'Productos', value: '1000+' },
                { label: 'Clientes Felices', value: '50K+' },
                { label: 'Años de Experiencia', value: '15+' },
                { label: 'Garantía', value: '24/7' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section indicator */}
        <div className="text-center py-16">
          <div className="inline-block px-6 py-3 bg-slate-800/50 rounded-full backdrop-blur-md border border-slate-700/50">
            <span className="text-slate-300 font-medium">
              Sección activa: <span className="text-blue-400 capitalize">{activeItem}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;