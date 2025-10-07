import { defineStore } from "pinia";
import api from "../services/api";

// Importar composables
import {
  useTorneo,
  useSorteo,
  useEstructuraTorneo,
  useEquiposApi
} from "../composables/torneo/index.js";

export const useEquiposApi = defineStore("equipos", {
  state: () => ({
    // Estados básicos
    equiposParaSorteo: [],
    enfrentamientos: [],
    equipoFinalista: null,
    loading: false,
    error: null,

    // Estado del torneo
    torneo: {
      rondas: [],
      equiposIniciales: [],
      campeón: null,
      estado: 'no_iniciado'
    },

    // Estado de enfrentamientos
    tieneEnfrentamientosGuardados: false
  }),

  getters: {
    // Acceso a composables
    torneoStore: () => useTorneo(),
    sorteoStore: () => useSorteo(),
    estructuraStore: () => useEstructuraTorneo(),
    equiposApiStore: () => useEquiposApi(),

    // Getters existentes
    obtenerNombreFase: (state) => (faseId) => {
      const fases = {
        1: 'Octavos',
        2: 'Cuartos',
        3: 'Semifinal',
        4: 'Final'
      };
      return fases[faseId] || `Fase ${faseId}`;
    }
  },

  actions: {
    // ========================================
    // MÉTODOS DE CARGA DE DATOS
    // ========================================
    async cargarEquiposPorDeporte(deporteId) {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get(`/api/admin/equipos/deporte/${deporteId}`);
        this.equiposParaSorteo = response.data;
        console.log(`✅ Cargados ${this.equiposParaSorteo.length} equipos para deporte ${deporteId}`);

        // Verificar si hay enfrentamientos guardados
        await this.verificarEnfrentamientosExistentes(deporteId);

        return this.equiposParaSorteo;
      } catch (error) {
        this.error = error;
        console.error('Error al cargar equipos:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async verificarEnfrentamientosExistentes(deporteId) {
      try {
        const response = await api.get(`/api/admin/equipos/enfrentamientos/${deporteId}`);
        this.tieneEnfrentamientosGuardados = response.data.length > 0;

        if (this.tieneEnfrentamientosGuardados) {
          await this.construirTorneoDesdeAPI(response.data);
        }
      } catch (error) {
        console.error('Error al verificar enfrentamientos:', error);
        this.tieneEnfrentamientosGuardados = false;
      }
    },

    async cargarEnfrentamientosExistentes(deporteId) {
      try {
        const response = await api.get(`/api/admin/equipos/enfrentamientos/${deporteId}`);
        await this.construirTorneoDesdeAPI(response.data);
        return response.data;
      } catch (error) {
        console.error('Error al cargar enfrentamientos:', error);
        throw error;
      }
    },

    // ========================================
    // MÉTODOS DE SORTEO (usando composables)
    // ========================================
    async realizarSorteo() {
      if (this.equiposParaSorteo.length === 0) {
        throw new Error('No hay equipos disponibles para el sorteo');
      }

      console.log('🏆 INICIANDO SORTEO:', this.equiposParaSorteo.length, 'equipos');

      try {
        // Usar composables para la lógica
        const config = this.estructuraStore.calcularEstructuraTorneo(this.equiposParaSorteo);
        const resultadoSorteo = await this.realizarEmparejamiento(config);

        this.torneo = resultadoSorteo.torneo;
        this.enfrentamientos = resultadoSorteo.partidos;
        this.equipoFinalista = resultadoSorteo.equipoImpar;

        console.log('✅ Sorteo realizado exitosamente');
        return { success: true, torneo: this.torneo };
      } catch (error) {
        this.error = error;
        console.error('Error en sorteo:', error);
        throw error;
      }
    },

    async realizarEmparejamiento(config) {
      // Delegar la lógica compleja a métodos más simples
      if (config.totalEquipos === 9 || config.totalEquipos === 10) {
        return await this.realizarEmparejamientoEspecial(config);
      } else {
        return await this.sorteoStore.realizarSorteoAleatorio(this.equiposParaSorteo);
      }
    },

    // ========================================
    // MÉTODOS DE GUARDADO (simplificados)
    // ========================================
    async guardarSorteo() {
      if (this.tieneEnfrentamientosGuardados) {
        throw new Error('Ya existen enfrentamientos guardados para este deporte. Elimínalos primero si deseas crear nuevos.');
      }

      console.log(`💾 INICIANDO GUARDADO DE SORTEO`);
      this.loading = true;
      this.error = null;

      try {
        const totalEquipos = this.equiposParaSorteo.length;
        const faseParaEquiposQueJuegan = this.sorteoStore.calcularFaseParaEquiposQueJuegan(totalEquipos);
        const faseParaEquiposQueDescansan = this.sorteoStore.calcularFaseParaEquiposQueDescansan(totalEquipos);

        // Guardar partidos
        await this.guardarPartidos(faseParaEquiposQueJuegan);

        // Guardar equipos que descansan
        await this.guardarEquiposQueDescansan(faseParaEquiposQueDescansan);

        console.log('✅ SORTEO GUARDADO EXITOSAMENTE');
        this.tieneEnfrentamientosGuardados = true;

        return { success: true, message: 'Sorteo guardado exitosamente' };
      } catch (error) {
        console.error('Error al guardar sorteo:', error);
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async guardarPartidos(faseId) {
      const primeraRonda = this.torneo.rondas[0];
      if (!primeraRonda) return;

      console.log(`🥊 GUARDANDO PARTIDOS (${primeraRonda.partidos.length} partidos):`);

      for (const [index, partido] of primeraRonda.partidos.entries()) {
        console.log(`   ${index + 1}. ${partido.equipo1.nombre_equipo} vs ${partido.equipo2.nombre_equipo} → fase_id: ${faseId}`);

        await api.post('/api/admin/equipos/enfrentamiento', {
          primerId: partido.equipo1.id_equipo,
          segundoId: partido.equipo2.id_equipo,
          fase_id: faseId
        });
      }
    },

    async guardarEquiposQueDescansan(faseId) {
      // Lógica simplificada para guardar equipos que descansan
      const primeraRonda = this.torneo.rondas[0];
      if (!primeraRonda?.equiposQueDescansan) return;

      console.log(`😴 GUARDANDO EQUIPOS QUE DESCANSAN (${primeraRonda.equiposQueDescansan.length} equipos):`);

      for (const [index, equipo] of primeraRonda.equiposQueDescansan.entries()) {
        console.log(`   ${index + 1}. ${equipo.nombre_equipo} (sin oponente) → fase_id: ${faseId}`);

        await api.post('/api/admin/equipos/enfrentamiento', {
          primerId: equipo.id_equipo,
          segundoId: null,
          fase_id: faseId
        });
      }
    },

    // ========================================
    // MÉTODOS DE AVANCE DE RONDA (simplificados)
    // ========================================
    async completarFaseConGanadores(rondaIndex, deporteId) {
      console.log(`🔄 COMPLETANDO FASE: Ronda ${rondaIndex} para deporte ${deporteId}`);

      try {
        const rondaActual = this.torneo.rondas[rondaIndex];
        if (!rondaActual) throw new Error('Ronda no encontrada');

        // Obtener ganadores y equipos que descansan
        const partidosFinalizados = rondaActual.partidos.filter(p => p.estado === 'finalizado');
        const ganadores = partidosFinalizados.map(p => p.ganador).filter(g => g !== null);
        const equiposQueDescansan = rondaActual.equiposQueDescansan || [];
        const equiposParaSiguienteFase = [...ganadores, ...equiposQueDescansan];

        // Calcular siguiente fase
        const siguienteFaseId = this.calcularSiguienteFase(rondaActual.nombre);

        // Guardar en API
        for (const equipo of equiposParaSiguienteFase) {
          await api.post('/api/admin/equipos/enfrentamiento', {
            primerId: equipo.id_equipo,
            segundoId: null,
            fase_id: siguienteFaseId
          });
        }

        rondaActual.completada = true;
        console.log(`✅ FASE COMPLETADA: ${equiposParaSiguienteFase.length} equipos avanzaron`);

        return { success: true, message: `Fase completada exitosamente` };
      } catch (error) {
        console.error('Error al completar fase:', error);
        throw error;
      }
    },

    calcularSiguienteFase(nombreRondaActual) {
      const mapeoFases = {
        'Previa': 2,
        'Octavos': 2,
        'Cuartos': 3,
        'Semifinal': 4
      };
      return mapeoFases[nombreRondaActual] || 2;
    },

    // ========================================
    // MÉTODOS DE UTILIDAD
    // ========================================
    limpiarEnfrentamientosGuardados() {
      this.tieneEnfrentamientosGuardados = false;
      this.torneo = {
        rondas: [],
        equiposIniciales: [],
        campeón: null,
        estado: 'no_iniciado'
      };
    },

    reiniciarTorneo() {
      this.torneoStore.reiniciarTorneo();
    },

    // Métodos heredados que necesitan mantenerse por compatibilidad
    async construirTorneoDesdeAPI(enfrentamientos) {
      // Implementación simplificada
      console.log('🔄 Construyendo torneo desde API con', enfrentamientos.length, 'enfrentamientos');
      // TODO: Implementar construcción desde API
    },

    async realizarEmparejamientoEspecial(config) {
      // Implementación simplificada para casos especiales
      return await this.sorteoStore.realizarSorteoAleatorio(this.equiposParaSorteo);
    }
  }
});