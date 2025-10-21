import { defineStore } from "pinia";
import api from "../services/api";

export const usePartidosApi = defineStore("partidosApi", {
  state: () => ({
    torneo: null, 
    equiposParaTorneo: [],
    procesando: null,
    error: null,
    cargando: false,
  }),

  actions: {
    async cargarDatosDeporte(deporteId) {
      this.cargando = true;
      this.error = null;
      try {
        const response = await api.get(`/api/admin/torneo/${deporteId}`);
        const data = response.data;

        this.equiposParaTorneo = data.equipos.filter(e => 
          e.estado_inscripcion === 'validado' || e.estado_inscripcion === 'activo'
        );

        if (data.rondas && data.rondas.length > 0) {
          this.torneo = this._construirTorneoDesdeAPI(data.rondas, data.equipos, deporteId);
        } else {
          this.torneo = null;
        }
        return data;
      } catch (error) {
        this.error = error;
        this.equiposParaTorneo = [];
        this.torneo = null;
        console.error('Error al obtener datos del torneo:', error);
        throw error;
      } finally {
        this.cargando = false;
      }
    },

    _construirTorneoDesdeAPI(rondasData, equiposData, deporteId) {
      const rondas = rondasData.map(rondaAPI => ({
        fase_id: rondaAPI.fase_id,
        nombre: rondaAPI.nombre,
        orden: rondaAPI.orden,
        completada: false,
        partidos: rondaAPI.partidos.map(partidoAPI => ({
          enfrentamiento_id: partidoAPI.detalle_partido_id,
          partido_numero: partidoAPI.numero,
          equipo_1: partidoAPI.equipo_1,
          equipo_2: partidoAPI.equipo_2,
          es_bye: partidoAPI.es_bye,
          estado: partidoAPI.estado,
          resultado: partidoAPI.resultado,
          ganador: partidoAPI.ganador_id 
            ? (partidoAPI.equipo_1?.id === partidoAPI.ganador_id ? partidoAPI.equipo_1 : partidoAPI.equipo_2)
            : null,
        }))
      }));

      rondas.forEach((ronda, index) => {
        const allPartidosFinalizados = ronda.partidos.every(p => p.estado === 'jugado' || p.es_bye);
        if (allPartidosFinalizados && index < rondas.length - 1) {
          ronda.completada = true;
        }
      });

      const equiposIniciales = equiposData.map(e => ({ id: e.id_equipo, nombre: e.nombre_equipo }));

      let campeon = null;
      let estadoTorneo = 'en_progreso';

      const rondaFinal = rondas.find(r => r.fase_id === 4);
      if (rondaFinal && rondaFinal.partidos.length === 1) {
        const partidoFinal = rondaFinal.partidos[0];
        if (partidoFinal.estado === 'jugado' && partidoFinal.ganador) {
          campeon = partidoFinal.ganador;
          estadoTorneo = 'finalizado';
        }
      }

      return {
        deporteId: deporteId,
        rondas,
        equiposIniciales,
        campeon: campeon,
        estado: estadoTorneo
      };
    },

    async generarTorneo(deporteId, equipos) {
      this.cargando = true;
      this.error = null;
      try {
        await api.post('/api/admin/torneo/generar', { deporteId, equipos });
        await this.cargarDatosDeporte(deporteId);
      } catch (error) {
        this.error = error;
        console.error('Error al generar torneo:', error);
        throw error;
      } finally {
        this.cargando = false;
      }
    },

    async avanzarRonda(deporteId, faseActualId) {
      this.cargando = true;
      this.error = null;
      try {
        const response = await api.post('/api/admin/torneo/avanzar-ronda', { deporteId, faseActualId });
        if (response.data.torneo_finalizado) {
            this.torneo.campeon = response.data.campeon;
            this.torneo.estado = 'finalizado';
        } else {
            await this.cargarDatosDeporte(deporteId);
        }
        return response.data;
      } catch (error) {
        this.error = error;
        console.error('Error al avanzar ronda:', error);
        throw error;
      } finally {
        this.cargando = false;
      }
    },

    async finalizarPartido(detalle_partido_id, fase_id, puntos_equipo_1, puntos_equipo_2, ganador_id, perdedor_id) {
      this.procesando = detalle_partido_id;
      this.error = null;
      try {
        await api.patch(
          `/api/admin/torneo/enfrentamientos/${detalle_partido_id}/partido`,
          { estado: "finalizado", fase_id, puntos_equipo_1, puntos_equipo_2, ganador_id, perdedor_id }
        );
        if(this.torneo?.deporteId) {
          await this.cargarDatosDeporte(this.torneo.deporteId);
        }
      } catch (error) {
        this.error = error;
        console.error("Error al finalizar partido:", error);
        throw error;
      } finally {
        this.procesando = null;
      }
    },

    async reiniciarTorneo(deporteId) {
      this.cargando = true;
      this.error = null;
      try {
        await api.delete(`/api/admin/torneo/${deporteId}`);
        this.torneo = null;
        await this.cargarDatosDeporte(deporteId);
      } catch (error) {
        this.error = error;
        console.error('Error al reiniciar torneo:', error);
        throw error;
      } finally {
        this.cargando = false;
      }
    },
  },
});
