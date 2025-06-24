    import React, { useEffect, useState } from "react";
    import productService from "../../services/userService";
    import Swal from "sweetalert2";
    import BotonPrimario from "../modulos/BotonPrimario";

    const ProductList = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
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

    if (loading) return <p>Cargando productos...</p>;
    if (!productos.length) return <p>No hay productos registrados.</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow rounded-lg">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Productos</h2>
            <BotonPrimario texto="Crear producto" onClick={() => abrirModal()} />
        </div>

        <table className="w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {productos.map((prod) => (
                <tr key={prod.id_producto} className="text-center border-t">
                <td>{prod.id_producto}</td>
                <td>{prod.Nombre}</td>
                <td>{prod.Descripcion}</td>
                <td>${prod.Precio}</td>
                <td>{prod.Stock}</td>
                <td className="space-x-2">
                    <BotonPrimario texto="Editar" onClick={() => abrirModal(prod)} />
                    <BotonPrimario
                    texto="Eliminar"
                    onClick={() => handleDelete(prod.id_producto)}
                    className="bg-red-500 hover:bg-red-700"
                    />
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        {/* Modal */}
        {modalOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-10 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
            >
                <h3 className="text-xl font-bold mb-2">
                {editMode ? "Editar producto" : "Crear producto"}
                </h3>
                <input
                name="Nombre"
                placeholder="Nombre"
                value={productoActual.Nombre}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                />
                <input
                name="Descripcion"
                placeholder="Descripción"
                value={productoActual.Descripcion}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                />
                <input
                name="Precio"
                type="number"
                placeholder="Precio"
                value={productoActual.Precio}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                />
                <input
                name="Stock"
                type="number"
                placeholder="Stock"
                value={productoActual.Stock}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                />
                <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={cerrarModal}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editMode ? "Actualizar" : "Crear"}
                </button>
                </div>
            </form>
            </div>
        )}
        </div>
    );
    };

    export default ProductList;
