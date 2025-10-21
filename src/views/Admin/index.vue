<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-4xl sm:text-5xl font-bold text-white">Dashboard</h1>
      <p class="mt-2 text-base sm:text-lg text-oscuro-300">Resumen de alto nivel y acciones rápidas.</p>
    </div>

    <!-- Skeleton Loader -->
    <div v-if="loading" class="space-y-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="bg-oscuro-850 h-32 rounded-2xl animate-pulse"></div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 bg-oscuro-850 h-96 rounded-2xl animate-pulse"></div>
        <div class="bg-oscuro-850 h-96 rounded-2xl animate-pulse"></div>
      </div>
    </div>

    <!-- Contenido del Dashboard -->
    <div v-else class="space-y-8">
      <!-- Barra de Estadísticas Superiores -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <router-link to="/admin/vouchers" class="bg-oscuro-850 p-6 rounded-2xl border border-oscuro-700 hover:border-yellow-500/50 transition-colors">
          <p class="text-sm font-medium text-oscuro-300">Vouchers Pendientes</p>
          <div class="flex items-baseline gap-2 mt-2">
            <p class="text-4xl font-bold text-yellow-400">{{ vouchersPendientes }}</p>
            <p class="text-sm text-yellow-500">por revisar</p>
          </div>
        </router-link>
        <div class="bg-oscuro-850 p-6 rounded-2xl border border-oscuro-700">
          <p class="text-sm font-medium text-oscuro-300">Total Participantes</p>
          <p class="text-4xl font-bold text-white mt-2">{{ totalParticipantes }}</p>
        </div>
        <div class="bg-oscuro-850 p-6 rounded-2xl border border-oscuro-700">
          <p class="text-sm font-medium text-oscuro-300">Total Equipos</p>
          <p class="text-4xl font-bold text-white mt-2">{{ totalEquipos }}</p>
        </div>
        <div class="bg-oscuro-850 p-6 rounded-2xl border border-oscuro-700">
          <p class="text-sm font-medium text-oscuro-300">Deporte Popular</p>
          <p class="text-4xl font-bold text-green-400 mt-2 truncate">{{ deporteMasPopular }}</p>
        </div>
      </div>

      <!-- Contenido Principal -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Columna Izquierda -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Estado de Torneos -->
          <div class="bg-oscuro-850 rounded-2xl border border-oscuro-700 p-6">
            <h2 class="text-xl font-semibold text-white mb-4">Estado de Torneos</h2>
            <div class="space-y-3">
              <router-link v-for="torneo in tournamentSummaries" :key="torneo.valor" :to="`/admin/partidos?deporte=${torneo.valor}`" class="group flex items-center justify-between p-4 bg-oscuro-800 hover:bg-oscuro-700 rounded-xl transition-colors">
                <div class="flex items-center gap-4">
                  <i :class="[torneo.icono, 'text-2xl']" class="w-6 text-center text-oscuro-300 group-hover:text-white"></i>
                  <div>
                    <p class="font-semibold text-white">{{ torneo.etiqueta }}</p>
                    <p class="text-sm text-oscuro-400 group-hover:text-oscuro-300">{{ torneo.detalle }}</p>
                  </div>
                </div>
                <span class="px-3 py-1 rounded-full text-sm font-semibold" :class="estadoClasses[torneo.estado]">{{ torneo.estado }}</span>
              </router-link>
            </div>
          </div>

          <!-- Gráfico de Equipos por Ciclo -->
          <div class="bg-oscuro-850 rounded-2xl border border-oscuro-700 p-6">
            <h2 class="text-xl font-semibold text-white mb-4">Distribución de Equipos por Ciclo</h2>
            <div class="flex justify-between items-end h-64 space-x-2 sm:space-x-4 pt-4">
              <div v-for="item in equiposPorCiclo" :key="item.ciclo" class="flex flex-col items-center flex-1 group h-full">
                <div class="text-white font-bold text-sm mb-1 opacity-0 group-hover:opacity-100 transition-opacity">{{ item.cantidad }}</div>
                <div class="w-full bg-green-500/20 hover:bg-green-500/40 rounded-t-lg transition-all duration-300 ease-in-out flex-grow" :style="{ transform: `scaleY(${item.porcentaje / 100})` , transformOrigin: 'bottom'}"></div>
                <div class="text-sm font-semibold text-oscuro-300 mt-2">{{ item.ciclo }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna Derecha -->
        <div class="space-y-8">
          <!-- Navegación Rápida -->
          <div class="bg-oscuro-850 rounded-2xl border border-oscuro-700 p-6">
            <h2 class="text-xl font-semibold text-white mb-4">Navegación Rápida</h2>
            <div class="space-y-4">
              <router-link to="/admin/vouchers" class="group block p-4 bg-oscuro-800 hover:bg-oscuro-700 rounded-xl transition-colors">
                <p class="font-semibold text-white">Validar Vouchers</p>
                <p class="text-sm text-oscuro-400 group-hover:text-oscuro-300">Ir a la página de validación</p>
              </router-link>
              <router-link to="/admin/equipos" class="group block p-4 bg-oscuro-800 hover:bg-oscuro-700 rounded-xl transition-colors">
                <p class="font-semibold text-white">Gestionar Equipos</p>
                <p class="text-sm text-oscuro-400 group-hover:text-oscuro-300">Ver todos los equipos inscritos</p>
              </router-link>
              <router-link to="/admin/partidos" class="group block p-4 bg-oscuro-800 hover:bg-oscuro-700 rounded-xl transition-colors">
                <p class="font-semibold text-white">Administrar Torneos</p>
                <p class="text-sm text-oscuro-400 group-hover:text-oscuro-300">Generar brackets y registrar resultados</p>
              </router-link>
            </div>
          </div>

          <!-- Ranking de Deportes -->
          <div class="bg-oscuro-850 rounded-2xl border border-oscuro-700 p-6">
            <h2 class="text-xl font-semibold text-white mb-4">Ranking de Deportes</h2>
            <ul class="space-y-4">
              <li v-for="(deporte, index) in rankingDeportes" :key="deporte.nombre" class="flex items-center gap-4">
                <span class="font-bold text-lg w-6 text-center" :class="index === 0 ? 'text-yellow-400' : 'text-oscuro-400'">{{ index + 1 }}</span>
                <i :class="[deporte.icono, 'text-xl']" class="w-6 text-center text-oscuro-300"></i>
                <span class="font-medium text-white flex-grow">{{ deporte.nombre }}</span>
                <span class="font-bold text-white">{{ deporte.cantidad }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDashboard } from '@/composables/useDashboard';

const { 
  loading,
  totalEquipos,
  vouchersPendientes,
  totalParticipantes,
  equiposPorCiclo,
  tournamentSummaries,
  deporteMasPopular,
  rankingDeportes
} = useDashboard();

const estadoClasses = {
  'En Progreso': 'bg-blue-500/20 text-blue-300',
  'Finalizado': 'bg-green-500/20 text-green-300',
  'Pendiente': 'bg-yellow-500/20 text-yellow-300',
  'No Iniciado': 'bg-oscuro-700 text-oscuro-300'
};
</script>
