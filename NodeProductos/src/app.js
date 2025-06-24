    const express = require('express');
    const cors = require('cors');
    const productoRoutes = require('./routes/productos'); // Ajusta path

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use('/productos', productoRoutes);

    const PORT = 3000;
    app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
