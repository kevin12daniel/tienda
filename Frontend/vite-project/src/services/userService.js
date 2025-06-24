    import axios from 'axios';

    const API_URL = 'http://localhost:3000/productos';

    const apiClient = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    timeout: 5000,
    });

    const validarProducto = (p) => ({
    Nombre: p.Nombre?.trim() || "",
    Descripcion: p.Descripcion?.trim() || "",
    Precio: Number(p.Precio),
    Stock: Number(p.Stock),
    });

    const productService = {
    getProducts: async () => {
        try {
        const res = await apiClient.get('/');
        return res.data;
        } catch (err) {
        console.error("Error GET productos:", err);
        throw err.response?.data?.message || err.message;
        }
    },

    createProduct: async (pd) => {
        const datos = validarProducto(pd);
        console.log("POST payload:", datos);
        try {
        const res = await apiClient.post('/', datos);
        return res.data;
        } catch (err) {
        console.error("Error POST producto:", err);
        throw err.response?.data?.message || err.message;
        }
    },

    updateProduct: async (id, pd) => {
        const datos = validarProducto(pd);
        console.log("PUT payload:", id, datos);
        try {
        const res = await apiClient.put(`/${id}`, datos);
        return res.data;
        } catch (err) {
        console.error(`Error PUT producto ${id}:`, err);
        throw err.response?.data?.message || err.message;
        }
    },

    deleteProduct: async (id) => {
        console.log("DELETE id:", id);
        try {
        const res = await apiClient.delete(`/${id}`);
        return res.data;
        } catch (err) {
        console.error(`Error DELETE producto ${id}:`, err);
        throw err.response?.data?.message || err.message;
        }
    }
    };

    export default productService;
