import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
            Tech<span className="text-gray-900">Store</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" label="Inicio" />
            <NavLink to="/productos" label="Productos" />
            <NavLink to="/ofertas" label="Ofertas" />
            <NavLink to="/contacto" label="Contáctanos" />
          </div>

          {/* Mobile button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 focus:outline-none"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-6 pb-4 shadow">
          <MobileNavLink to="/" label="Inicio" />
          <MobileNavLink to="/productos" label="Productos" />
          <MobileNavLink to="/ofertas" label="Ofertas" />
          <MobileNavLink to="/contacto" label="Contáctanos" />
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, label }) {
  return (
    <Link
      to={to}
      className="relative text-gray-700 font-medium hover:text-blue-600 transition duration-200 group"
    >
      {label}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
    </Link>
  );
}

function MobileNavLink({ to, label }) {
  return (
    <Link
      to={to}
      className="block py-2 text-gray-700 hover:text-blue-600 border-b border-gray-200 font-medium"
    >
      {label}
    </Link>
  );
}

export default Navbar;
