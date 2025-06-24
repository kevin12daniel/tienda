    // src/controllers/productoController.js
    const Pro = require("../models/userModels");

    // Obtener todos los productos
    exports.getProdu = async (req, res) => {
    try {
        const productos = await Pro.getAllProdu();
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).send("Error al obtener los productos");
    }
    };

    // Obtener un producto por ID
    exports.getProduById = async (req, res) => {
    const id = req.params.id;

    try {
        const producto = await Pro.getProduById(id);

        if (!producto) {
        return res.status(404).send("Producto no encontrado");
        }

        res.json(producto);
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).send("Error al obtener el producto");
    }
    };

    // Crear un nuevo producto
    exports.createProdu = async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;

    if (!nombre || !descripcion || !precio || !stock) {
        return res
        .status(400)
        .send("nombre, descripcion, precio y stock son obligatorios");
    }

    try {
        const nuevoProducto = await Pro.createProdu(nombre, descripcion, precio, stock);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).send("Error al crear el producto");
    }
    };

    // Actualizar producto
    exports.updateProdu = async (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, precio, stock } = req.body;

    if (!nombre || !descripcion || !precio || !stock) {
        return res
        .status(400)
        .send("nombre, descripcion, precio y stock son obligatorios");
    }

    try {
        const resultado = await Pro.updateProdu(id, nombre, descripcion, precio, stock);
        res.json(resultado);
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).send("Error al actualizar el producto");
    }
    };

    // Eliminar producto
    exports.deleteProdu = async (req, res) => {
    const id = req.params.id;

    try {
        const resultado = await Pro.deleteProdu(id);
        res.json(resultado);
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).send("Error al eliminar el producto");
    }
    };
