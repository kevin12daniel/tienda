const express = require("express");
const app = express();

app.use(express.json()); // <- Esta línea permite que req.body no sea undefined

const userRoutes = require("./routes/user.routes");
app.use("/productos", userRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
