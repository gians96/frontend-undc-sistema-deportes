import api from "@/services/api.js";

// Login
export const iniciarSesion = async (credenciales) => {
  // withCredentials ya no es necesario aquí, está en la instancia 'api'
  const response = await api.post("/api/admin/auth/login", credenciales);
  return response.data;
};

// Logout
export const cerrarSesion = async () => {
  // withCredentials ya no es necesario aquí
  const response = await api.post("/api/admin/auth/logout", {});
  return response.data;
};

// Verificar sesión
export const verificarSesion = async () => {
  // withCredentials ya no es necesario aquí
  const response = await api.get("/api/admin/auth");
  return response.data;
};
