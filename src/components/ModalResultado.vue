<template>
  <div v-if="visible" class="fixed inset-0 bg-black/80 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50" @click="cerrarModal">
    <div class="bg-oscuro-800 rounded-xl shadow-2xl border border-oscuro-600 p-6 w-full max-w-md mx-4" @click.stop>
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-white">
          {{ esEdicion ? 'Editar Resultado' : 'Finalizar Partido' }}
        </h2>
        <button @click="cerrarModal" class="text-oscuro-400 hover:text-white">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Equipos y puntajes -->
      <div class="space-y-4 mb-6">
        <!-- Equipo 1 -->
        <div class="bg-oscuro-700 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-oscuro-500 rounded-full flex items-center justify-center">
                <span class="text-sm font-bold text-white">{{ partido.equipo1?.ciclo }}</span>
              </div>
              <span class="font-medium text-white">{{ partido.equipo1?.nombre_equipo }}</span>
            </div>
          </div>
          <input
            v-model.number="puntajes.equipo1"
            type="number"
            min="0"
            class="w-full bg-oscuro-600 border border-oscuro-500 rounded-lg px-4 py-3 text-white text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="0"
          />
        </div>

        <!-- VS -->
        <div class="text-center">
          <span class="text-lg font-bold text-oscuro-400">VS</span>
        </div>

        <!-- Equipo 2 -->
        <div class="bg-oscuro-700 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-oscuro-500 rounded-full flex items-center justify-center">
                <span class="text-sm font-bold text-white">{{ partido.equipo2?.ciclo }}</span>
              </div>
              <span class="font-medium text-white">{{ partido.equipo2?.nombre_equipo }}</span>
            </div>
          </div>
          <input
            v-model.number="puntajes.equipo2"
            type="number"
            min="0"
            class="w-full bg-oscuro-600 border border-oscuro-500 rounded-lg px-4 py-3 text-white text-center text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="0"
          />
        </div>
      </div>

      <!-- Ganador actual -->
      <div v-if="ganadorActual" class="mb-4 p-3 bg-green-900/30 border border-green-700 rounded-lg">
        <div class="flex items-center gap-2 text-green-200">
          <i class="fas fa-crown text-green-400"></i>
          <span class="font-medium">
            {{ ganadorActual === 'empate' ? 'Empate' : `Ganador: ${ganadorActual.nombre_equipo}` }}
          </span>
        </div>
      </div>

      <!-- Botones -->
      <div class="flex gap-3">
        <button
          @click="cerrarModal"
          class="flex-1 bg-oscuro-600 hover:bg-oscuro-500 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          Cancelar
        </button>
        <button
          @click="confirmarResultado"
          :disabled="!puntajesValidos"
          class="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-oscuro-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
        >
          {{ esEdicion ? 'Guardar Cambios' : 'Finalizar Partido' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  partido: {
    type: Object,
    default: () => ({})
  },
  esEdicion: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['cerrar', 'confirmar']);

const puntajes = ref({
  equipo1: 0,
  equipo2: 0
});

// Calcular ganador automáticamente
const ganadorActual = computed(() => {
  if (puntajes.value.equipo1 > puntajes.value.equipo2) {
    return props.partido.equipo1;
  } else if (puntajes.value.equipo2 > puntajes.value.equipo1) {
    return props.partido.equipo2;
  } else if (puntajes.value.equipo1 === puntajes.value.equipo2 && puntajes.value.equipo1 > 0) {
    return 'empate';
  }
  return null;
});

const puntajesValidos = computed(() => {
  return puntajes.value.equipo1 >= 0 && puntajes.value.equipo2 >= 0 &&
         (puntajes.value.equipo1 !== 0 || puntajes.value.equipo2 !== 0);
});

// Cargar puntajes existentes cuando es edición
watch(() => props.visible, (visible) => {
  if (visible && props.esEdicion && props.partido.resultado) {
    puntajes.value = {
      equipo1: props.partido.resultado.equipo1 || 0,
      equipo2: props.partido.resultado.equipo2 || 0
    };
  } else if (visible && !props.esEdicion) {
    puntajes.value = { equipo1: 0, equipo2: 0 };
  }
});

const cerrarModal = () => {
  emit('cerrar');
};

const confirmarResultado = () => {
  const ganadorId = ganadorActual.value === 'empate' ? null :
                   ganadorActual.value?.id_equipo || null;

  const perdedorId = ganadorId === props.partido.equipo1?.id_equipo ? props.partido.equipo2?.id_equipo :
                    ganadorId === props.partido.equipo2?.id_equipo ? props.partido.equipo1?.id_equipo : null;

  emit('confirmar', {
    puntos_equipo_1: puntajes.value.equipo1,
    puntos_equipo_2: puntajes.value.equipo2,
    ganador_id: ganadorId,
    perdedor_id: perdedorId
  });

  // Resetear después de confirmar
  puntajes.value = { equipo1: 0, equipo2: 0 };
};
</script>