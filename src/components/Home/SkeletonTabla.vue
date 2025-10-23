<template>
  <div class="relative bg-oscuro-700/80 rounded-xl overflow-hidden animate-pulse">
    <!-- Efectos de fondo decorativos -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-verde-primario/10 via-transparent to-transparent"></div>
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>

    <!-- Borde neón sutil -->
    <div class="absolute inset-0 rounded-lg ring-1 ring-verde-primario/30 pointer-events-none"></div>

    <div class="relative">
      <!-- Header skeleton -->
      <div class="relative overflow-hidden px-6 py-8">
        <!-- Efecto de brillo superior -->
        <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-verde-primario/50 to-transparent"></div>

        <div class="flex items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <!-- Icono skeleton -->
            <div class="w-14 h-14 bg-oscuro-700/50 rounded-2xl"></div>

            <div>
              <div class="w-64 h-8 bg-oscuro-700/50 rounded mb-2"></div>
              <div class="w-32 h-5 bg-oscuro-700/50 rounded"></div>
            </div>
          </div>

          <div class="hidden lg:flex items-center gap-3 px-4 py-2.5 bg-oscuro-800/50 rounded-xl border border-oscuro-700/50">
            <div class="w-2 h-2 rounded-full bg-oscuro-700/50"></div>
            <div class="text-right">
              <div class="w-28 h-3 bg-oscuro-700/50 rounded mb-1"></div>
              <div class="w-20 h-4 bg-oscuro-700/50 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabla skeleton -->
      <div class="px-6 pb-6">
        <div class="overflow-x-auto rounded-lg bg-oscuro-850 backdrop-blur-sm">
          <table class="w-full">
            <thead>
              <tr class="border-b border-oscuro-700/50">
                <th class="px-4 py-4 text-left">
                  <div class="w-8 h-6 bg-oscuro-700/50 rounded"></div>
                </th>
                <th class="px-4 py-4 text-left">
                  <div class="w-16 h-6 bg-oscuro-700/50 rounded"></div>
                </th>
                <th class="px-4 py-4 text-center">
                  <div class="w-6 h-6 bg-oscuro-700/50 rounded mx-auto"></div>
                </th>
                <th class="px-4 py-4 text-center hidden sm:table-cell">
                  <div class="w-6 h-6 bg-oscuro-700/50 rounded mx-auto"></div>
                </th>
                <th class="px-4 py-4 text-center hidden sm:table-cell">
                  <div class="w-6 h-6 bg-oscuro-700/50 rounded mx-auto"></div>
                </th>
                <th class="px-4 py-4 text-center hidden sm:table-cell">
                  <div class="w-6 h-6 bg-oscuro-700/50 rounded mx-auto"></div>
                </th>
                <th class="px-4 py-4 text-center hidden md:table-cell">
                  <div class="w-6 h-6 bg-oscuro-700/50 rounded mx-auto"></div>
                </th>
                <th class="px-4 py-4 text-center hidden md:table-cell">
                  <div class="w-6 h-6 bg-oscuro-700/50 rounded mx-auto"></div>
                </th>
                <th class="px-4 py-4 text-center hidden md:table-cell">
                  <div class="w-6 h-6 bg-oscuro-700/50 rounded mx-auto"></div>
                </th>
                <th class="px-4 py-4 text-center">
                  <div class="w-8 h-6 bg-oscuro-700/50 rounded mx-auto"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Filas skeleton -->
              <tr
                v-for="i in 9"
                :key="i"
                class="border-b border-oscuro-700/30 last:border-b-0"
                :class="{
                  'bg-gradient-to-r from-yellow-500/10 via-transparent to-transparent': i === 1,
                  'bg-gradient-to-r from-gray-400/10 via-transparent to-transparent': i === 2,
                  'bg-gradient-to-r from-orange-600/10 via-transparent to-transparent': i === 3
                }"
              >
                <!-- Posición -->
                <td class="px-4 py-5 relative">
                  <!-- Indicador lateral para top 3 -->
                  <div
                    v-if="i <= 3"
                    class="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                    :class="{
                      'bg-gradient-to-b from-yellow-400 to-yellow-600': i === 1,
                      'bg-gradient-to-b from-gray-300 to-gray-500': i === 2,
                      'bg-gradient-to-b from-orange-500 to-amber-700': i === 3
                    }"
                  ></div>
                  <div class="w-10 h-10 bg-oscuro-700/50 rounded-xl"></div>
                </td>

                <!-- Equipo -->
                <td class="px-4 py-5">
                  <div class="w-40 h-5 bg-oscuro-700/50 rounded"></div>
                </td>

                <!-- Partidos Jugados -->
                <td class="px-4 py-5 text-center">
                  <div class="w-6 h-5 bg-oscuro-700/50 rounded mx-auto"></div>
                </td>

                <!-- Partidos Ganados -->
                <td class="px-4 py-5 text-center hidden sm:table-cell">
                  <div class="w-6 h-5 bg-oscuro-700/50 rounded mx-auto"></div>
                </td>

                <!-- Partidos Empatados -->
                <td class="px-4 py-5 text-center hidden sm:table-cell">
                  <div class="w-6 h-5 bg-oscuro-700/50 rounded mx-auto"></div>
                </td>

                <!-- Partidos Perdidos -->
                <td class="px-4 py-5 text-center hidden sm:table-cell">
                  <div class="w-6 h-5 bg-oscuro-700/50 rounded mx-auto"></div>
                </td>

                <!-- Goles a Favor -->
                <td class="px-4 py-5 text-center hidden md:table-cell">
                  <div class="w-8 h-5 bg-oscuro-700/50 rounded mx-auto"></div>
                </td>

                <!-- Goles en Contra -->
                <td class="px-4 py-5 text-center hidden md:table-cell">
                  <div class="w-8 h-5 bg-oscuro-700/50 rounded mx-auto"></div>
                </td>

                <!-- Diferencia de Goles -->
                <td class="px-4 py-5 text-center hidden md:table-cell">
                  <div class="w-12 h-7 bg-oscuro-700/50 rounded-lg mx-auto"></div>
                </td>

                <!-- Puntos -->
                <td class="px-4 py-5">
                  <div class="flex justify-center">
                    <div class="w-14 h-12 bg-oscuro-700/50 rounded-xl"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Leyenda skeleton -->
      <div class="px-6 pb-6">
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-oscuro-800/50 to-oscuro-900/50 border border-oscuro-700/50 backdrop-blur-sm">
          <!-- Efecto de brillo superior -->
          <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-verde-primario/30 to-transparent"></div>

          <div class="px-6 py-4">
            <div class="flex flex-wrap items-center gap-x-8 gap-y-3">
              <div class="w-32 h-4 bg-oscuro-700/50 rounded"></div>
              <div class="w-32 h-4 bg-oscuro-700/50 rounded hidden sm:block"></div>
              <div class="w-32 h-4 bg-oscuro-700/50 rounded hidden sm:block"></div>
              <div class="w-32 h-4 bg-oscuro-700/50 rounded hidden sm:block"></div>
              <div class="w-32 h-4 bg-oscuro-700/50 rounded hidden md:block"></div>
              <div class="w-32 h-4 bg-oscuro-700/50 rounded hidden md:block"></div>
              <div class="w-32 h-4 bg-oscuro-700/50 rounded hidden md:block"></div>
              <div class="w-20 h-4 bg-oscuro-700/50 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
