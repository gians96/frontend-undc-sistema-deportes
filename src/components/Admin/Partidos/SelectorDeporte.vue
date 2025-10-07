<template>
  <div class="bg-oscuro-800 rounded-xl shadow-lg border border-oscuro-600 p-4 lg:p-6 mb-6">
    <h2 class="text-lg lg:text-xl font-semibold text-white mb-4">Seleccionar Deporte</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
      <button
        v-for="deporte in deportes"
        :key="deporte.valor"
        @click="$emit('seleccionar', deporte)"
        class="p-3 lg:p-4 border-2 rounded-lg text-center transition-all duration-200 hover:bg-oscuro-700"
        :class="deporteSeleccionado?.valor === deporte.valor
          ? 'border-green-500 bg-oscuro-700 text-green-400'
          : 'border-oscuro-500 hover:border-green-400 text-white'"
      >
        <i :class="deporte.icono" class="text-xl lg:text-2xl mb-2"></i>
        <div class="font-medium text-sm lg:text-base">{{ deporte.etiqueta }}</div>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  deportes: {
    type: Array,
    required: true
  },
  deporteSeleccionado: {
    type: Object,
    default: null
  }
});

defineEmits(['seleccionar']);
</script>
