import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import archivosRoutes from './routes/archivoRoutes.js';

const PORT = process.env.PORT || 3000;
const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/api/v1/archivos",archivosRoutes);

app.listen(PORT,() =>{
    console.log(`Servidor funcionando en puerto ${PORT}`);
})
