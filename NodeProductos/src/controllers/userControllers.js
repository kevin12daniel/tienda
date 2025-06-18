const Pro = require("../models/userModels");

exports.getProdu = (req,res) =>{
    Pro.getAllProdu((err, Productos)=>{
        if (err) {
            res.status(500).send("Error obteniendo los productos");
        }
        else{
            res.json(Productos);
        }
    });   
}
exports.getProduById= (req,res)=>{

        const ProId = req.params.id;
    
        Pro.getProduById(ProId,(err, Productos)=>{
    
        if (err) {
            res.status(500).send("Error obteniendo los productos");
        }
        else if(!Productos){
            res.status(400).send("Producto no encontrado");
        } 
        else{
            res.json(Productos);
        }
        });
    }

exports.createProdu = (req, res) => {
        const {nombre, descripcion, precio, stock} = req.body;
        if(!nombre || !descripcion || !precio || !stock){ 
            return res.status(400).send("nombre, descripcion, precio, stock son obligatorios");
        }
        Pro.createProdu(nombre, descripcion, precio, stock, (err, newProdu) => {
            if(err) res.status(500).send("Error al agregar el producto");
            else res.status(201).json(newProdu);
        });
    }
exports.updateProdu = (req, res) => {
        const ProduId = req.params.id
        const {nombre, descripcion, precio, stock} = req.body
        if(!nombre || !descripcion || !precio || !stock) {
            return res.status(400).send("nombre, descripcion, precio, stock son obligatorios");
        }
        Pro.updateProdu(ProduId, nombre, descripcion, precio, stock, (err, updateProdu) => {
            if(err){
                res.status(500).send('Error al actualizar el Producto')
            }else{
                res.json(updateProdu)
            }
        })
    }
exports.deleteProdu = (req, res) => {
        const ProduId = req.params.id
        Pro.deleteProdu(ProduId, (err, message) => {
            if(err){
                res.status(500).send('Error al eliminar el Producto')
            }else{
                res.json( message)
            }
        })
    }