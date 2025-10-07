import { defineStore } from "pinia";
import api from "../services/api";

export const usePartidosApi = defineStore("partidosApi", {
  state: () => ({
    partidos: [],
    torneo: { estado: 'no_iniciado', rondas: [], equiposIniciales: [], campeón: null },
    equiposParaTorneo: [],
    estadosValidos: ["en_progreso", "finalizado", "modificar"],
    procesando: null, // ID del partido que se está procesando
    error: null,
    cargando: false,
  }),

  actions: {
    async obtenerTorneo(deporteId) {
      this.cargando = true;
      this.error = null;

      try {
        const response = await api.get(`/api/admin/torneo/${deporteId}`);
        const data = response.data;

        // Filtrar solo equipos validados para el torneo
        this.equiposParaTorneo = data.equipos.filter(e =>
          e.estado_inscripcion === 'validado' || e.estado_inscripcion === 'activo'
        );

        // Si hay enfrentamientos, construir torneo desde la API
        if (data.enfrentamientos && data.enfrentamientos.length > 0) {
          this.torneo = this._construirTorneoDesdeAPI(data.enfrentamientos, data.equipos);
          this.torneo.estado = 'en_progreso';
        } else {
          // No hay torneo generado aún
          this.torneo = { estado: 'no_iniciado', rondas: [], equiposIniciales: [], campeón: null };
        }

        return data;
      } catch (error) {
        this.error = error;
        console.error('Error al obtener torneo:', error);
        this.equiposParaTorneo = [];
        this.torneo = { estado: 'no_iniciado', rondas: [], equiposIniciales: [], campeón: null };
        throw error;
      } finally {
        this.cargando = false;
      }
    },

    async generarTorneo(deporteId, equipos) {
      this.cargando = true;
      this.error = null;

      try {
        const response = await api.post('/api/admin/torneo/generar', {
          deporteId,
          equipos
        });

        const torneoGenerado = response.data.torneo;

        // Mapear rondas de la API al formato del store
        const rondas = torneoGenerado.rondas.map(ronda => ({
          nombre: ronda.nombre,
          fase_id: ronda.fase_id,
          fase_orden: ronda.orden,
          partidos: ronda.partidos.map(partido => ({
            id: `partido_${partido.enfrentamiento_id}`,
            detalle_partido_id: partido.enfrentamiento_id,
            equipo_1_id: partido.equipo_1.id,
            equipo_1_nombre: partido.equipo_1.nombre,
            equipo_1_ciclo: partido.equipo_1.ciclo,
            equipo_2_id: partido.equipo_2?.id || null,
            equipo_2_nombre: partido.equipo_2?.nombre || null,
            equipo_2_ciclo: partido.equipo_2?.ciclo || null,
            equipo1: {
              id_equipo: partido.equipo_1.id,
              nombre_equipo: partido.equipo_1.nombre,
              ciclo: partido.equipo_1.ciclo
            },
            equipo2: partido.equipo_2 ? {
              id_equipo: partido.equipo_2.id,
              nombre_equipo: partido.equipo_2.nombre,
              ciclo: partido.equipo_2.ciclo
            } : null,
            resultado: { equipo1: 0, equipo2: 0 },
            ganador: partido.es_bye ? {
              id_equipo: partido.equipo_1.id,
              nombre_equipo: partido.equipo_1.nombre,
              ciclo: partido.equipo_1.ciclo
            } : null,
            estado: partido.es_bye ? 'finalizado' : 'programado',
            estado_id: partido.es_bye ? 2 : 1,
            fase_id: ronda.fase_id,
            partido_numero: partido.partido_numero,
            es_bye: partido.es_bye || false
          })),
          equiposQueDescansan: [],
          completada: false
        }));

        // Actualizar el store con el torneo generado
        this.torneo = {
          rondas,
          equiposIniciales: [...equipos],
          campeón: null,
          estado: 'en_progreso'
        };

        return response.data;
      } catch (error) {
        this.error = error;
        console.error('Error al generar torneo:', error);
        throw error;
      } finally {
        this.cargando = false;
      }
    },

    async reiniciarTorneo(deporteId) {
      this.cargando = true;
      this.error = null;

      try {
        await api.delete(`/api/admin/torneo/${deporteId}`);

        // Reiniciar estado local
        this.torneo = {
          rondas: [],
          equiposIniciales: [],
          campeón: null,
          estado: 'no_iniciado'
        };

        return true;
      } catch (error) {
        this.error = error;
        console.error('Error al reiniciar torneo:', error);
        throw error;
      } finally {
        this.cargando = false;
      }
    },

    async avanzarRonda(deporteId, faseActualId) {
      this.cargando = true;
      this.error = null;

      try {
        const response = await api.post('/api/admin/torneo/avanzar-ronda', {
          deporteId,
          faseActualId
        });

        return response.data;
      } catch (error) {
        this.error = error;
        console.error('Error al avanzar ronda:', error);
        throw error;
      } finally {
        this.cargando = false;
      }
    },

    _construirTorneoDesdeAPI(enfrentamientos, equipos) {
      const fasesPorId = {};

      enfrentamientos.forEach(enfrentamiento => {
        const faseKey = enfrentamiento.fase_orden || 0;
        const faseId = enfrentamiento.fase_id || 5;

        if (!fasesPorId[faseKey]) {
          fasesPorId[faseKey] = {
            nombre: enfrentamiento.fase_nombre || `Fase ${faseKey}`,
            fase_orden: faseKey,
            fase_id: faseId,
            partidos: [],
            equiposQueDescansan: []
          };
        }

        fasesPorId[faseKey].partidos.push({
          id: `partido_${enfrentamiento.enfrentamiento_id}`,
          detalle_partido_id: enfrentamiento.enfrentamiento_id,
          equipo_1_id: enfrentamiento.equipo_1.id,
          equipo_1_nombre: enfrentamiento.equipo_1.nombre,
          equipo_1_ciclo: enfrentamiento.equipo_1.ciclo,
          equipo_2_id: enfrentamiento.equipo_2?.id || null,
          equipo_2_nombre: enfrentamiento.equipo_2?.nombre || null,
          equipo_2_ciclo: enfrentamiento.equipo_2?.ciclo || null,
          equipo1: {
            id_equipo: enfrentamiento.equipo_1.id,
            nombre_equipo: enfrentamiento.equipo_1.nombre,
            ciclo: enfrentamiento.equipo_1.ciclo
          },
          equipo2: enfrentamiento.equipo_2 ? {
            id_equipo: enfrentamiento.equipo_2.id,
            nombre_equipo: enfrentamiento.equipo_2.nombre,
            ciclo: enfrentamiento.equipo_2.ciclo
          } : null,
          resultado: {
            equipo1: enfrentamiento.resultado?.puntos_equipo_1 || 0,
            equipo2: enfrentamiento.resultado?.puntos_equipo_2 || 0
          },
          ganador: enfrentamiento.ganador_id ? (
            enfrentamiento.ganador_id === enfrentamiento.equipo_1.id
              ? { id_equipo: enfrentamiento.equipo_1.id, nombre_equipo: enfrentamiento.equipo_1.nombre, ciclo: enfrentamiento.equipo_1.ciclo }
              : { id_equipo: enfrentamiento.equipo_2.id, nombre_equipo: enfrentamiento.equipo_2.nombre, ciclo: enfrentamiento.equipo_2.ciclo }
          ) : null,
          estado: enfrentamiento.estado_id === 1 ? 'programado' :
                  enfrentamiento.estado_id === 5 ? 'en_curso' :
                  enfrentamiento.estado_id === 2 ? 'finalizado' : 'programado',
          estado_id: enfrentamiento.estado_id,
          fase_id: faseId,
          partido_numero: enfrentamiento.partido_numero,
          es_bye: !enfrentamiento.equipo_2
        });
      });

      const rondas = Object.values(fasesPorId).sort((a, b) => a.fase_orden - b.fase_orden);

      rondas.forEach((ronda, index) => {
        const siguienteRonda = rondas[index + 1];
        ronda.completada = siguienteRonda && siguienteRonda.partidos.length > 0;
      });

      const equiposIniciales = [];
      const equiposSet = new Set();

      enfrentamientos.forEach(enf => {
        if (!equiposSet.has(enf.equipo_1.id)) {
          equiposSet.add(enf.equipo_1.id);
          equiposIniciales.push({
            id_equipo: enf.equipo_1.id,
            nombre_equipo: enf.equipo_1.nombre,
            ciclo: enf.equipo_1.ciclo
          });
        }
        if (enf.equipo_2 && !equiposSet.has(enf.equipo_2.id)) {
          equiposSet.add(enf.equipo_2.id);
          equiposIniciales.push({
            id_equipo: enf.equipo_2.id,
            nombre_equipo: enf.equipo_2.nombre,
            ciclo: enf.equipo_2.ciclo
          });
        }
      });

      return {
        rondas,
        equiposIniciales,
        campeón: null,
        estado: 'en_progreso'
      };
    },
    async iniciarPartido(detalle_partido_id, fase_id) {
      this.procesando = detalle_partido_id;
      this.error = null;

      try {
        const response = await api.patch(
          `/api/admin/equipos/enfrentamientos/${detalle_partido_id}/partido`,
          {
            estado: "en_progreso",
            fase_id
          }
        );

        return response.data;
      } catch (error) {
        this.error = error;
        console.error("Error al iniciar partido:", error);
        throw error;
      } finally {
        this.procesando = null;
      }
    },

    async finalizarPartido(detalle_partido_id, fase_id, puntos_equipo_1, puntos_equipo_2, ganador_id, perdedor_id) {
      this.procesando = detalle_partido_id;
      this.error = null;

      try {
        const response = await api.patch(
          `/api/admin/equipos/enfrentamientos/${detalle_partido_id}/partido`,
          {
            estado: "finalizado",
            fase_id,
            puntos_equipo_1,
            puntos_equipo_2,
            ganador_id,
            perdedor_id
          }
        );

        return response.data;
      } catch (error) {
        this.error = error;
        console.error("Error al finalizar partido:", error);
        throw error;
      } finally {
        this.procesando = null;
      }
    },

    async modificarResultado(detalle_partido_id, puntos_equipo_1, puntos_equipo_2, ganador_id) {
      this.procesando = detalle_partido_id;
      this.error = null;

      try {
        const response = await api.patch(
          `/api/admin/equipos/enfrentamientos/${detalle_partido_id}/partido`,
          {
            estado: "modificar",
            puntos_equipo_1,
            puntos_equipo_2,
            ganador_id
          }
        );

        return response.data;
      } catch (error) {
        this.error = error;
        console.error("Error al modificar resultado:", error);
        throw error;
      } finally {
        this.procesando = null;
      }
    },

    clearError() {
      this.error = null;
    },

    clearProcesando() {
      this.procesando = null;
    }
  },
});
