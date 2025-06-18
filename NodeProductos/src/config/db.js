const mysql  = require('mysql2');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database:"supermercado"
});

db.connect((error)=>{
    if (error) {
        console.log("Error conectando a MySQL: ",error); 
        return;
    }
    console.log("Conectado a la base de datos MySQL");
})
module.exports = db;
