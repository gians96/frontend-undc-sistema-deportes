<template>
  <div class="torneo-bracket">
    <!-- Header del torneo -->
    <div v-if="torneo" class="bg-oscuro-850 rounded-2xl shadow-xl border border-oscuro-700 p-4 sm:p-6 mb-4 sm:mb-6">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-white">
            Torneo <span class="text-green-400 glow-text">{{ deporteSeleccionado?.etiqueta }}</span>
          </h2>
          <p v-if="torneo.equiposIniciales" class="text-sm sm:text-base text-oscuro-300 mt-1">
            {{ torneo.equiposIniciales.length }} equipos participantes
          </p>
        </div>
        <div class="text-left sm:text-right w-full sm:w-auto">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                  :class="estadoClasses[torneo.estado]">
              {{ estadoTexto[torneo.estado] }}
            </span>
          </div>
          <div v-if="torneo.campeon" class="flex items-center gap-2 text-yellow-400">
            <i class="fas fa-crown text-base sm:text-lg"></i>
            <span class="font-semibold text-base sm:text-lg">{{ torneo.campeon.nombre }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bracket visual -->
    <div v-if="torneo" class="bracket-container overflow-x-auto">
      <div class="flex gap-4 sm:gap-6 min-w-max pb-4">
        <!-- Rondas -->
        <div v-for="(ronda, rondaIndex) in torneo.rondas"
             :key="ronda.nombre"
             class="bracket-round">

          <!-- Título de la ronda -->
          <div class="text-center mb-4">
            <h3 class="font-semibold text-base sm:text-lg text-white mb-2">{{ ronda.nombre }}</h3>
            <div class="flex items-center justify-center gap-2">
              <span class="text-xs sm:text-sm text-oscuro-300">
                {{ partidosCompletados(ronda) }}/{{ ronda.partidos.length }} completados
              </span>
              <i v-if="ronda.completada" class="fas fa-check-circle text-green-400"></i>
            </div>
          </div>

          <!-- Partidos de la ronda -->
          <div class="space-y-4 sm:space-y-6">
            <div v-for="(partido) in ronda.partidos"
                 :key="partido.enfrentamiento_id"
                 class="partido-card">

              <!-- Tarjeta BYE -->
              <div v-if="partido.es_bye" class="bg-oscuro-800 border-2 border-dashed border-oscuro-700 rounded-2xl p-3 sm:p-4 text-center">
                  <span class="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full bg-yellow-800/40 text-yellow-400 mb-3 sm:mb-4 inline-block">BYE</span>
                  <div class="flex items-center gap-3 p-3 bg-oscuro-700 rounded-lg">
                    <div class="w-8 h-8 bg-oscuro-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span class="text-xs sm:text-sm font-bold text-white">{{ partido.equipo_1.ciclo }}</span>
                    </div>
                    <div class="flex-1 min-w-0">
                      <span class="font-semibold text-sm sm:text-base text-white block truncate">{{ partido.equipo_1.nombre }}</span>
                    </div>
                    <i class="fas fa-arrow-right text-green-400 text-base sm:text-lg flex-shrink-0"></i>
                  </div>
              </div>

              <!-- Tarjeta normal de partido -->
              <div v-else class="bg-oscuro-800 shadow-lg rounded-2xl p-3 sm:p-4 border-2"
                   :class="partidoClasses(partido)">

                <div class="text-center mb-3 sm:mb-4">
                  <span class="text-xs sm:text-sm font-semibold px-3 py-1 rounded-full"
                        :class="estadoPartidoClasses[partido.estado]">
                    {{ estadoPartidoTexto[partido.estado] || 'Programado' }}
                  </span>
                </div>

                <div class="space-y-1.5 sm:space-y-2">
                  <!-- Equipo 1 -->
                  <div class="flex items-center justify-between p-2 sm:p-3 bg-oscuro-700 rounded-lg ring-2"
                       :class="partido.ganador?.id === partido.equipo_1?.id ? 'ring-green-500' : 'ring-transparent'">
                    <div class="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div v-if="partido.equipo_1" class="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                             :class="partido.ganador?.id === partido.equipo_1?.id ? 'bg-green-500' : 'bg-oscuro-600'">
                          <span class="text-xs sm:text-sm font-bold text-white">{{ partido.equipo_1.ciclo }}</span>
                        </div>
                        <span class="font-semibold text-sm sm:text-base text-white truncate">{{ partido.equipo_1.nombre }}</span>
                      </div>
                      <span v-else class="text-oscuro-400 text-sm italic">Por definir</span>
                    </div>
                    <div v-if="partido.estado === 'jugado'" class="font-bold text-lg sm:text-xl text-white ml-2 sm:ml-3 flex-shrink-0">
                      {{ partido.resultado?.puntos_equipo_1 || 0 }}
                    </div>
                  </div>

                  <div class="text-center text-oscuro-500 font-bold text-xs sm:text-sm my-1">VS</div>

                  <!-- Equipo 2 -->
                  <div class="flex items-center justify-between p-2 sm:p-3 bg-oscuro-700 rounded-lg ring-2"
                       :class="partido.ganador?.id === partido.equipo_2?.id ? 'ring-green-500' : 'ring-transparent'">
                    <div class="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div v-if="partido.equipo_2" class="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                             :class="partido.ganador?.id === partido.equipo_2?.id ? 'bg-green-500' : 'bg-oscuro-600'">
                          <span class="text-xs sm:text-sm font-bold text-white">{{ partido.equipo_2.ciclo }}</span>
                        </div>
                        <span class="font-semibold text-sm sm:text-base text-white truncate">{{ partido.equipo_2.nombre }}</span>
                      </div>
                      <span v-else class="text-oscuro-400 text-sm italic">Por definir</span>
                    </div>
                    <div v-if="partido.estado === 'jugado'" class="font-bold text-lg sm:text-xl text-white ml-2 sm:ml-3 flex-shrink-0">
                      {{ partido.resultado?.puntos_equipo_2 || 0 }}
                    </div>
                  </div>
                </div>

                <!-- Acciones -->
                <div v-if="partido.equipo_1 && partido.equipo_2" class="mt-3 sm:mt-4">
                  <button v-if="partido.estado === 'pendiente' || partido.estado === 'programado'"
                          @click="$emit('finalizar-partido', rondaIndex, partido.enfrentamiento_id)"
                          class="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white py-2.5 sm:py-3 px-4 rounded-xl text-sm font-semibold cursor-pointer">
                    Registrar Resultado
                  </button>
                  <button v-if="partido.estado === 'jugado'"
                          @click="$emit('editar-partido', rondaIndex, partido.enfrentamiento_id)"
                          class="w-full bg-oscuro-700 hover:bg-oscuro-600 transition-colors duration-200 text-green-400 py-2.5 sm:py-3 px-4 rounded-xl text-sm font-semibold cursor-pointer">
                    Editar Resultado
                  </button>
                </div>
              </div>
            </div>

            <!-- Botón para completar fase -->
            <div v-if="puedeCompletarFase(ronda)" class="mt-4 sm:mt-6 text-center">
                <button @click="$emit('completar-fase', rondaIndex)"
                        class="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 shadow-lg shadow-green-500/20">
                  <i class="fas fa-arrow-right mr-2"></i>
                  Avanzar a {{ obtenerNombreSiguienteFase(ronda) }}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  torneo: { type: Object, required: true },
  deporteSeleccionado: { type: Object, default: null }
});

