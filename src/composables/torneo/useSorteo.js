import { defineStore } from "pinia";
import api from "../../services/api";

export const useSorteo = defineStore("sorteo", {
  state: () => ({
    loading: false,
    error: null
  }),

  actions: {
    calcularFaseParaEquiposQueJuegan(totalEquipos) {
      // Esta función determina la fase_id para los equipos que JUEGAN en la primera ronda
      // Los equipos que descansan irán a una fase diferente

      if (totalEquipos <= 8) {
        // Para 6-8 equipos: los que juegan están en octavos, van a cuartos
        return 1; // Octavos
      } else {
        // Para 9+ equipos: necesitan octavos para reducir el número
        return 1; // Octavos
      }
    },

    calcularFaseParaEquiposQueDescansan(totalEquipos) {
      // Esta función determina la fase_id para los equipos que DESCANSAN en la primera ronda

      if (totalEquipos <= 8) {
        // Para 6-8 equipos: los que descansan van directo a cuartos
        return 2; // Cuartos
      } else {
        // Para 9+ equipos: configuración más compleja, pero generalmente van a cuartos
        return 2; // Cuartos
      }
    },

    async realizarSorteoAleatorio(equipos) {
      console.log(`🎲 Realizando sorteo aleatorio para ${equipos.length} equipos`);

      // Barajar equipos
      const equiposBarajados = [...equipos].sort(() => Math.random() - 0.5);
      console.log(`🔀 Equipos barajados: (${equiposBarajados.length}) [${equiposBarajados.map(e => e.nombre_equipo + ' (' + e.ciclo + ')').join(', ')}]`);

      const partidos = [];
      let equipoImpar = null;

      // Crear partidos con pares de equipos
      for (let i = 0; i < equiposBarajados.length - 1; i += 2) {
        partidos.push({
          id: `sorteo_${Math.floor(i / 2) + 1}`,
          equipo1: equiposBarajados[i],
          equipo2: equiposBarajados[i + 1],
          ganador: null,
          resultado: { equipo1: 0, equipo2: 0 },
          estado: 'programado',
          fecha: null,
          hora: null,
          lugar: null
        });

        console.log(`🥊 Partido ${Math.floor(i / 2) + 1}: ${equiposBarajados[i].nombre_equipo} (${equiposBarajados[i].ciclo}) vs ${equiposBarajados[i + 1].nombre_equipo} (${equiposBarajados[i + 1].ciclo})`);
      }

      // Manejo del equipo impar
      if (equiposBarajados.length % 2 !== 0) {
        equipoImpar = equiposBarajados[equiposBarajados.length - 1];
        console.log(`👤 Equipo impar que pasa automáticamente: ${equipoImpar.nombre_equipo} (${equipoImpar.ciclo})`);
      }

      return {
        partidos,
        equipoImpar
      };
    }
  }
});