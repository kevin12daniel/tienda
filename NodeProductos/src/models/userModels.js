    // src/models/userModels.js
    const Producto = require('./Producto');

    // Obtener todos los productos
    exports.getAllProdu = async () => {
    return await Producto.findAll();
    };

    // Obtener un producto por ID
    exports.getProduById = async (Id) => {
    return await Producto.findByPk(Id);
    };

    // Crear producto
    exports.createProdu = async (Nombre, Descripcion, Precio, Stock) => {
    return await Producto.create({ Nombre, Descripcion, Precio, Stock });
    };

    // Actualizar producto
    exports.updateProdu = async (Id, Nombre, Descripcion, Precio, Stock) => {
    const producto = await Producto.findByPk(Id);
    if (!producto) throw new Error('Producto no encontrado');
    await producto.update({ Nombre, Descripcion, Precio, Stock });
    return { message: 'Producto actualizado exitosamente' };
    };

    // Eliminar producto
    exports.deleteProdu = async (Id) => {
    const producto = await Producto.findByPk(Id);
    if (!producto) throw new Error('Producto no encontrado');
    await producto.destroy();
    return { message: 'Producto eliminado exitosamente' };
    };
