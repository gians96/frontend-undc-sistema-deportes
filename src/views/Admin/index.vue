<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
      <p class="mt-1 text-oscuro-300">Resumen general del estado del torneo.</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card de Inscripciones -->
      <div class="bg-oscuro-800 p-6 rounded-xl border border-oscuro-700 flex items-center gap-6 transition-all hover:border-blue-500/50 hover:-translate-y-1">
        <div class="p-4 bg-blue-900/50 rounded-lg border border-blue-500/30">
          <i class="fa-solid fa-users text-blue-400 text-2xl"></i>
        </div>
        <div>
          <p class="text-sm font-medium text-oscuro-300">Inscripciones</p>
          <p class="text-3xl font-bold text-white">124</p>
        </div>
      </div>

      <!-- Card de Vouchers -->
      <div class="bg-oscuro-800 p-6 rounded-xl border border-oscuro-700 flex items-center gap-6 transition-all hover:border-green-500/50 hover:-translate-y-1">
        <div class="p-4 bg-green-900/50 rounded-lg border border-green-500/30">
          <i class="fa-solid fa-receipt text-green-400 text-2xl"></i>
        </div>
        <div>
          <p class="text-sm font-medium text-oscuro-300">Vouchers</p>
          <p class="text-3xl font-bold text-white">89</p>
        </div>
      </div>

      <!-- Card de Partidos -->
      <div class="bg-oscuro-800 p-6 rounded-xl border border-oscuro-700 flex items-center gap-6 transition-all hover:border-purple-500/50 hover:-translate-y-1">
        <div class="p-4 bg-purple-900/50 rounded-lg border border-purple-500/30">
          <i class="fa-solid fa-futbol text-purple-400 text-2xl"></i>
        </div>
        <div>
          <p class="text-sm font-medium text-oscuro-300">Partidos</p>
          <p class="text-3xl font-bold text-white">15</p>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-oscuro-800 rounded-xl border border-oscuro-700 shadow-lg">
      <div class="p-5 border-b border-oscuro-700">
        <h2 class="text-lg font-semibold text-white">Actividad Reciente</h2>
      </div>
      <div class="p-3 sm:p-4">
        <div class="space-y-2">
          <!-- Item 1 -->
          <div class="flex items-center gap-4 p-3 rounded-lg hover:bg-oscuro-700/50">
            <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-green-900/50 rounded-full border border-green-500/30">
              <i class="fa-solid fa-check text-green-400"></i>
            </div>
            <div class="flex-grow">
              <p class="text-sm font-medium text-white">Nueva inscripción aprobada</p>
              <p class="text-xs text-oscuro-400">Equipo 'Los Invencibles'</p>
            </div>
            <p class="text-xs text-oscuro-400 flex-shrink-0">Hace 2 min</p>
          </div>

          <!-- Item 2 -->
          <div class="flex items-center gap-4 p-3 rounded-lg hover:bg-oscuro-700/50">
            <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-900/50 rounded-full border border-blue-500/30">
              <i class="fa-solid fa-upload text-blue-400"></i>
            </div>
            <div class="flex-grow">
              <p class="text-sm font-medium text-white">Voucher pendiente de revisión</p>
              <p class="text-xs text-oscuro-400">Equipo 'Furia FC'</p>
            </div>
            <p class="text-xs text-oscuro-400 flex-shrink-0">Hace 5 min</p>
          </div>

          <!-- Item 3 -->
          <div class="flex items-center gap-4 p-3 rounded-lg hover:bg-oscuro-700/50">
            <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-purple-900/50 rounded-full border border-purple-500/30">
              <i class="fa-solid fa-calendar-days text-purple-400"></i>
            </div>
            <div class="flex-grow">
              <p class="text-sm font-medium text-white">Partido programado</p>
              <p class="text-xs text-oscuro-400">'Los Invencibles' vs 'Furia FC'</p>
            </div>
            <p class="text-xs text-oscuro-400 flex-shrink-0">Hace 10 min</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
