// Exportar todos los composables de torneo
export { useTorneo } from './useTorneo.js';
export { useSorteo } from './useSorteo.js';
export { useEstructuraTorneo } from './useEstructuraTorneo.js';
export { useEquiposApi } from './useEquiposApi.js';

// Composable principal que combina toda la funcionalidad
import { defineStore } from "pinia";
import { useTorneo } from './useTorneo.js';
import { useSorteo } from './useSorteo.js';
import { useEstructuraTorneo } from './useEstructuraTorneo.js';
import { useEquiposApi } from './useEquiposApi.js';

export const useEquiposMain = defineStore("equiposMain", {
  state: () => ({
    // Estado combinado se maneja en los composables individuales
  }),

  getters: {
    // Acceso a los stores individuales
    torneo: () => useTorneo(),
    sorteo: () => useSorteo(),
    estructura: () => useEstructuraTorneo(),
    equiposApi: () => useEquiposApi()
  },

  actions: {
    // Métodos principales que coordinan entre composables
    async realizarSorteoCompleto(equipos) {
      const torneoStore = this.torneo;
      const sorteoStore = this.sorteo;
      const estructuraStore = this.estructura;

      try {
        console.log('🏆 INICIANDO SORTEO COMPLETO');

        // 1. Calcular estructura del torneo
        const config = estructuraStore.calcularEstructuraTorneo(equipos);

        // 2. Realizar sorteo
        const resultadoSorteo = await sorteoStore.realizarSorteoAleatorio(equipos);

        // 3. Actualizar estado del torneo
        torneoStore.equiposParaSorteo = equipos;
        torneoStore.enfrentamientos = resultadoSorteo.partidos;
        torneoStore.equipoFinalista = resultadoSorteo.equipoImpar;

        return {
          success: true,
          config,
          partidos: resultadoSorteo.partidos,
          equipoImpar: resultadoSorteo.equipoImpar
        };
      } catch (error) {
        console.error('Error en sorteo completo:', error);
        throw error;
      }
    },

    async cargarDatosDeporte(deporteId) {
      const equiposApi = this.equiposApi;
      const torneoStore = this.torneo;

      try {
        // Cargar equipos y enfrentamientos
        const [equipos, enfrentamientos] = await Promise.all([
          equiposApi.cargarEquiposPorDeporte(deporteId),
          equiposApi.cargarEnfrentamientosExistentes(deporteId)
        ]);

        // Actualizar estado
        torneoStore.tieneEnfrentamientosGuardados = enfrentamientos.length > 0;

        return { equipos, enfrentamientos };
      } catch (error) {
        console.error('Error al cargar datos del deporte:', error);
        throw error;
      }
    }
  }
});