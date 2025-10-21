<template>
  <Transition
    appear
    enter-active-class="transition-opacity duration-300 ease-out"
    leave-active-class="transition-opacity duration-200 ease-in"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
      @click.self="$emit('close')"
    >
      <Transition
        appear
        enter-active-class="transition-transform duration-300 ease-out"
        leave-active-class="transition-transform duration-200 ease-in"
        enter-from-class="translate-y-full"
        leave-to-class="translate-y-full"
      >
        <div
          class="fixed bottom-0 left-0 right-0 bg-oscuro-850 rounded-t-4xl shadow-2xl border border-oscuro-700 max-h-[85vh] flex flex-col"
        >
          <!-- Handle -->
          <div class="py-3 flex justify-center" @click="$emit('close')">
            <div class="w-12 h-1.5 bg-oscuro-700 rounded-full"></div>
          </div>

          <!-- Cabecera Centrada -->
          <div class="px-5 pb-4 text-center">
            <h3 class="text-xl font-bold text-white">{{ equipo.equipo_nombre }}</h3>
            <p class="text-sm text-oscuro-300">Lista de participantes</p>
          </div>

          <!-- Contenido (Lista de Jugadores con scroll) -->
          <div class="overflow-y-auto px-2 pb-5">
            <div v-if="cargando" class="py-12 text-center">
              <i class="fas fa-spinner fa-spin text-2xl text-green-400"></i>
              <p class="text-sm text-oscuro-300 mt-3">Cargando jugadores...</p>
            </div>
            
            <!-- Lista Moderna -->
            <div v-else-if="jugadores && jugadores.length > 0" class="divide-y divide-oscuro-700">
              <div
                v-for="(jugador, index) in jugadores"
                :key="jugador.jugador_id || index"
                class="px-4 py-3 flex items-center gap-4"
              >
                <div class="w-10 h-10 bg-oscuro-800 rounded-full flex items-center justify-center border border-oscuro-700 flex-shrink-0">
                  <span class="font-bold text-green-400 text-sm">{{ index + 1 }}</span>
                </div>
                <div class="flex-1">
                  <p class="text-base font-medium text-white">{{ jugador.nombre }}</p>
                  <p class="text-sm text-oscuro-400 font-mono">{{ jugador.codigo_estudiante }}</p>
                </div>
              </div>
            </div>

            <div v-else class="py-12 text-center">
              <p class="text-sm text-oscuro-400">No se encontraron jugadores para este equipo.</p>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

defineProps({
  equipo: { type: Object, required: true },
  jugadores: { type: Array, default: () => [] },
  cargando: { type: Boolean, default: false }
})

defineEmits(['close'])

onMounted(() => {
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.body.style.overflow = 'auto';
});
</script>
