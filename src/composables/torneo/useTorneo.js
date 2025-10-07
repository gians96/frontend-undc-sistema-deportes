import { defineStore } from "pinia";
import api from "../../services/api";

export const useTorneo = defineStore("torneo", {
  state: () => ({
    torneo: {
      rondas: [],
      equiposIniciales: [],
      campeón: null,
      estado: 'no_iniciado'
    },
    loading: false,
    error: null,
    tieneEnfrentamientosGuardados: false,
    equiposParaSorteo: [],
    equipoFinalista: null,
    enfrentamientos: []
  }),

  getters: {
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
    reiniciarTorneo() {
      this.torneo = {
        rondas: [],
        equiposIniciales: [],
        campeón: null,
        estado: 'no_iniciado'
      };
    },

    actualizarResultadoPartido(rondaIndex, partidoId, resultado, ganadorId) {
      const ronda = this.torneo.rondas[rondaIndex];
      const partido = ronda.partidos.find(p => p.id === partidoId);

      if (partido) {
        partido.resultado = resultado;
        partido.ganador = ganadorId === partido.equipo1?.id_equipo ? partido.equipo1 : partido.equipo2;
        partido.estado = 'finalizado';

        // Si es la final, establecer el campeón
        if (ronda.nombre === 'Final' && partido.ganador) {
          this.torneo.campeón = partido.ganador;
          this.torneo.estado = 'finalizado';
        }
      }
    }
  }
});