import { createClient } from '@supabase/supabase-js';
import { config } from '../config.js';

function cliente() {
  return createClient(config.supabaseUrl, config.supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function login(email, password) {
  const { data, error } = await cliente().auth.signInWithPassword({ email, password });
  if (error) {
    const err = new Error('Correo o contraseña incorrectos');
    err.status = 401;
    throw err;
  }
  return { token: data.session.access_token, email: data.user.email };
}

export async function usuarioDelToken(token) {
  const { data, error } = await cliente().auth.getUser(token);
  return error ? null : data.user;
}
