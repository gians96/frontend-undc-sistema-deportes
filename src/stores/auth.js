// src/stores/auth.js
import { cerrarSesion, iniciarSesion, verificarSesion } from '@/apis/auth.api';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    usuario: null,
    isLoggedIn: false,
    cargando: false,
    error: null,
  }),

  actions: {
    async iniciarSesion(credenciales) {
      this.cargando = true;
      this.error = null;

      try {
        const data = await iniciarSesion(credenciales);
        this.usuario = data.usuario;
        this.isLoggedIn = true;
        return true;
      } catch (error) {
        this.error = error.response?.data?.mensaje || 'Error al iniciar sesión';
        this.isLoggedIn = false;
        return false;
      } finally {
        this.cargando = false;
      }
    },

    async cerrarSesion() {
      try {
        await cerrarSesion();
      } catch (e) {
        console.warn('Error al cerrar sesión:', e);
      } finally {
        this.usuario = null;
        this.isLoggedIn = false;
      }
    },

    async verificarSesion() {
      try {
        const data = await verificarSesion();
        this.usuario = data.usuario;
        this.isLoggedIn = true;
        return true;
      } catch (error) {
        console.warn('Error al verificar sesión:', error);
        this.usuario = null;
        this.isLoggedIn = false;
        return false;
      }
    },
  },
});
