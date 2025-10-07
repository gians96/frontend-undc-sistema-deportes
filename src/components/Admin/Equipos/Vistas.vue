<template>
  <div v-if="deporteSeleccionado">
    <div class="bg-gradient-to-br from-oscuro-800 to-oscuro-700 rounded-xl shadow-lg border border-oscuro-600 p-8 mb-8">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div class="mb-6 lg:mb-0">
          <div class="flex items-center mb-3">
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
              <i class="fas fa-trophy text-white text-xl"></i>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-white">
                Equipos de <span class="text-green-400 glow-text">{{ deporteSeleccionado?.etiqueta }}</span>
              </h2>
              <div class="flex items-center mt-1">
                <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <p class="text-oscuro-200 font-medium">{{ equipos.length }} equipos registrados</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Toggle para cambiar vista -->
        <div class="bg-oscuro-700 rounded-xl p-2 shadow-lg border border-oscuro-600">
          <div class="flex space-x-2">
            <button
              @click="$emit('cambiarVista', 'equipos')"
              :class="[
                'px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer',
                vistaActual === 'equipos'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                  : 'text-oscuro-200 hover:text-green-400 hover:bg-oscuro-600'
              ]"
            >
              <i class="fas fa-users"></i>
              <span class="hidden sm:inline">Ver Equipos</span>
            </button>
            <button
              @click="$emit('cambiarVista', 'sorteo')"
              :class="[
                'px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer',
                vistaActual === 'sorteo'
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                  : 'text-oscuro-200 hover:text-yellow-400 hover:bg-oscuro-600'
              ]"
            >
              <i class="fas fa-random"></i>
              <span class="hidden sm:inline">Sorteo</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Vista de equipos -->
    <Equipos
      v-if="vistaActual === 'equipos'"
      :equipos="equipos"
      :loading="loading"
    />

    <!-- Vista de sorteo -->
    <Sorteo
      v-else-if="vistaActual === 'sorteo'"
      :equipos="equipos"
      :enfrentamientos="enfrentamientos"
      :equipo-finalista="equipoFinalista"
      :puede-realizar-sorteo="puedeRealizarSorteo"
      :sorteo-realizado="sorteoRealizado"
      :tiene-enfrentamientos-guardados="tieneEnfrentamientosGuardados"
      :guardando-sorteo="guardandoSorteo"
      @comenzar-sorteo="$emit('comenzarSorteo')"
      @guardar-sorteo="$emit('guardarSorteo')"
      @reiniciar-sorteo="$emit('reiniciarSorteo')"
    />
  </div>

  <!-- Mensaje inicial -->
  <div v-else class="bg-gradient-to-br from-oscuro-800 to-oscuro-700 rounded-xl shadow-lg border border-oscuro-600 p-12 text-center">
    <div class="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
      <i class="fas fa-hand-pointer text-3xl text-white"></i>
    </div>
    <h3 class="text-2xl font-bold text-white mb-3">Selecciona un deporte</h3>
    <p class="text-oscuro-200 text-lg mb-6">Elige un deporte de arriba para comenzar a gestionar los equipos inscritos</p>
    <div class="inline-flex items-center bg-green-900/30 border border-green-500/30 rounded-lg px-4 py-2">
      <i class="fas fa-info-circle text-green-400 mr-2"></i>
      <span class="text-green-300 font-medium text-sm">Podrás ver equipos y generar sorteos</span>
    </div>
  </div>
</template>

<script setup>
import Equipos from './Equipos.vue'
import Sorteo from './Sorteo.vue'

defineProps({
  deporteSeleccionado: {
    type: Object,
    default: null
  },
  equipos: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  vistaActual: {
    type: String,
    required: true
  },
  enfrentamientos: {
    type: Array,
    required: true
  },
  equipoFinalista: {
    type: Object,
    default: null
  },
  puedeRealizarSorteo: {
    type: Boolean,
    required: true
  },
  sorteoRealizado: {
    type: Boolean,
    required: true
  },
  tieneEnfrentamientosGuardados: {
    type: Boolean,
    required: true
  },
  guardandoSorteo: {
    type: Boolean,
    default: false
  }
})

defineEmits(['cambiarVista', 'comenzarSorteo', 'guardarSorteo', 'reiniciarSorteo'])
</script>