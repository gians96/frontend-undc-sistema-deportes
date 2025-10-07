import { defineStore } from "pinia";
import api from '../services/api';

export const useEquiposApi = defineStore("equiposApi", {
  state: () => ({
    equipos: [],
    loading: false,
    error: null,
    deporteSeleccionado: null,
    vistaActual: 'equipos',

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
    async cargarEquiposPorDeporte(idDeporte) {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get(`/api/admin/equipos/${idDeporte}`);
        this.equipos = response.data;
        console.log('✅ Equipos cargados:', this.equipos.length);
      } catch (error) {
        this.error = error;
        console.error('❌ Error al cargar equipos:', error);
      } finally {
        this.loading = false;
      }
    },

    seleccionarDeporte(deporte) {
      this.deporteSeleccionado = deporte;
      this.vistaActual = 'equipos';
      return this.cargarEquiposPorDeporte(deporte.valor);
    },

    cambiarVista(vista) {
      this.vistaActual = vista;
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
