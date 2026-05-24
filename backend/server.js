import app from './app.js';
import { connectDB } from './config/bd.config.js';

const PORT = process.env.PORT

export const startServer = () => {
    connectDB();
    app.listen(PORT, () => {
        console.log(`BACKEND CORRIENDO EN EL PUERTO: ${PORT}`);
    });
}