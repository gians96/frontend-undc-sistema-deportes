<template>
  <div class="bg-oscuro-800 rounded-xl shadow-lg border border-oscuro-600 p-4 lg:p-6 mb-6">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 class="text-lg lg:text-xl font-semibold text-white">
          Torneo de {{ deporteSeleccionado.etiqueta }}
        </h2>
        <p class="text-sm lg:text-base text-oscuro-200">
          {{ cantidadEquipos }} equipos validados
        </p>
      </div>
      <div class="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
        <button
          v-if="estadoTorneo === 'no_iniciado'"
          @click="$emit('generar')"
          :disabled="!puedeGenerarTorneo"
          class="bg-green-600 hover:bg-green-700 disabled:bg-oscuro-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 glow-text text-sm lg:text-base"
        >
          <i class="fa-solid fa-trophy"></i>
          Generar Torneo
        </button>
        <button
          v-if="estadoTorneo !== 'no_iniciado'"
          @click="$emit('reiniciar')"
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 text-sm lg:text-base"
        >
          <i class="fa-solid fa-refresh"></i>
          Reiniciar
        </button>
      </div>
    </div>

    <div v-if="!puedeGenerarTorneo && estadoTorneo === 'no_iniciado'"
         class="mt-4 p-3 lg:p-4 bg-yellow-900 border border-yellow-700 rounded-lg">
      <div class="flex items-start gap-2 text-yellow-200">
        <i class="fa-solid fa-exclamation-triangle mt-0.5 flex-shrink-0"></i>
        <span class="font-medium text-sm lg:text-base">
          Se necesitan entre 6 y 16 equipos validados para generar un torneo
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  deporteSeleccionado: {
    type: Object,
    required: true
  },
  cantidadEquipos: {
    type: Number,
    required: true
  },
  estadoTorneo: {
    type: String,
    required: true
  }
});

defineEmits(['generar', 'reiniciar']);

const puedeGenerarTorneo = computed(() => {
  return props.cantidadEquipos >= 6 && props.cantidadEquipos <= 16;
});
</script>
