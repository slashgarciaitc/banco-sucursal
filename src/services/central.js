import { createClient } from '@supabase/supabase-js';
import { config } from '../config.js';

const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);

async function llamar(funcion, parametros = {}) {
  const { data, error, status } = await supabase.rpc(funcion, {
    p_api_key: config.apiKey,
    ...parametros,
  });
  if (error) {
    const err = new Error(error.message);
    err.status = status || 503;
    throw err;
  }
  return data;
}

export const infoSucursal = () => llamar('info_nodo');

export const crearCuenta = (titular, saldoInicial) =>
  llamar('crear_cuenta', { p_titular: titular, p_saldo_inicial: saldoInicial });

export const consultarCuenta = (cuenta) =>
  llamar('consultar_saldo', { p_numero_cuenta: cuenta });

export const historial = (cuenta = null) =>
  llamar('historial', { p_numero_cuenta: cuenta });

export const reporte = () => llamar('reporte_nodo');
