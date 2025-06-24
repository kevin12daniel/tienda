    // src/models/userModels.js
    const Producto = require('./Producto');

    // Obtener todos los productos
    exports.getAllProdu = async () => {
    return await Producto.findAll();
    };

    // Obtener un producto por ID
    exports.getProduById = async (id) => {
    return await Producto.findByPk(id);
    };

    // Crear producto
    exports.createProdu = async (nombre, descripcion, precio, stock) => {
    return await Producto.create({ nombre, descripcion, precio, stock });
    };

    // Actualizar producto
    exports.updateProdu = async (id, nombre, descripcion, precio, stock) => {
    const producto = await Producto.findByPk(id);
    if (!producto) throw new Error('Producto no encontrado');
    await producto.update({ nombre, descripcion, precio, stock });
    return { message: 'Producto actualizado exitosamente' };
    };

    // Eliminar producto
    exports.deleteProdu = async (id) => {
    const producto = await Producto.findByPk(id);
    if (!producto) throw new Error('Producto no encontrado');
    await producto.destroy();
    return { message: 'Producto eliminado exitosamente' };
    };
