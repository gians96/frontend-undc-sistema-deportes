<template>
  <div
    class="bg-oscuro-850 rounded-2xl shadow-lg border border-oscuro-700 p-4 sm:p-6 mb-4 sm:mb-6"
  >
    <div
      class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <div>
        <h2 class="text-2xl sm:text-3xl font-bold text-white">
          Torneo
          <span class="text-green-400 glow-text">{{
            deporteSeleccionado?.etiqueta
          }}</span>
        </h2>
        <p class="text-sm sm:text-base text-oscuro-300 mt-1">
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
      </div>
    </div>

    <div
      v-if="!puedeGenerarTorneo && estadoTorneo === 'no_iniciado'"
      class="mt-4 p-3 lg:p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg"
    >
      <div class="flex items-start gap-2 text-yellow-200">
        <i class="fa-solid fa-exclamation-triangle mt-0.5 flex-shrink-0"></i>
        <span class="font-medium text-sm lg:text-base">
          Se necesitan mínimo 4 equipos para iniciar el sorteo
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  deporteSeleccionado: {
    type: Object,
    required: true,
  },
  cantidadEquipos: {
    type: Number,
    required: true,
  },
  estadoTorneo: {
    type: String,
    required: true,
  },
});

defineEmits(["generar"]);

const puedeGenerarTorneo = computed(() => {
  return props.cantidadEquipos >= 4;
});
</script>
