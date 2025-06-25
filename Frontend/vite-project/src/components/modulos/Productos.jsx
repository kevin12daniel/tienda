import React, { useEffect, useState } from "react";
import productService from "../../services/userService";
import Swal from "sweetalert2";
import { Plus, Edit2, Trash2, Package, Search } from "lucide-react";

// Componente de botón reutilizable (compatible con tu BotonPrimario original)
const BotonPrimario = ({ texto, onClick, className = "", variant = "primary", icon: Icon }) => {
  const baseClasses = "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl focus:ring-blue-500",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 focus:ring-gray-500",
    success: "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl focus:ring-green-500",
    danger: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl focus:ring-red-500"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={16} />}
      {texto}
    </button>
  );
};

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [productoActual, setProductoActual] = useState({
    id_producto: null,
    Nombre: "",
    Descripcion: "",
    Precio: "",
    Stock: "",
  });

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts();
      setProductos(data);
    } catch (err) {
      console.error("Error al guardar producto:", err);
      Swal.fire("Error", "No se pudieron cargar los productos.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const abrirModal = (producto = null) => {
    setEditMode(!!producto);
    setProductoActual(
      producto || {
        id_producto: null,
        Nombre: "",
        Descripcion: "",
        Precio: "",
        Stock: "",
      }
    );
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductoActual({ ...productoActual, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id_producto, Nombre, Descripcion, Precio, Stock } = productoActual;

    if (!Nombre || !Descripcion || !Precio || !Stock) {
      Swal.fire("Campos requeridos", "Completa todos los campos.", "warning");
      return;
    }

    try {
      if (editMode) {
        await productService.updateProduct(id_producto, productoActual);
        Swal.fire("Actualizado", "Producto actualizado correctamente", "success");
      } else {
        await productService.createProduct(productoActual);
        Swal.fire("Creado", "Producto creado correctamente", "success");
      }
      fetchProductos();
      cerrarModal();
    } catch (err) {
      console.error("Error al guardar producto:", err);
      Swal.fire("Error", "Hubo un problema al guardar el producto", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await productService.deleteProduct(id);
        fetchProductos();
        Swal.fire("Eliminado", "Producto eliminado", "success");
      } catch {
        Swal.fire("Error", "No se pudo eliminar el producto", "error");
      }
    }
  };

  const filteredProductos = productos.filter(producto =>
    producto.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producto.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Cargando productos...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br p-6 from-gray-900 via-gray-800 to-gray-900" >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg">
                <Package className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
                <p className="text-gray-600 mt-1">Administra tu inventario de productos</p>
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
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-full sm:w-64"
                />
              </div>
              <BotonPrimario 
                texto="Nuevo Producto" 
                onClick={() => abrirModal()} 
                icon={Plus}
                variant="primary"
              />
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {!filteredProductos.length ? (
            <div className="text-center py-16">
              <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay productos</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? "No se encontraron productos que coincidan con tu búsqueda." : "Comienza agregando tu primer producto."}
              </p>
              {!searchTerm && (
                <BotonPrimario 
                  texto="Agregar Producto" 
                  onClick={() => abrirModal()} 
                  icon={Plus}
                  variant="primary"
                />
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Producto</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Descripción</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Precio</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProductos.map((prod, index) => (
                    <tr key={prod.id_producto} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        #{prod.id_producto}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{prod.Nombre}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {prod.Descripcion}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-green-600">
                          ${Number(prod.Precio).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          Number(prod.Stock) > 20 ? 'bg-green-100 text-green-800' :
                          Number(prod.Stock) > 10 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {prod.Stock} unidades
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => abrirModal(prod)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Editar producto"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(prod.id_producto)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar producto"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-screen overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editMode ? "Editar Producto" : "Nuevo Producto"}
                </h3>
                <button
                  onClick={cerrarModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del producto
                  </label>
                  <input
                    name="Nombre"
                    placeholder="Ingresa el nombre del producto"
                    value={productoActual.Nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    name="Descripcion"
                    placeholder="Describe el producto"
                    value={productoActual.Descripcion}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio ($)
                    </label>
                    <input
                      name="Precio"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={productoActual.Precio}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock
                    </label>
                    <input
                      name="Stock"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={productoActual.Stock}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <BotonPrimario
                    texto="Cancelar"
                    onClick={cerrarModal}
                    variant="secondary"
                  />
                  <BotonPrimario
                    texto={editMode ? "Actualizar" : "Crear"}
                    onClick={handleSubmit}
                    variant={editMode ? "success" : "primary"}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;