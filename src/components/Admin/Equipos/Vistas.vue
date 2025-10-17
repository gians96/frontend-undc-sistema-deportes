<template>
  <!-- Vista de equipos -->
  <Equipos
    v-if="deporteSeleccionado"
    :equipos="equipos"
    :loading="loading"
  />

  <!-- Mensaje inicial cuando no hay deporte seleccionado -->
  <div v-else class="bg-oscuro-850 rounded-xl shadow-lg border border-oscuro-700 p-16 text-center">
    <div class="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-500/30">
      <i class="fas fa-hand-pointer text-3xl text-green-400"></i>
    </div>
    <h3 class="text-xl font-bold text-white mb-2">Selecciona un deporte</h3>
    <p class="text-oscuro-300">Elige un deporte arriba para ver los equipos inscritos</p>
  </div>
</template>

<script setup>
import Equipos from './Equipos.vue'

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
  }
})
</script>