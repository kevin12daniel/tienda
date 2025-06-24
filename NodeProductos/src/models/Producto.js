    const { DataTypes } = require('sequelize');
    const sequelize = require('../config/sequelizeConfig');

    const Producto = sequelize.define('Producto', {
    id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Descripcion: {
        type: DataTypes.STRING
    },
    Precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
    }, {
    tableName: 'productos',    
    timestamps: false           
    });

    module.exports = Producto;
