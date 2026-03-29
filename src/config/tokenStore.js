/**
 * Almacén en memoria del JWT token.
 *
 * api.js lo lee de forma SÍNCRONA en cada request (sin overhead de AsyncStorage).
 * AuthContext es responsable de poblarlo al cargar y limpiarlo al hacer logout.
 */

let _token = null;
let _onExpiredCallback = null;

/** Guarda el token en memoria luego del login */
export const setToken = (token) => {
  _token = token;
};

/** Devuelve el token actual (null si no hay sesión) */
export const getToken = () => _token;

/** Limpia el token en memoria */
export const clearToken = () => {
  _token = null;
};

/**
 * AuthContext registra aquí su función de logout.
 * Cuando api.js recibe un 401 llama a triggerTokenExpired()
 * y el usuario es deslogueado automáticamente.
 */
export const onTokenExpired = (callback) => {
  _onExpiredCallback = callback;
};

export const triggerTokenExpired = () => {
  clearToken();
  if (_onExpiredCallback) _onExpiredCallback();
};
