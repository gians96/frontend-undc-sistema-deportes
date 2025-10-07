import axios from "axios";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Aplicar withCredentials globalmente a toda la instancia
  withCredentials: true,
});

// Interceptor de seguridad para manejar 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el error es un 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // Se usa setTimeout para asegurar que Pinia y Vue Router están inicializados
      setTimeout(() => {
        const authStore = useAuthStore();
        const currentRoute = router.currentRoute.value;

        // Limpiar la store y forzar el estado de no logueado
        authStore.usuario = null;
        authStore.isLoggedIn = false;

        // Solo redirigir al login si la ruta actual requiere autenticación
        if (currentRoute.meta.requiresAuth && currentRoute.name !== "Login") {
          router.push({ name: "Login" });
        }
      }, 0);
    }
    return Promise.reject(error);
  }
);

export default api;
