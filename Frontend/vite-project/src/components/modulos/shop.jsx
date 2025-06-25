import React, { useEffect, useState } from "react";
import productService from "../../services/userService";
import Swal from "sweetalert2";
import { Package, Search, ShoppingCart, Star, Heart, Eye } from "lucide-react";

// Botón de agregar
const BotonPrimario = ({ texto, onClick, className = "", icon: Icon, size = "md" }) => {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const baseClasses = `inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${sizeClasses[size]}`;

  const variant = "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl focus:ring-orange-500";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variant} ${className}`}
    >
      {Icon && <Icon size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />}
      {texto}
    </button>
  );
};

// Tarjeta de producto
const ProductCard = ({ producto }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group from-gray-900 via-gray-800 to-gray-900">
      <div className="relative h-48 bg-gradient-to-br flex items-center justify-center" >
        <Package className="h-16 w-16 text-gray-400" />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-colors">
              <Eye size={18} />
            </button>
            <button 
              onClick={() => setLiked(!liked)}
              className={`p-2 bg-white rounded-full transition-colors ${
                liked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
              }`}
            >
              <Heart size={18} fill={liked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            Number(producto.Stock) > 20 ? 'bg-green-500 text-white' :
            Number(producto.Stock) > 10 ? 'bg-yellow-500 text-white' :
            Number(producto.Stock) > 0 ? 'bg-red-500 text-white' :
            'bg-gray-500 text-white'
          }`}>
            {Number(producto.Stock) > 0 ? `${producto.Stock} disponibles` : 'Agotado'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {producto.Nombre}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.5</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {producto.Descripcion}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-green-600">
            ${Number(producto.Precio).toLocaleString()}
          </div>

          <BotonPrimario
            texto="Agregar"
            icon={ShoppingCart}
            size="sm"
            onClick={() => {
              if (Number(producto.Stock) > 0) {
                Swal.fire({
                  title: '¡Agregado al carrito!',
                  text: `${producto.Nombre} ha sido agregado a tu carrito`,
                  icon: 'success',
                  timer: 1500,
                  showConfirmButton: false
                });
              } else {
                Swal.fire({
                  title: 'Producto agotado',
                  text: 'Este producto no está disponible en este momento',
                  icon: 'error'
                });
              }
            }}
            className={Number(producto.Stock) === 0 ? "opacity-50 cursor-not-allowed" : ""}
          />
        </div>
      </div>
    </div>
  );
};

const ProductStore = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("nombre");

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts();
      setProductos(data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      Swal.fire("Error", "No se pudieron cargar los productos.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const filteredAndSortedProductos = productos
    .filter(producto =>
      producto.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "precio-asc":
          return Number(a.Precio) - Number(b.Precio);
        case "precio-desc":
          return Number(b.Precio) - Number(a.Precio);
        case "stock":
          return Number(b.Stock) - Number(a.Stock);
        default:
          return a.Nombre.localeCompare(b.Nombre);
      }
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <span className="text-xl text-gray-600">Cargando tienda...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                <Package className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Nuestra Tienda
                </h1>
                <p className="text-gray-600 mt-1">
                  Descubre productos increíbles
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-full sm:w-64"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="nombre">Ordenar por nombre</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="stock">Por disponibilidad</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {!filteredAndSortedProductos.length ? (
          <div className="text-center py-20">
            <Package className="mx-auto h-24 w-24 text-gray-400 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No se encontraron productos
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Intenta con otros términos de búsqueda para encontrar lo que buscas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAndSortedProductos.map((producto) => (
              <ProductCard
                key={producto.id_producto}
                producto={producto}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductStore;
