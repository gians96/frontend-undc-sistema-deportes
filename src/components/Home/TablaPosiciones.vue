<template>
  <div class="relative bg-oscuro-700/80 rounded-lg overflow-hidden">
    <!-- Efectos de fondo decorativos -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-verde-primario/10 via-transparent to-transparent"></div>
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>

    <!-- Borde neón sutil -->
    <div class="absolute inset-0  ring-1 ring-verde-primario pointer-events-none"></div>

    <div class="relative">
      <!-- Header de la tabla -->
      <div class="relative overflow-hidden px-6 py-8">
        <!-- Efecto de brillo superior -->
        <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-verde-primario/50 to-transparent"></div>

        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <!-- Icono con efecto neón -->
            <div class="relative group">
              <div class="absolute inset-0 bg-verde-primario/20 rounded-2xl blur-xl group-hover:bg-verde-primario/30 transition-all duration-300"></div>
              <div class="relative w-14 h-14 bg-gradient-to-br from-verde-primario/20 to-verde-primario/5 rounded-2xl flex items-center justify-center border border-verde-primario/30 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300">
                <i class="fa-solid fa-trophy text-verde-primario text-2xl"></i>
              </div>
            </div>

            <div>
              <h2 class="text-3xl font-black text-white tracking-tight bg-clip-text">
                {{ torneo }}
              </h2>
              <div class="flex items-center gap-2 mt-1">
                <div class="w-1.5 h-1.5 rounded-full bg-verde-primario animate-pulse"></div>
                <p class="text-verde-primario/90 text-sm font-medium uppercase tracking-wider">{{ nombreDeporte }}</p>
              </div>
            </div>
          </div>

          <div class="hidden lg:flex items-center gap-3 px-4 py-2.5 bg-oscuro-800/70 rounded-lg backdrop-blur-sm">
            <div class="w-2 h-2 rounded-full bg-verde-primario/70 animate-pulse"></div>
            <div class="text-right">
              <p class="text-oscuro-400 text-xs font-medium uppercase tracking-wide">Última actualización</p>
              <p class="text-oscuro-200 text-sm font-semibold">{{ formatearFecha(fechaActualizacion) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabla y Leyenda (condicional) -->
      <template v-if="posiciones.length > 0">
        <!-- Tabla -->
        <div class="px-6 pb-6">
          <div class="overflow-x-auto rounded-lg bg-oscuro-850 backdrop-blur-sm">
            <table class="w-full">
              <thead>
                <tr class="border-b border-oscuro-700/50">
                  <th class="px-4 py-4 text-left">
                    <span class="text-xs font-bold text-oscuro-400 uppercase tracking-widest">Pos</span>
                  </th>
                  <th class="px-4 py-4 text-left">
                    <span class="text-xs font-bold text-oscuro-400 uppercase tracking-widest">Equipo</span>
                  </th>
                  <th class="px-4 py-4 text-center">
                    <span class="text-xs font-bold text-oscuro-400 uppercase tracking-widest">PJ</span>
                  </th>
                  <th class="px-4 py-4 text-center hidden sm:table-cell">
                    <span class="text-xs font-bold text-oscuro-400 uppercase tracking-widest">PG</span>
                  </th>
                  <th class="px-4 py-4 text-center hidden sm:table-cell">
                    <span class="text-xs font-bold text-oscuro-400 uppercase tracking-widest">PE</span>
                  </th>
                  <th class="px-4 py-4 text-center hidden sm:table-cell">
                    <span class="text-xs font-bold text-oscuro-400 uppercase tracking-widest">PP</span>
                  </th>
                  <th class="px-4 py-4 text-center hidden md:table-cell">
                    <span class="text-xs font-bold text-oscuro-400 uppercase tracking-widest">GF</span>
                  </th>
                  <th class="px-4 py-4 text-center hidden md:table-cell">
                    <span class="text-xs font-bold text-oscuro-400 uppercase tracking-widest">GC</span>
                  </th>
                  <th class="px-4 py-4 text-center hidden md:table-cell">
                    <span class="text-xs font-bold text-oscuro-400 uppercase tracking-widest">DG</span>
                  </th>
                  <th class="px-4 py-4 text-center">
                    <span class="text-xs font-bold text-oscuro-400 uppercase tracking-widest">Pts</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(equipo, index) in posiciones"
                  :key="index"
                  class="group border-b border-oscuro-700/30 last:border-b-0 hover:bg-oscuro-700/20 transition-all duration-300"
                  :class="{
                    'bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent': equipo.posicion === 1,
                    'bg-gradient-to-r from-gray-400/10 via-transparent to-transparent': equipo.posicion === 2,
                    'bg-gradient-to-r from-orange-600/10 via-transparent to-transparent': equipo.posicion === 3
                  }"
                >
                  <!-- Posición -->
                  <td class="px-4 py-5 relative">
                    <!-- Indicador lateral para top 3 -->
                    <div
                      v-if="equipo.posicion <= 3"
                      class="absolute left-0 top-0 bottom-0 w-1 rounded-r-full transition-all duration-300"
                      :class="{
                        'bg-gradient-to-b from-yellow-400 to-yellow-600': equipo.posicion === 1,
                        'bg-gradient-to-b from-gray-300 to-gray-500': equipo.posicion === 2,
                        'bg-gradient-to-b from-orange-500 to-amber-700': equipo.posicion === 3
                      }"
                    ></div>
                    <div class="relative inline-block">
                      <!-- Efecto de brillo para top 3 -->
                      <div
                        v-if="equipo.posicion <= 3"
                        class="absolute inset-0 rounded-xl blur-md opacity-50"
                        :class="{
                          'bg-yellow-400': equipo.posicion === 1,
                          'bg-gray-400': equipo.posicion === 2,
                          'bg-orange-500': equipo.posicion === 3
                        }"
                      ></div>
                      <div
                        class="relative flex items-center justify-center w-10 h-10 rounded-xl font-black text-sm transition-all duration-300 "
                        :class="{
                          'bg-yellow-500 text-oscuro-900 shadow-lg shadow-yellow-500/40': equipo.posicion === 1,
                          'bg-gray-500 text-white shadow-lg shadow-gray-400/40': equipo.posicion === 2,
                          'bg-amber-500 text-white shadow-lg shadow-orange-600/40': equipo.posicion === 3,
                          'bg-oscuro-700 text-oscuro-300': equipo.posicion > 3
                        }"
                      >
                        {{ equipo.posicion }}
                      </div>
                      <!-- Corona para top 3 - Posicionamiento absoluto -->
                      <i
                        v-if="equipo.posicion <= 3"
                        class="fa-solid fa-crown text-lg absolute -top-2 -right-2 rotate-28"
                        :class="{
                          'text-yellow-400': equipo.posicion === 1,
                          'text-gray-400': equipo.posicion === 2,
                          'text-orange-400': equipo.posicion === 3
                        }"
                      ></i>
                    </div>
                  </td>

                  <!-- Equipo -->
                  <td class="px-4 py-5">
                    <div class="relative">
                      <span class="font-bold text-white group-hover:text-verde-primario transition-colors duration-300">
                        {{ equipo.equipo }}
                      </span>
                      <!-- Fuego solo para el primero - Posicionamiento absoluto para no afectar layout -->
                      <i
                        v-if="equipo.posicion === 1"
                        class="fa-solid fa-fire text-orange-500 text-sm animate-pulse absolute -right-5 top-1/2 -translate-y-1/2"
                      ></i>
                    </div>
                  </td>

                  <!-- Partidos Jugados -->
                  <td class="px-4 py-5 text-center">
                    <span class="text-oscuro-200 font-semibold text-lg">{{ equipo.pj }}</span>
                  </td>

                  <!-- Partidos Ganados -->
                  <td class="px-4 py-5 text-center hidden sm:table-cell">
                    <span class="text-verde-primario font-bold text-lg">{{ equipo.pg }}</span>
                  </td>

                  <!-- Partidos Empatados -->
                  <td class="px-4 py-5 text-center hidden sm:table-cell">
                    <span class="text-yellow-400 font-bold text-lg">{{ equipo.pe }}</span>
                  </td>

                  <!-- Partidos Perdidos -->
                  <td class="px-4 py-5 text-center hidden sm:table-cell">
                    <span class="text-red-400 font-bold text-lg">{{ equipo.pp }}</span>
                  </td>

                  <!-- Goles a Favor -->
                  <td class="px-4 py-5 text-center hidden md:table-cell">
                    <span class="text-oscuro-200 font-semibold text-lg">{{ equipo.gf }}</span>
                  </td>

                  <!-- Goles en Contra -->
                  <td class="px-4 py-5 text-center hidden md:table-cell">
                    <span class="text-oscuro-200 font-semibold text-lg">{{ equipo.gc }}</span>
                  </td>

                  <!-- Diferencia de Goles -->
                  <td class="px-4 py-5 text-center hidden md:table-cell">
                    <div class="flex justify-center">
                      <span
                        class="inline-flex items-center px-3 py-1 rounded font-semibold text-xs"
                        :class="{
                          'bg-green-800/20 text-verde-primario ring-1 ring-green-400/20': equipo.dg > 0,
                          'bg-red-800/20 text-red-400 ring-1 ring-red-500/20': equipo.dg < 0,
                          'bg-oscuro-600/50 text-oscuro-400 ring-1 ring-oscuro-600': equipo.dg === 0
                        }"
                      >
                        {{ equipo.dg > 0 ? '+' : '' }}{{ equipo.dg }}
                      </span>
                    </div>
                  </td>

                  <!-- Puntos -->
                  <td class="px-4 py-5">
                    <div class="flex justify-center">
                      <div class="relative group/pts">
                        <div class="absolute inset-0 bg-verde-primario/30 rounded-xl blur-md opacity-0 group-hover/pts:opacity-100 transition-opacity duration-300"></div>
                        <div class="relative inline-flex items-center justify-center md:min-w-[3rem] md:h-12 md:px-3 md:bg-gradient-to-br md:from-verde-primario/20 md:to-verde-primario/5 md:border md:border-verde-primario/40 md:rounded-xl">
                          <span class="text-verde-primario font-black text-xl">{{ equipo.puntos }}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Leyenda -->
        <div class="px-6 pb-6">
          <div class="relative overflow-hidden rounded-lg bg-oscuro-850 border border-oscuro-700/50 backdrop-blur-sm">

            <div class="px-6 py-4">
              <div class="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs">
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-verde-primario/60"></div>
                  <span class="font-black text-verde-primario/80 uppercase tracking-wider">PJ:</span>
                  <span class="text-oscuro-300 font-medium">Partidos Jugados</span>
                </div>
                <div class="hidden sm:flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-verde-primario/60"></div>
                  <span class="font-black text-verde-primario/80 uppercase tracking-wider">PG:</span>
                  <span class="text-oscuro-300 font-medium">Partidos Ganados</span>
                </div>
                <div class="hidden sm:flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-yellow-400/60"></div>
                  <span class="font-black text-yellow-400/80 uppercase tracking-wider">PE:</span>
                  <span class="text-oscuro-300 font-medium">Partidos Empatados</span>
                </div>
                <div class="hidden sm:flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-red-400/60"></div>
                  <span class="font-black text-red-400/80 uppercase tracking-wider">PP:</span>
                  <span class="text-oscuro-300 font-medium">Partidos Perdidos</span>
                </div>
                <div class="hidden md:flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-oscuro-400"></div>
                  <span class="font-black text-oscuro-400 uppercase tracking-wider">GF:</span>
                  <span class="text-oscuro-300 font-medium">Goles a Favor</span>
                </div>
                <div class="hidden md:flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-oscuro-400"></div>
                  <span class="font-black text-oscuro-400 uppercase tracking-wider">GC:</span>
                  <span class="text-oscuro-300 font-medium">Goles en Contra</span>
                </div>
                <div class="hidden md:flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-oscuro-400"></div>
                  <span class="font-black text-oscuro-400 uppercase tracking-wider">DG:</span>
                  <span class="text-oscuro-300 font-medium">Diferencia de Goles</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-verde-primario animate-pulse"></div>
                  <span class="font-black text-verde-primario uppercase tracking-wider">Pts:</span>
                  <span class="text-oscuro-300 font-medium">Puntos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- Mensaje de Carga o Error -->
      <template v-else>
        <div class="px-6 pb-6">
          <div class="bg-oscuro-800 rounded-2xl shadow-2xl border border-oscuro-600 p-12 text-center">
            <div class="inline-flex items-center justify-center px-4 py-5 mb-6 bg-oscuro-700 rounded-2xl">
              <i class="fa-solid fa-info-circle text-verde-primario/50 text-6xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-white mb-3">
              {{ torneo }}
            </h3>
            <p class="text-oscuro-300 max-w-md mx-auto">
              Actualmente no hay una tabla de posiciones disponible para {{ nombreDeporte }}. Si el problema persiste, por favor inténtalo más tarde.
            </p>
          </div>
        </div>
      </template>
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
