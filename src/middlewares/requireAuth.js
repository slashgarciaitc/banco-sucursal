import { usuarioDelToken } from '../services/auth.service.js';

// revisa el token de Supabase que manda la página en Authorization: Bearer
export async function requireAuth(req, res, next) {
  const token = (req.get('Authorization') ?? '').replace('Bearer ', '');
  const usuario = token ? await usuarioDelToken(token) : null;

  if (!usuario) {
    return res.status(401).json({ error: 'Inicia sesión para continuar' });
  }
  req.usuario = usuario;
  next();
}
