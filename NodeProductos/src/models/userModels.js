const db = require('../config/db');

exports.getAllProdu = (callback) => {
    db.query("SELECT * FROM productos",(err, results)=>{
        if (err) {console.log("Error al obtener los productos", err);
            callback(err, null);
        } else{callback(err, results)}
    });
}

exports.getProduById = (id, callback)=>{
    db.query("SELECT * FROM productos WHERE id = ?",[id],(err,results)=>{
        if (err) {console.log("Error al obtenener los productos", err);}
        else{ callback(null, results[0]);}
    });
}
exports.createProdu = (nombre, descripcion, precio, stock, callback) => {
    db.query(
        'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)',
        [nombre, descripcion, precio, stock],
        (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, { id: results.insertId, nombre, descripcion, precio, stock });
        }
    );
};
exports.updateProdu = (id, nombre, descripcion, precio, stock, callback) => {
    db.query(
        "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?",
        [nombre, descripcion, precio, stock, id],
        (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { message: 'Producto actualizado exitosamente' });
            }
        }
    );
};
exports.deleteProdu = (id, callback) => {
    db.query('DELETE FROM productos WHERE id = ?', [id], (err, results) => {
        if (err) {
            callback(err, null)
        } else {
            callback(null, { message: 'Producto eliminado exitosamente' })
        }
    })
}


