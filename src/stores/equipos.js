import { defineStore } from "pinia";
import api from '../services/api';

const toRoman = (num) => {
  const map = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let result = '';
  for (let key in map) {
    while (num >= map[key]) {
      result += key;
      num -= map[key];
    }
  }
  return result;
};

export const useEquiposApi = defineStore("equiposApi", {
  state: () => ({
    equipos: [],
    todosLosEquipos: [],
    loading: false,
    error: null,
    deporteSeleccionado: null,
    cicloSeleccionado: null,
    seccionSeleccionada: null,

    equiposParaTorneo: [],
    torneo: {
      rondas: [],
      equiposIniciales: [],
      campeón: null,
      estado: 'no_iniciado'
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
    equiposParaSorteo: (state) => state.equipos.filter(e =>
      e.estado_inscripcion === 'validado' || e.estado_inscripcion === 'activo'
    )
  },

  actions: {
    async cargarTodosLosEquipos() {
      if (this.todosLosEquipos.length > 0) return;
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get('/api/admin/equipos');
        const data = response.data;
        if (typeof data === 'object' && data !== null) {
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

      let equiposFiltrados = this.todosLosEquipos.filter(
        item => item.deporte_id === deporte.valor
      );

      if (this.cicloSeleccionado) {
        const cicloRomano = toRoman(this.cicloSeleccionado);
        equiposFiltrados = equiposFiltrados.filter(item => item.ciclo === cicloRomano);
      }

      if (this.seccionSeleccionada) {
        equiposFiltrados = equiposFiltrados.filter(item => item.seccion === this.seccionSeleccionada);
      }

      this.equipos = equiposFiltrados;
    },

    seleccionarDeporte(deporte) {
      this.deporteSeleccionado = deporte;
      this.filtrarPorDeporte(deporte);
    },

    setFiltros(filtros) {
      this.cicloSeleccionado = filtros.ciclo;
      this.seccionSeleccionada = filtros.seccion;
      this.filtrarPorDeporte(this.deporteSeleccionado);
    },

    reiniciarTorneo() {
      this.torneo = { rondas: [], equiposIniciales: [], campeón: null, estado: 'no_iniciado' };
    },

    clearError() {
      this.error = null;
    },

    actualizarResultadoPartido(rondaIndex, partidoId, resultado, ganadorId) {
      const ronda = this.torneo.rondas[rondaIndex];
      const partido = ronda.partidos.find(p => p.detalle_partido_id === partidoId);
      if (partido) {
        partido.resultado = resultado;
        partido.ganador = ganadorId === partido.equipo1?.id_equipo ? partido.equipo1 : partido.equipo2;
        partido.estado = 'finalizado';
        partido.estado_id = 2;
        if (ronda.nombre === 'Final' && partido.ganador) {
          this.torneo.campeón = partido.ganador;
          this.torneo.estado = 'finalizado';
        }
      }
    }
  }
});
