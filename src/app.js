import express from 'express';
import { logger } from './middlewares/logger.js';
import { manejadorErrores, noEncontrado } from './middlewares/errores.js';
import sucursalRoutes from './routes/sucursal.routes.js';

const app = express();

app.use(logger);
app.use(express.json());
app.use(express.static('public'));

// en vercel express.static no se usa y los archivos de public/ los sirve su cdn
app.get('/', (req, res) => {
  res.redirect('/index.html');
});

app.use('/api', sucursalRoutes);

app.use(noEncontrado);
app.use(manejadorErrores);

export default app;
