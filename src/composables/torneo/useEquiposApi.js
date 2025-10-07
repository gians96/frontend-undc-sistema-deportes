import { defineStore } from "pinia";
import api from "../../services/api";

export const useEquiposApi = defineStore("equiposApi", {
  state: () => ({
    equipos: [],
    loading: false,
    error: null
  }),

  actions: {
    async cargarEquiposPorDeporte(deporteId) {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get(`/api/admin/equipos/deporte/${deporteId}`);
        this.equipos = response.data;
        console.log(`✅ Cargados ${this.equipos.length} equipos para deporte ${deporteId}`);
        return this.equipos;
      } catch (error) {
        this.error = error;
        console.error('Error al cargar equipos:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async cargarEnfrentamientosExistentes(deporteId) {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get(`/api/admin/equipos/enfrentamientos/${deporteId}`);
        console.log(`✅ Enfrentamientos cargados para deporte ${deporteId}:`, response.data);
        return response.data;
      } catch (error) {
        this.error = error;
        console.error('Error al cargar enfrentamientos:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async limpiarEnfrentamientosGuardados() {
      try {
        // Implementar limpieza si es necesario
        console.log('🧹 Limpiando enfrentamientos guardados');
      } catch (error) {
        console.error('Error al limpiar enfrentamientos:', error);
        throw error;
      }
    },

    async guardarEnfrentamiento(primerId, segundoId, faseId) {
      try {
        const response = await api.post('/api/admin/equipos/enfrentamiento', {
          primerId,
          segundoId,
          fase_id: faseId
        });
        return response.data;
      } catch (error) {
        console.error('Error al guardar enfrentamiento:', error);
        throw error;
      }
    }
  }
});