const emit = defineEmits(['finalizar-partido', 'editar-partido', 'completar-fase']);

const estadoClasses = { 'no_iniciado': 'bg-oscuro-700 text-oscuro-300', 'en_progreso': 'bg-blue-500/20 text-blue-300', 'finalizado': 'bg-green-500/20 text-green-300' };
const estadoTexto = { 'no_iniciado': 'No iniciado', 'en_progreso': 'En progreso', 'finalizado': 'Finalizado' };

const estadoPartidoClasses = { 'pendiente': 'bg-yellow-500/20 text-yellow-300', 'programado': 'bg-yellow-500/20 text-yellow-300', 'en_curso': 'bg-blue-500/20 text-blue-300', 'jugado': 'bg-green-500/20 text-green-300' };
const estadoPartidoTexto = { 'pendiente': 'Pendiente', 'programado': 'Programado', 'en_curso': 'En curso', 'jugado': 'Finalizado' };

const partidosCompletados = (ronda) => ronda.partidos.filter(p => p.estado === 'jugado' || p.es_bye).length;

const partidoClasses = (partido) => {
  const classes = ['transition-all', 'duration-200'];
  if (partido.estado === 'jugado') classes.push('border-green-500/30');
  else if (partido.estado === 'en_curso') classes.push('border-blue-500/30');
  else if (partido.estado === 'pendiente' || partido.estado === 'programado') classes.push('border-yellow-500/30');
  else classes.push('border-oscuro-700');
  return classes.join(' ');
};

const obtenerNombreSiguienteFase = (ronda) => {
    const siguienteRonda = props.torneo.rondas.find(r => r.orden === ronda.orden + 1);
    return siguienteRonda ? siguienteRonda.nombre : 'Fase Final';
};

const puedeCompletarFase = (ronda) => {
  if (!ronda || !ronda.partidos || ronda.partidos.length === 0) {
    return false;
  }
  if (ronda.fase_id === 4) {
    return false;
  }
  const todosFinalizados = ronda.partidos.every(p => p.estado === 'jugado' || p.es_bye);
  return todosFinalizados;
};
</script>

<style scoped>
.bracket-container { background-color: var(--color-oscuro-850); border-radius: 1rem; padding: 0.5rem; }
@media (min-width: 640px) { .bracket-container { padding: 1.5rem; } }
.bracket-round { width: 240px; position: relative; }
@media (min-width: 640px) { .bracket-round { width: 288px; } }
.partido-card { position: relative; }
.bracket-container { -webkit-overflow-scrolling: touch; scroll-behavior: smooth; }
.bracket-container::-webkit-scrollbar { height: 8px; }
.bracket-container::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.2); border-radius: 4px; }
.bracket-container::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }
.bracket-container::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }
</style>