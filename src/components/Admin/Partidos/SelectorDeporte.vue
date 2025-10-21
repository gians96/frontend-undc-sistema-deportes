<template>
  <div class="mb-4">
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      <button
        v-for="deporte in deportes"
        :key="deporte.valor"
        @click="$emit('seleccionar', deporte)"
        :class="[
          'group relative px-3 py-3 rounded-xl border-2 transition-all duration-300 font-medium transform cursor-pointer',
          deporteSeleccionado?.valor === deporte.valor
            ? 'border-green-500 bg-gradient-to-br from-green-900/40 to-green-800/50 text-green-400 shadow-lg shadow-green-500/20'
            : 'border-oscuro-700 bg-oscuro-850 hover:border-green-400/50 hover:bg-oscuro-800 text-oscuro-200 hover:text-green-300'
        ]"
      >
        <div class="flex items-center justify-center gap-3">
          <!-- Icono -->
          <div :class="[
            'flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300',
            deporteSeleccionado?.valor === deporte.valor
              ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
              : 'bg-oscuro-700 text-oscuro-300 group-hover:bg-green-500/80 group-hover:text-white'
          ]">
            <i :class="deporte.icono" class="text-xl"></i>
          </div>

          <!-- Nombre del deporte -->
          <div class="flex-1 text-left min-w-0">
            <h3 class="font-bold text-base truncate">{{ deporte.etiqueta }}</h3>
          </div>

          <!-- Efecto glow para seleccionado -->
          <div
            v-if="deporteSeleccionado?.valor === deporte.valor"
            class="absolute inset-0 rounded-xl bg-green-500/5 animate-pulse pointer-events-none"
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
});

defineEmits(['seleccionar']);
</script>
