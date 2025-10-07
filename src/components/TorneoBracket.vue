<template>
  <div class="torneo-bracket">
    <!-- Header del torneo -->
    <div class="bg-oscuro-800 rounded-xl shadow-lg border border-oscuro-600 p-4 md:p-6 mb-4 md:mb-6">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h2 class="text-xl md:text-2xl font-bold text-white glow-text">
            Torneo {{ deporteSeleccionado?.etiqueta }}
          </h2>
          <p class="text-sm md:text-base text-oscuro-200">
            {{ torneo.equiposIniciales.length }} equipos participantes
          </p>
        </div>
        <div class="text-left sm:text-right w-full sm:w-auto">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2 md:px-3 py-1 rounded-full text-xs font-semibold"
                  :class="estadoClasses[torneo.estado]">
              {{ estadoTexto[torneo.estado] }}
            </span>
          </div>
          <div v-if="torneo.campeón" class="flex items-center gap-2 text-yellow-400">
            <i class="fas fa-crown text-sm md:text-base"></i>
            <span class="font-semibold text-sm md:text-base">{{ torneo.campeón.nombre_equipo }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bracket visual -->
    <div class="bg-oscuro-800 rounded-xl shadow-lg border border-oscuro-600 p-3 md:p-6">
      <div class="bracket-container overflow-x-auto">
        <div class="flex gap-4 md:gap-6 min-w-max pb-4">
          <!-- Rondas -->
          <div v-for="(ronda, rondaIndex) in torneo.rondas"
               :key="ronda.nombre"
               class="bracket-round">

            <!-- Título de la ronda -->
            <div class="text-center mb-3 md:mb-4">
              <h3 class="font-bold text-base md:text-lg text-white mb-1 md:mb-2">{{ ronda.nombre }}</h3>
              <div class="flex items-center justify-center gap-1 md:gap-2">
                <span class="text-xs md:text-sm text-oscuro-300">
                  {{ partidosCompletados(ronda) }}/{{ ronda.partidos.length }} completados
                </span>
                <i v-if="ronda.completada" class="fas fa-check-circle text-green-400 text-xs md:text-sm"></i>
              </div>
            </div>

            <!-- Partidos de la ronda -->
            <div class="space-y-4 md:space-y-6">
              <div v-for="(partido) in ronda.partidos"
                   :key="partido.id"
                   class="partido-card">

                <!-- Tarjeta especial para BYE -->
                <div v-if="partido.es_bye" class="bg-gradient-to-br from-yellow-800/30 to-yellow-900/30 border-2 border-yellow-600/50 rounded-xl p-3 md:p-4 w-[240px] md:w-[260px]">
                  <div class="text-center mb-2 md:mb-3">
                    <span class="text-xs font-semibold px-2 md:px-3 py-1 rounded-full bg-yellow-800/40 text-yellow-400">
                      BYE - Pasa Automático
                    </span>
                  </div>

                  <div class="flex items-center justify-center gap-2 md:gap-3 p-3 md:p-4 bg-yellow-800/20 rounded-lg">
                    <div class="w-8 h-8 md:w-10 md:h-10 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span class="text-xs md:text-sm font-bold text-white">{{ partido.equipo1.ciclo }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <span class="font-semibold text-sm md:text-base text-yellow-200 block truncate">{{ partido.equipo1.nombre_equipo }}</span>
                      <div class="text-xs text-yellow-300 mt-1">
                        <i class="fas fa-forward mr-1"></i>
                        Avanza 
                      </div>
                    </div>
                    <i class="fas fa-trophy text-yellow-400 text-lg md:text-xl flex-shrink-0"></i>
                  </div>
                </div>

                <!-- Tarjeta normal de partido -->
                <div v-else class="bg-oscuro-700 border-2 rounded-xl p-3 md:p-4 w-[240px] md:w-[260px]"
                     :class="partidoClasses(partido)">

                  <!-- Info del partido -->
                  <div class="text-center mb-2 md:mb-3">
                    <span class="text-xs font-semibold px-2 md:px-3 py-1 rounded-full"
                          :class="estadoPartidoClasses[partido.estado]">
                      {{ estadoPartidoTexto[partido.estado] }}
                    </span>
                  </div>

                  <!-- Equipos -->
                  <div class="space-y-1.5 md:space-y-2">
                    <!-- Equipo 1 -->
                    <div class="flex items-center justify-between p-2 md:p-3 bg-oscuro-600 rounded-lg ring-2"
                         :class="partido.ganador?.id_equipo === partido.equipo1?.id_equipo ? 'ring-green-600' : 'ring-oscuro-600'">
                      <div class="flex items-center gap-1.5 md:gap-2 min-w-0 flex-1">
                        <div v-if="partido.equipo1" class="flex items-center gap-1.5 md:gap-2 min-w-0 flex-1">
                          <div class="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0"
                               :class="partido.ganador?.id_equipo === partido.equipo1?.id_equipo ? 'bg-green-600' : 'bg-oscuro-500'">
                            <span class="text-xs font-bold text-white">
                              {{ partido.equipo1.ciclo }}
                            </span>
                          </div>
                          <span class="font-medium text-xs md:text-sm text-white truncate">
                            {{ partido.equipo1.nombre_equipo }}
                          </span>
                        </div>
                        <span v-else class="text-oscuro-400 text-xs md:text-sm italic">
                          Por definir
                        </span>
                      </div>
                      <div v-if="partido.estado_id === 2" class="font-bold text-base md:text-lg text-white ml-2 flex-shrink-0">
                        {{ partido.resultado.equipo1 }}
                      </div>
                    </div>

                    <!-- VS -->
                    <div class="text-center py-0.5">
                      <span class="text-xs font-bold text-oscuro-400">VS</span>
                    </div>

                    <!-- Equipo 2 -->
                    <div class="flex items-center justify-between p-2 md:p-3 bg-oscuro-600 rounded-lg ring-2"
                         :class="partido.ganador?.id_equipo === partido.equipo2?.id_equipo ? 'ring-green-600' : 'ring-oscuro-600'">
                      <div class="flex items-center gap-1.5 md:gap-2 min-w-0 flex-1">
                        <div v-if="partido.equipo2" class="flex items-center gap-1.5 md:gap-2 min-w-0 flex-1">
                          <div class="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0"
                               :class="partido.ganador?.id_equipo === partido.equipo2?.id_equipo ? 'bg-green-600' : 'bg-oscuro-500'">
                            <span class="text-xs font-bold text-white">
                              {{ partido.equipo2.ciclo }}
                            </span>
                          </div>
                          <span class="font-medium text-xs md:text-sm text-white truncate">
                            {{ partido.equipo2.nombre_equipo }}
                          </span>
                        </div>
                        <span v-else class="text-oscuro-400 text-xs md:text-sm italic">
                          Por definir
                        </span>
                      </div>
                      <div v-if="partido.estado_id === 2" class="font-bold text-base md:text-lg text-white ml-2 flex-shrink-0">
                        {{ partido.resultado.equipo2 }}
                      </div>
                    </div>
                  </div>

                  <!-- Detalles del partido -->
                  <div v-if="partido.fecha || partido.hora || partido.lugar"
                       class="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-oscuro-500 space-y-0.5 md:space-y-1 text-xs text-oscuro-300">
                    <div v-if="partido.fecha" class="flex items-center gap-1">
                      <i class="fas fa-calendar w-3 flex-shrink-0"></i>
                      <span class="truncate">{{ partido.fecha }}</span>
                    </div>
                    <div v-if="partido.hora" class="flex items-center gap-1">
                      <i class="fas fa-clock w-3 flex-shrink-0"></i>
                      <span>{{ partido.hora }}</span>
                    </div>
                    <div v-if="partido.lugar" class="flex items-center gap-1">
                      <i class="fas fa-location-dot w-3 flex-shrink-0"></i>
                      <span class="truncate">{{ partido.lugar }}</span>
                    </div>
                  </div>

                  <!-- Acciones -->
                  <div v-if="partido.equipo1 && partido.equipo2" class="mt-2 md:mt-3 flex flex-col sm:flex-row gap-1.5 md:gap-2">
                    <button v-if="partido.estado_id === 1"
                            @click="$emit('iniciar-partido', rondaIndex, partido.detalle_partido_id)"
                            class="flex-1 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-colors duration-200 text-white py-2 px-3 rounded-lg text-xs font-medium cursor-pointer">
                      Iniciar
                    </button>
                    <button v-if="partido.estado_id === 5"
                            @click="$emit('finalizar-partido', rondaIndex, partido.detalle_partido_id)"
                            class="flex-1 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-colors duration-200 text-white py-2 px-3 rounded-lg text-xs font-medium cursor-pointer">
                      Finalizar
                    </button>
                    <button v-if="partido.estado_id === 2"
                            @click="$emit('editar-partido', rondaIndex, partido.detalle_partido_id)"
                            class="flex-1 text-green-400 hover:text-green-200 transition-colors duration-200 py-2 px-3 rounded-lg text-xs font-medium cursor-pointer">
                      Editar Resultado
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Botón para completar fase -->
            <div v-if="puedeCompletarFase(ronda, rondaIndex)" class="mt-3 md:mt-4 text-center">
              <div class="bg-blue-800/30 border border-blue-600 rounded-xl p-3 md:p-4 mb-4">
                <div class="text-center text-xs md:text-sm text-blue-200 mb-2 md:mb-3">
                  <i class="fas fa-arrow-up mr-1 md:mr-2"></i>
                  Crear enfrentamientos para la siguiente fase
                </div>
                <button @click="$emit('completar-fase', rondaIndex)"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 w-full sm:w-auto">
                  <i class="fas fa-users mr-1 md:mr-2"></i>
                  Crear Enfrentamientos → {{ obtenerNombreSiguienteFase(ronda) }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useOpcionesDeporte } from '@/stores/deporte';

const deporteStore = useOpcionesDeporte();
const fasesTorneo = deporteStore.obtenerFasesTorneo;

const props = defineProps({
  torneo: {
    type: Object,
    required: true
  },
  deporteSeleccionado: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['iniciar-partido', 'finalizar-partido', 'editar-partido', 'completar-fase']);

const estadoClasses = {
  'no_iniciado': 'bg-oscuro-600 text-oscuro-200',
  'en_progreso': 'bg-blue-800/40 text-blue-400',
  'finalizado': 'bg-green-800/40 text-green-400'
};

const estadoTexto = {
  'no_iniciado': 'No iniciado',
  'en_progreso': 'En progreso',
  'finalizado': 'Finalizado'
};

const estadoPartidoClasses = {
  'pendiente': 'bg-oscuro-800/40 text-oscuro-400',
  'programado': 'bg-yellow-800/40 text-yellow-400',
  'en_curso': 'bg-blue-800/30 text-blue-400',
  'finalizado': 'bg-green-800/40 text-green-400'
};

const estadoPartidoTexto = {
  'pendiente': 'Pendiente',
  'programado': 'Programado',
  'en_curso': 'En curso',
  'finalizado': 'Finalizado'
};

const partidosCompletados = (ronda) => {
  // Cuenta todos los partidos finalizados (incluyendo byes con estado_id = 2)
  return ronda.partidos.filter(p => p.estado_id === 2).length;
};

const partidoClasses = (partido) => {
  const classes = ['transition-all', 'duration-200'];

  // estado_id: 1=pendiente, 2=finalizado, 3=cancelado, 4=postergado, 5=en_curso
  if (partido.estado_id === 2) {
    classes.push('border-green-400/20');
  } else if (partido.estado_id === 5) {
    classes.push('border-blue-400/20');
  } else if (partido.estado_id === 1) {
    classes.push('border-yellow-400/20');
  } else {
    classes.push('border-oscuro-400/20');
  }

  return classes.join(' ');
};

const obtenerNombreSiguienteFase = (ronda) => {
  if (!ronda.fase_id) return '';

  const faseActual = fasesTorneo.find(f => f.valor === ronda.fase_id);
  if (!faseActual) return '';

  // Buscar la siguiente fase por orden
  const faseSiguiente = fasesTorneo
    .filter(f => f.orden > faseActual.orden)
    .sort((a, b) => a.orden - b.orden)[0];

  return faseSiguiente ? faseSiguiente.etiqueta : '';
};

const puedeCompletarFase = (ronda, rondaIndex) => {
  // Solo mostrar el botón cuando:
  // 1. La ronda NO esté completada (ya tiene siguiente fase creada)
  // 2. NO sea la última fase posible según el catálogo de fases
  // 3. TODOS los partidos (incluyendo byes) estén finalizados

  // Si la ronda ya está completada, no mostrar botón
  if (ronda.completada) {
    return false;
  }

  // Verificar si existe una siguiente fase en el catálogo de fases
  if (ronda.fase_id) {
    const faseActual = fasesTorneo.find(f => f.valor === ronda.fase_id);
    if (faseActual) {
      // Buscar si existe una fase con orden superior
      const hayFaseSiguiente = fasesTorneo.some(f => f.orden > faseActual.orden);
      if (!hayFaseSiguiente) {
        // Es la fase final del catálogo
        return false;
      }
    }
  }

  // Si no hay partidos, no mostrar el botón
  if (!ronda.partidos || ronda.partidos.length === 0) {
    return false;
  }

  // Todos los partidos (incluyendo byes) deben estar finalizados (estado_id: 2)
  // Los byes ya tienen estado_id = 2, los partidos normales deben jugarse
  const todosFinalizados = ronda.partidos.every(p => p.estado_id === 2);

  return todosFinalizados;
};

// 

</script>

<style scoped>
.bracket-container {
  background: linear-gradient(to right, #1d262f 0%, #151d24 100%);
  border-radius: 0.5rem;
  padding: 0.75rem;
}

@media (min-width: 768px) {
  .bracket-container {
    padding: 1rem;
  }
}

.bracket-round {
  width: 240px;
  position: relative;
}

@media (min-width: 768px) {
  .bracket-round {
    width: 260px;
  }
}

.partido-card {
  position: relative;
}

/* Smooth scrolling on mobile */
.bracket-container {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

/* Custom scrollbar for better mobile experience */
.bracket-container::-webkit-scrollbar {
  height: 8px;
}

.bracket-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.bracket-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.bracket-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>