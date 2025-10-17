import { defineStore } from "pinia";
import api from '../services/api';

export const useEquiposApi = defineStore("equiposApi", {
  state: () => ({
    equipos: [],
    todosLosEquipos: [], // Almacena todos los equipos cargados una sola vez
    loading: false,
    error: null,
    deporteSeleccionado: null,

    // Equipos para el torneo (desde partidos.vue)
    equiposParaTorneo: [],

    // Estructura del torneo (gestionado desde partidos.vue)
    torneo: {
      rondas: [],
      equiposIniciales: [],
      campeón: null,
      estado: 'no_iniciado' // no_iniciado, en_progreso, finalizado
    }
  }),

  getters: {
    equiposActivos: (state) => state.equipos.filter(e => e.estado_inscripcion === 'activo'),
    equiposPendientes: (state) => state.equipos.filter(e => e.estado_inscripcion === 'pendiente'),
    equiposValidados: (state) => state.equipos.filter(e => e.estado_inscripcion === 'validado'),

    estadisticas: (state) => ({
      total: state.equipos.length,
      activos: state.equipos.filter(e => e.estado_inscripcion === 'activo').length,
      pendientes: state.equipos.filter(e => e.estado_inscripcion === 'pendiente').length,
      validados: state.equipos.filter(e => e.estado_inscripcion === 'validado').length
    }),

    // Equipos elegibles para torneo (usado por partidos.vue)
    equiposParaSorteo: (state) => state.equipos.filter(e =>
      e.estado_inscripcion === 'validado' || e.estado_inscripcion === 'activo'
    )
  },

  actions: {
    async cargarTodosLosEquipos() {
      // Solo cargar si no hay equipos cargados previamente
      if (this.todosLosEquipos.length > 0) {
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await api.get('/api/admin/equipos');

        // La API devuelve un objeto con claves por deporte, convertirlo a array
        const data = response.data;

        if (Array.isArray(data)) {
          // Si ya es un array, usarlo directamente
          this.todosLosEquipos = data;
        } else if (typeof data === 'object' && data !== null) {
          // Si es un objeto, aplanar todos los arrays
          this.todosLosEquipos = Object.values(data).flat();
        } else {
          console.error('❌ Formato de datos inesperado:', data);
          this.todosLosEquipos = [];
        }

      } catch (error) {
        this.error = error;
        console.error('❌ Error al cargar equipos:', error);
        this.todosLosEquipos = [];
      } finally {
        this.loading = false;
      }
    },

    filtrarPorDeporte(deporte) {
      if (!deporte) {
        this.equipos = [];
        return;
      }

      // Filtrado local, sin llamar al API
      this.equipos = this.todosLosEquipos.filter(
        equipo => equipo.deporte_id === deporte.valor
      );
    },

    seleccionarDeporte(deporte) {
      this.deporteSeleccionado = deporte;
      this.filtrarPorDeporte(deporte);
    },

    reiniciarTorneo() {
      this.torneo = {
        rondas: [],
        equiposIniciales: [],
        campeón: null,
        estado: 'no_iniciado'
      };
    },

    clearError() {
      this.error = null;
    },

    // Método auxiliar para actualizar resultado de partido (usado por partidos.vue)
    actualizarResultadoPartido(rondaIndex, partidoId, resultado, ganadorId) {
      const ronda = this.torneo.rondas[rondaIndex];
      const partido = ronda.partidos.find(p => p.detalle_partido_id === partidoId);

      if (partido) {
        partido.resultado = resultado;
        partido.ganador = ganadorId === partido.equipo1?.id_equipo ? partido.equipo1 : partido.equipo2;
        partido.estado = 'finalizado';
        partido.estado_id = 2;

        // Si es la final, establecer el campeón
        if (ronda.nombre === 'Final' && partido.ganador) {
          this.torneo.campeón = partido.ganador;
          this.torneo.estado = 'finalizado';
        }
      }
    }
  }
});
