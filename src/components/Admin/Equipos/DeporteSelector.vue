<template>
  <div class="bg-gradient-to-br from-oscuro-800 to-oscuro-700 rounded-xl shadow-lg border border-oscuro-600 p-6 mb-6">

    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <button
        v-for="deporte in deportes"
        :key="deporte.valor"
        @click="$emit('seleccionarDeporte', deporte)"
        :class="[
          'group relative p-6 rounded-xl border-2 transition-all duration-300 text-center font-medium transform cursor-pointer hover:shadow-lg',
          deporteSeleccionado?.valor === deporte.valor
            ? 'border-green-500 bg-gradient-to-br from-green-900/30 to-green-800/40 text-green-400 shadow-green-500/20 shadow-lg '
            : 'border-oscuro-500 bg-oscuro-700 hover:border-green-400 hover:bg-oscuro-600 text-oscuro-200 hover:text-green-300'
        ]"
      >
        <div class="relative">
          <div :class="[
            'inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 transition-all duration-300',
            deporteSeleccionado?.valor === deporte.valor
              ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg'
              : 'bg-oscuro-600 text-oscuro-300 group-hover:bg-green-500 group-hover:text-white'
          ]">
            <i :class="deporte.icono" class="text-xl"></i>
          </div>

          <h3 class="font-semibold text-sm">{{ deporte.etiqueta }}</h3>

          <!-- Indicator dot for selected state -->
          <div
            v-if="deporteSeleccionado?.valor === deporte.valor"
            class="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <i class="fas fa-check text-white text-xs"></i>
          </div>

          <!-- Glow effect for selected state -->
          <div
            v-if="deporteSeleccionado?.valor === deporte.valor"
            class="absolute inset-0 rounded-xl bg-green-500/10 animate-pulse"
          ></div>
        </div>
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
})

defineEmits(['seleccionarDeporte'])
</script>