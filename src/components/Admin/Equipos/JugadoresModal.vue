<template>
  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center z-50 animate-in fade-in-0 duration-300"
    @click.self="$emit('close')"
  >
    <!-- Contenedor del Modal estilo One UI -->
    <div
      class="w-full sm:max-w-lg bg-oscuro-900 rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-300"
      @click.stop
    >
      <!-- Botón de cerrar flotante -->
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 w-9 h-9 rounded-full bg-oscuro-800/80 hover:bg-oscuro-700 text-oscuro-300 hover:text-white transition-colors flex items-center justify-center z-10"
      >
        <CiculoCancelarIcono class="w-6 h-6" />
      </button>

      <!-- Cabecera Grande (Viewing Area) -->
      <div class="p-6 flex-shrink-0">
        <h3 class="text-xl font-bold text-white mb-2">Jugadores</h3>
        <p class="text-xl sm:text-2xl font-semibold text-green-400 truncate">
          {{ equipo.equipo_nombre }}
        </p>
        <div class="flex gap-4">
          <span
            class="text-sm bg-green-800/20 text-green-400 py-0.5 px-3 rounded-md font-semibold"
            >{{ equipo.ciclo }} - {{ equipo.seccion }}</span
          >
          <span class="text-oscuro-50 font-semibold flex items-center gap-2">
            <i :class="deporte.icono" class="text-lg text-green-400"></i>
            {{ deporte.etiqueta }}
          </span>
        </div>
      </div>

      <!-- Contenido del Modal (Lista de Jugadores) -->
      <div class="overflow-y-auto px-2 sm:px-4">
        <!-- Skeleton Loader -->
        <div v-if="cargando" class="max-h-[50vh] p-2 space-y-3">
          <div
            v-for="i in 5"
            :key="`skeleton-${i}`"
            class="flex items-center gap-4 bg-oscuro-800 rounded-xl p-4 animate-pulse"
          >
            <div
              class="flex-shrink-0 w-10 h-10 bg-oscuro-700 rounded-full"
            ></div>
            <div class="flex-1 space-y-2">
              <div class="h-5.5 bg-oscuro-700 rounded w-3/4"></div>
              <div
                v-if="!isMobile"
                class="h-4 bg-oscuro-700 rounded w-1/2"
              ></div>
            </div>
          </div>
        </div>

        <div
          v-else-if="jugadores && jugadores.length > 0"
          class="max-h-[50vh] p-2 space-y-3"
        >
          <div
            v-for="(jugador, index) in jugadores"
            :key="jugador.jugador_id || index"
            class="flex items-center gap-4 bg-oscuro-800 rounded-xl p-4"
          >
            <div
              class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-oscuro-700 rounded-full font-bold text-green-400"
            >
              {{ index + 1 }}
            </div>
            <div class="flex-1">
              <p class="text-base font-medium text-white">
                {{ jugador.nombre }}
              </p>
              <p
                v-if="!isMobile"
                class="text-sm text-oscuro-300 font-mono mt-0.5"
              >
                Código: {{ jugador.codigo_estudiante }}
              </p>
            </div>
          </div>
        </div>

        <div v-else class="py-20 text-center">
          <i class="fas fa-users text-5xl text-oscuro-600"></i>
          <p class="text-base text-oscuro-400 mt-4">
            Este equipo aún no tiene jugadores.
          </p>
        </div>
      </div>

      <!-- Pie del Modal (Action Area) -->
      <div class="p-4 sm:p-5 mt-2 flex-shrink-0">
        <button
          @click="$emit('close')"
          class="w-full bg-oscuro-700 hover:bg-oscuro-600 text-white font-bold py-3 px-5 rounded-xl transition-colors text-base"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, computed } from "vue";
import { useScreenSize } from "@/composables/useScreenSize.js";
import CiculoCancelarIcono from "@/components/icons/CiculoCancelarIcono.vue";
import { useOpcionesDeporte } from "@/stores/deporte";

const { isMobile } = useScreenSize();

const props = defineProps({
  equipo: {
    type: Object,
    required: true,
  },
  jugadores: {
    type: Array,
    default: () => [],
  },
  cargando: {
    type: Boolean,
    default: false,
  },
});

const opcionesDeporte = useOpcionesDeporte();
const deporte = computed(() => {
  return (
    opcionesDeporte.obtenerDeportes.find(
      (d) => d.valor === props.equipo.deporte_id
    ) || { etiqueta: "Desconocido", icono: "fas fa-question" }
  );
});

defineEmits(["close"]);

onMounted(() => {
  // Previene el scroll del body mientras el modal está abierto
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  // Restaura el scroll del body
  document.body.style.overflow = "auto";
});
</script>
