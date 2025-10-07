import { defineStore } from "pinia";

export const useEstructuraTorneo = defineStore("estructuraTorneo", {
  actions: {
    calcularEnfrentamientosPredeterminados(equiposQueDescansan, totalEquipos) {
      console.log(`🔮 Calculando enfrentamientos predeterminados para ${equiposQueDescansan.length} equipos que descansan (${totalEquipos} equipos totales)`);

      const enfrentamientosFase2 = [];
      let equiposRestantesFase2 = [...equiposQueDescansan];

      // Análisis detallado según partidos.md:
      // La clave es determinar cuántos equipos que descansan pueden enfrentarse directamente
      // sin esperar ganadores de la primera ronda

      const configuracionesFase2 = {
        6: {
          enfrentamientosDirectos: 1, // 2 descansan → 1 partido directo
          comentario: "2 que descansan se enfrentan directamente"
        },
        7: {
          enfrentamientosDirectos: 0, // 1 descansa → debe esperar 3 ganadores
          comentario: "1 que descansa espera 3 ganadores para formar 4 en R2"
        },
        8: {
          enfrentamientosDirectos: 0, // 0 descansan → todos juegan
          comentario: "Todos juegan, no hay equipos que descansan"
        },
        9: {
          enfrentamientosDirectos: 3, // 6 van directo a R2 → 3 partidos predeterminados
          comentario: "6 equipos van directo a R2 (3 partidos), 1 descansa + ganador de previa"
        },
        10: {
          enfrentamientosDirectos: 3, // 6 van directo a R2 → 3 partidos predeterminados
          comentario: "6 equipos van directo a R2 (3 partidos) + ganadores de previa"
        },
        11: {
          enfrentamientosDirectos: 2, // 5 descansan → 4 se pueden emparejar
          comentario: "5 descansan: 4 se emparejan (2 partidos), 1 espera ganadores"
        },
        12: {
          enfrentamientosDirectos: 2, // 4 descansan → todos se pueden emparejar
          comentario: "4 descansan: todos se emparejan (2 partidos)"
        },
        13: {
          enfrentamientosDirectos: 1, // 3 descansan → 2 se emparejan, 1 espera
          comentario: "3 descansan: 2 se emparejan (1 partido), 1 espera ganadores"
        },
        14: {
          enfrentamientosDirectos: 1, // 2 descansan → 1 partido directo
          comentario: "2 descansan: se enfrentan directamente (1 partido)"
        },
        15: {
          enfrentamientosDirectos: 0, // 1 descansa → debe esperar ganadores
          comentario: "1 descansa: espera ganadores para formar 4 en R2"
        },
        16: {
          enfrentamientosDirectos: 0, // 0 descansan → todos juegan
          comentario: "Todos juegan octavos, no hay equipos que descansan"
        }
      };

      const config = configuracionesFase2[totalEquipos];
      if (!config) {
        console.log(`⚠️ No hay configuración para ${totalEquipos} equipos`);
        return { enfrentamientosFase2: [], equiposRestantesFase2 };
      }

      console.log(`📝 Estrategia para ${totalEquipos} equipos: ${config.comentario}`);

      // Para casos especiales 9 y 10, usar solo los equipos que van directo a R2
      let equiposParaEmparejar = [...equiposRestantesFase2];

      if (totalEquipos === 9 || totalEquipos === 10) {
        // En estos casos, equiposQueDescansan incluye 6 equipos que van directo a R2 + el que realmente descansa
        // Solo emparejar los 6 que van directo a R2
        const equiposParaR2 = equiposQueDescansan.filter((_, index) => index < 6);
        equiposParaEmparejar = [...equiposParaR2];

        console.log(`🔄 Casos especiales ${totalEquipos}: usando ${equiposParaEmparejar.length} equipos que van directo a R2`);

        // Los equipos restantes (los que realmente esperan ganadores)
        equiposRestantesFase2 = equiposQueDescansan.slice(6);
      }

      // Generar enfrentamientos directos
      for (let i = 0; i < config.enfrentamientosDirectos; i++) {
        if (equiposParaEmparejar.length >= 2) {
          const equipo1 = equiposParaEmparejar.shift();
          const equipo2 = equiposParaEmparejar.shift();

          enfrentamientosFase2.push({
            equipo1,
            equipo2,
            tipo: 'predeterminado'
          });

          console.log(`🥊 Enfrentamiento Fase 2 predeterminado ${i + 1}: ${equipo1.nombre_equipo} vs ${equipo2.nombre_equipo}`);
        }
      }

      // Actualizar equipos restantes
      if (totalEquipos === 9 || totalEquipos === 10) {
        equiposRestantesFase2 = [...equiposRestantesFase2, ...equiposParaEmparejar];
      } else {
        equiposRestantesFase2 = equiposParaEmparejar;
      }

      console.log(`📋 Resultados: ${enfrentamientosFase2.length} enfrentamientos predeterminados, ${equiposRestantesFase2.length} equipos esperando ganadores`);

      return {
        enfrentamientosFase2,
        equiposRestantesFase2
      };
    },

    calcularEstructuraTorneo(equiposParaSorteo) {
      const totalEquipos = equiposParaSorteo.length;
      console.log(`📊 Calculando estructura del torneo para ${totalEquipos} equipos`);

      // Configuraciones según partidos.md
      const configuraciones = {
        6: { primeraRonda: 'Cuartos', equiposJuegan: 4, equiposDescansan: 2, rondas: ['Cuartos', 'Semifinal', 'Final'] },
        7: { primeraRonda: 'Octavos', equiposJuegan: 6, equiposDescansan: 1, rondas: ['Octavos', 'Cuartos', 'Semifinal', 'Final'] },
        8: { primeraRonda: 'Octavos', equiposJuegan: 8, equiposDescansan: 0, rondas: ['Octavos', 'Cuartos', 'Semifinal', 'Final'] },
        9: { primeraRonda: 'Previa', equiposJuegan: 2, equiposDescansan: 7, rondas: ['Previa', 'Cuartos', 'Semifinal', 'Final'] },
        10: { primeraRonda: 'Previa', equiposJuegan: 4, equiposDescansan: 6, rondas: ['Previa', 'Cuartos', 'Semifinal', 'Final'] },
        11: { primeraRonda: 'Octavos', equiposJuegan: 6, equiposDescansan: 5, rondas: ['Octavos', 'Cuartos', 'Semifinal', 'Final'] },
        12: { primeraRonda: 'Octavos', equiposJuegan: 8, equiposDescansan: 4, rondas: ['Octavos', 'Cuartos', 'Semifinal', 'Final'] },
        13: { primeraRonda: 'Octavos', equiposJuegan: 10, equiposDescansan: 3, rondas: ['Octavos', 'Cuartos', 'Semifinal', 'Final'] },
        14: { primeraRonda: 'Octavos', equiposJuegan: 12, equiposDescansan: 2, rondas: ['Octavos', 'Cuartos', 'Semifinal', 'Final'] },
        15: { primeraRonda: 'Octavos', equiposJuegan: 14, equiposDescansan: 1, rondas: ['Octavos', 'Cuartos', 'Semifinal', 'Final'] },
        16: { primeraRonda: 'Octavos', equiposJuegan: 16, equiposDescansan: 0, rondas: ['Octavos', 'Cuartos', 'Semifinal', 'Final'] }
      };

      const config = configuraciones[totalEquipos];
      if (!config) {
        throw new Error(`No hay configuración disponible para ${totalEquipos} equipos. Debe ser entre 6 y 16 equipos.`);
      }

      console.log(`📋 Configuración: ${config.equiposJuegan} juegan, ${config.equiposDescansan} descansan`);

      return config;
    }
  }
});