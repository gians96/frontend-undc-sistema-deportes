<template>
  <div class="bg-oscuro-800 rounded-2xl shadow-2xl border border-oscuro-600 overflow-hidden">
    <!-- Header de la tabla -->
    <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <i class="fa-solid fa-trophy text-white text-xl"></i>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-white">{{ torneo }}</h2>
            <p class="text-green-100 text-sm">{{ nombreDeporte }}</p>
          </div>
        </div>
        <div class="text-right hidden sm:block">
          <p class="text-white text-sm font-medium">Última actualización</p>
          <p class="text-green-100 text-xs">{{ formatearFecha(fechaActualizacion) }}</p>
        </div>
      </div>
    </div>

    <!-- Tabla -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-oscuro-900/50 border-b border-oscuro-600">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold text-oscuro-300 uppercase tracking-wider">
              Pos
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-oscuro-300 uppercase tracking-wider">
              Equipo
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-oscuro-300 uppercase tracking-wider">
              PJ
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-oscuro-300 uppercase tracking-wider hidden sm:table-cell">
              PG
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-oscuro-300 uppercase tracking-wider hidden sm:table-cell">
              PE
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-oscuro-300 uppercase tracking-wider hidden sm:table-cell">
              PP
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-oscuro-300 uppercase tracking-wider hidden md:table-cell">
              GF
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-oscuro-300 uppercase tracking-wider hidden md:table-cell">
              GC
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-oscuro-300 uppercase tracking-wider">
              DG
            </th>
            <th class="px-4 py-3 text-center text-xs font-semibold text-oscuro-300 uppercase tracking-wider">
              Pts
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-oscuro-700">
          <tr
            v-for="(equipo, index) in posiciones"
            :key="index"
            class="hover:bg-oscuro-700/50 transition-colors duration-200"
            :class="{
              'bg-green-500/10': equipo.posicion === 1,
              'bg-blue-500/10': equipo.posicion === 2,
              'bg-amber-500/10': equipo.posicion === 3
            }"
          >
            <!-- Posición -->
            <td class="px-4 py-4">
              <div class="flex items-center gap-2">
                <span
                  class="flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm"
                  :class="{
                    'bg-yellow-500 text-oscuro-900': equipo.posicion === 1,
                    'bg-gray-400 text-oscuro-900': equipo.posicion === 2,
                    'bg-amber-600 text-white': equipo.posicion === 3,
                    'bg-oscuro-700 text-white': equipo.posicion > 3
                  }"
                >
                  {{ equipo.posicion }}
                </span>
                <i
                  v-if="equipo.posicion <= 3"
                  class="fa-solid fa-medal"
                  :class="{
                    'text-yellow-400': equipo.posicion === 1,
                    'text-gray-400': equipo.posicion === 2,
                    'text-amber-600': equipo.posicion === 3
                  }"
                ></i>
              </div>
            </td>

            <!-- Equipo -->
            <td class="px-4 py-4">
              <span class="font-semibold text-white">{{ equipo.equipo }}</span>
            </td>

            <!-- Partidos Jugados -->
            <td class="px-4 py-4 text-center text-oscuro-200">{{ equipo.pj }}</td>

            <!-- Partidos Ganados -->
            <td class="px-4 py-4 text-center text-green-400 font-medium hidden sm:table-cell">
              {{ equipo.pg }}
            </td>

            <!-- Partidos Empatados -->
            <td class="px-4 py-4 text-center text-yellow-400 font-medium hidden sm:table-cell">
              {{ equipo.pe }}
            </td>

            <!-- Partidos Perdidos -->
            <td class="px-4 py-4 text-center text-red-400 font-medium hidden sm:table-cell">
              {{ equipo.pp }}
            </td>

            <!-- Goles a Favor -->
            <td class="px-4 py-4 text-center text-oscuro-200 hidden md:table-cell">
              {{ equipo.gf }}
            </td>

            <!-- Goles en Contra -->
            <td class="px-4 py-4 text-center text-oscuro-200 hidden md:table-cell">
              {{ equipo.gc }}
            </td>

            <!-- Diferencia de Goles -->
            <td class="px-4 py-4 text-center">
              <span
                class="inline-flex items-center px-2 py-1 rounded-md font-semibold text-xs"
                :class="{
                  'bg-green-500/20 text-green-400': equipo.dg > 0,
                  'bg-red-500/20 text-red-400': equipo.dg < 0,
                  'bg-oscuro-600 text-oscuro-300': equipo.dg === 0
                }"
              >
                {{ equipo.dg > 0 ? '+' : '' }}{{ equipo.dg }}
              </span>
            </td>

            <!-- Puntos -->
            <td class="px-4 py-4 text-center">
              <span class="inline-flex items-center justify-center w-10 h-10 bg-green-500/20 text-green-400 rounded-lg font-bold">
                {{ equipo.puntos }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Leyenda -->
    <div class="bg-oscuro-900/30 px-6 py-4 border-t border-oscuro-700">
      <div class="flex flex-wrap gap-4 text-xs text-oscuro-300">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-white">PJ:</span> Partidos Jugados
        </div>
        <div class="flex items-center gap-2">
          <span class="font-semibold text-white">PG:</span> Partidos Ganados
        </div>
        <div class="flex items-center gap-2">
          <span class="font-semibold text-white">PE:</span> Partidos Empatados
        </div>
        <div class="flex items-center gap-2">
          <span class="font-semibold text-white">PP:</span> Partidos Perdidos
        </div>
        <div class="flex items-center gap-2">
          <span class="font-semibold text-white">GF:</span> Goles a Favor
        </div>
        <div class="flex items-center gap-2">
          <span class="font-semibold text-white">GC:</span> Goles en Contra
        </div>
        <div class="flex items-center gap-2">
          <span class="font-semibold text-white">DG:</span> Diferencia de Goles
        </div>
        <div class="flex items-center gap-2">
          <span class="font-semibold text-white">Pts:</span> Puntos
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  nombreDeporte: {
    type: String,
    required: true
  },
  torneo: {
    type: String,
    required: true
  },
  fechaActualizacion: {
    type: String,
    required: true
  },
  posiciones: {
    type: Array,
    required: true
  }
});

const formatearFecha = (fecha) => {
  const date = new Date(fecha);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>
