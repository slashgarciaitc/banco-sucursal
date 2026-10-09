import { Router } from 'express';
import * as central from '../services/central.js';
import { login } from '../services/auth.service.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {};
  res.json(await login(email, password));
});

router.use(requireAuth);

router.get('/sucursal', async (req, res) => {
  res.json(await central.infoSucursal());
});

router.post('/cuentas', async (req, res) => {
  const { titular, saldo_inicial = 0 } = req.body ?? {};
  if (!titular) {
    return res.status(400).json({ error: 'Falta el nombre del titular' });
  }
  if (saldo_inicial < 0) {
    return res.status(400).json({ error: 'El saldo inicial no puede ser negativo' });
  }
  res.status(201).json(await central.crearCuenta(titular, saldo_inicial));
});

router.get('/cuentas/:cuenta', async (req, res) => {
  res.json(await central.consultarCuenta(req.params.cuenta));
});

// historial de las operaciones hechas en esta sucursal
router.get('/historial', async (req, res) => {
  res.json(await central.historial());
});

// historial de un cliente
router.get('/historial/:cuenta', async (req, res) => {
  res.json(await central.historial(req.params.cuenta));
});

router.get('/reporte', async (req, res) => {
  res.json(await central.reporte());
});

export default router;
