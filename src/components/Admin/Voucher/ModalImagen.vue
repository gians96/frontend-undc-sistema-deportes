<template>
  <div v-if="mostrar" class="fixed inset-0 z-50 hidden md:block">
    <!-- Overlay -->
    <div
      class="fixed inset-0 bg-black/70 backdrop-blur-xs"
      @click="$emit('cerrar')"
    ></div>

    <!-- Contenido del Modal -->
    <div
      v-if="!imageLoading"
      class="flex h-full items-center justify-center p-4"
    >
      <div
        class="relative w-full max-w-6xl bg-oscuro-850/80 backdrop-blur-2xl border border-oscuro-700/70 rounded-3xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
      >
        <div class="flex-grow grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
          <!-- Columna Izquierda: Imagen -->
          <div
            class="relative group h-full p-4 lg:col-span-1 border-r border-oscuro-700/70"
          >
            <div
              class="relative h-full rounded-2xl overflow-hidden bg-black/80 flex items-center justify-center"
            >
              <img
                v-if="!errorImagen"
                :src="imagenUrl"
                alt="Comprobante de pago"
                class="w-auto h-full object-contain mx-auto transition-transform duration-300"
              />
              <div
                v-if="errorImagen"
                class="w-full h-full flex flex-col items-center justify-center text-oscuro-400 p-8"
              >
                <i class="fas fa-image-slash text-5xl mb-4"></i>
                <p class="font-semibold">Error al cargar la imagen</p>
              </div>
              <a
                :href="imagenUrl"
                target="_blank"
                class="absolute top-3 right-3 w-9 h-9 bg-black/30 rounded-full flex items-center justify-center text-white/80 hover:bg-black/60 hover:text-white transition-all"
                title="Abrir en nueva pestaña"
              >
                <i class="fas fa-expand"></i>
              </a>
            </div>
          </div>

          <!-- Columna Derecha: Información -->
          <div class="h-full flex flex-col lg:col-span-2 overflow-hidden">
            <!-- Cabecera -->
            <div class="p-5 border-b border-white/10">
              <div class="flex justify-between items-start">
                <div class="flex items-center gap-3">
                  <!-- Línea 1: Nombre del Equipo y Estado -->
                  <div
                    class="w-3 h-3 rounded-full ring-4 flex-shrink-0"
                    :class="statusStyles.dotClasses"
                  ></div>
                  <h2 class="text-2xl font-bold text-white">
                    {{ voucherActualizado.nombre_equipo }}
                  </h2>
                </div>
                <div></div>
                <button
                  @click="$emit('cerrar')"
                  class="w-9 h-9 rounded-full text-oscuro-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>

            <!-- Hero Monto y Operación -->
            <div class="px-5 pt-4 text-center bg-oscuro-950/10 items-center align-middle">
              <!-- Metadatos -->
              <div
                class="flex items-center justify-center gap-4 mb-2 text-center"
              >
                <div class="gap-10 flex">
                  <span
                    :class="statusConfig.classes"
                    class="inline-block px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap"
                  >
                    {{ statusConfig.text }}
                  </span>

                  <span
                    v-if="cicloInfo"
                    class="flex items-center gap-2 text-lg font-semibold text-white"
                  >
                    <i class="fas fa-graduation-cap"></i>
                    <span>{{ cicloInfo.etiqueta }} - {{ voucherActualizado.seccion }} Ciclo</span>
                  </span>

                  <span
                    v-if="sportInfo"
                    class="flex items-center gap-2 text-sm font-semibold text-oscuro-200"
                  >
                    <i :class="sportInfo.icono"></i>
                    <span>{{ sportInfo.etiqueta }}</span>
                  </span>
                </div>
              </div>

              <!-- Contenido principal -->
              <div class="grid grid-cols-2 gap-4 divide-x divide-white/10">
                <div class="flex-1">
                  <p class="text-sm font-medium" :class="statusStyles.color">
                    Monto Pagado
                  </p>
                  <p
                    class="text-5xl font-bold tracking-tighter"
                    :class="[statusStyles.color, statusStyles.glow]"
                  >
                    S/ {{ voucherActualizado.monto }}
                  </p>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-oscuro-300">
                    Nro. Operación
                  </p>
                  <p
                    class="text-5xl font-bold text-white/90 font-mono tracking-tighter"
                  >
                    {{ voucherActualizado.numero_voucher }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Detalles con Scroll -->
            <div
              class="flex-grow p-5 space-y-6 overflow-y-auto custom-scrollbar"
            >
              <!-- Detalles Adicionales -->
              <div class="px-3">
                <h4 class="font-semibold text-white mb-4">
                  Detalles Adicionales
                </h4>
                <div class="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <!-- Detalles de pago -->
                  <div class="bg-oscuro-800 py-4 px-6 rounded-2xl space-y-4">
                    <!-- Banco -->
                    <div>
                      <p class="text-oscuro-300 text-sm font-medium">Banco</p>
                      <strong class="text-base text-white/90 font-semibold">
                        {{ voucherActualizado.banco }}
                      </strong>
                    </div>

                    <!-- Número de jugadores -->
                    <div>
                      <p class="text-oscuro-300 text-sm font-medium">
                        Nro. de Jugadores
                      </p>
                      <strong class="text-base text-white/90 font-semibold">
                        {{ voucherActualizado.cantidad_participantes }}
                      </strong>
                    </div>

                    <!-- Titular -->
                    <div>
                      <p class="text-oscuro-300 text-sm font-medium">
                        Titular de la Cuenta
                      </p>
                      <strong
                        class="text-base text-white/90 font-semibold truncate"
                      >
                        {{ voucherActualizado.cuenta_titular }}
                      </strong>
                    </div>

                    <!-- Fecha -->
                    <div>
                      <p class="text-oscuro-300 text-sm font-medium">Fecha de Pago</p>
                      <strong class="text-base text-white/90 font-semibold">
                        {{ formatearFecha(voucherActualizado.fecha_subida) }}
                      </strong>
                    </div>
                  </div>

                  <div>
                    <!-- Lista de Jugadores -->
                    <div class="bg-oscuro-800 rounded-2xl">
                      <button
                        @click="isAccordionOpen = !isAccordionOpen"
                        class="w-full flex justify-between items-center px-6 py-4 font-medium text-oscuro-300 "
                      >
                        <span>Lista de Jugadores</span>
                        <i
                          class="fas fa-chevron-down transition-transform duration-300 text-oscuro-400"
                          :class="{ 'rotate-180': isAccordionOpen }"
                        ></i>
                      </button>
                      <div v-if="isAccordionOpen" class="px-4 pb-3">
                        <div v-if="procesandoJugadores" class="text-center p-4">
                          <i class="fas fa-spinner fa-spin text-green-400"></i>
                        </div>
                        <ul
                          v-else-if="
                            voucherActualizado.jugadores &&
                            voucherActualizado.jugadores.length
                          "
                          class="text-sm border-t border-oscuro-600 pt-3 space-y-1"
                        >
                          <li
                            v-for="jugador in voucherActualizado.jugadores"
                            :key="jugador.id"
                            class="flex justify-between items-center py-1.5 px-2"
                          >
                            <span class="text-oscuro-50 font-semibold">{{
                              jugador.nombre
                            }}</span>
                            <span class="font-mono front-medium text-xs truncate text-oscuro-200">{{
                              jugador.codigo_estudiante
                            }}</span>
                          </li>
                        </ul>
                        <div
                          v-else
                          class="text-center text-sm text-oscuro-400 border-t border-white/10 pt-3"
                        >
                          No se encontraron jugadores.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pie de Página (Acciones) -->
        <div
          v-if="voucherActualizado"
          class="flex-shrink-0 flex items-center gap-3 py-3 px-8 bg-oscuro-850 border-t border-white/10"
        >
          <p class="text-sm text-oscuro-300 mr-auto">
            {{
              voucherActualizado.estado === "pendiente"
                ? "¿El comprobante es correcto?"
                : "Cambiar estado:"
            }}
          </p>
          <button
            v-if="
              voucherActualizado.estado === 'pendiente' ||
              voucherActualizado.estado === 'validado'
            "
            @click="
              $emit('validar', voucherActualizado.id_voucher, 'rechazado')
            "
            :disabled="procesando"
            class="px-5 py-2.5 font-semibold rounded-xl transition-all duration-200 flex items-center bg-red-600/20 text-red-500 border-1 border-red-900/70 hover:bg-red-500/20 hover:text-red-400 hover:border-red-800/20 disabled:opacity-50 cursor-pointer"
          >
            <i class="fas fa-times-circle mr-2"></i> Rechazar
          </button>
          <button
            v-if="
              voucherActualizado.estado === 'pendiente' ||
              voucherActualizado.estado === 'rechazado'
            "
            @click="$emit('validar', voucherActualizado.id_voucher, 'validado')"
            :disabled="procesando"
            class="px-5 py-2.5 font-semibold rounded-xl flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-sm transform transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <i v-if="procesando" class="fas fa-spinner fa-spin mr-2"></i>
            <i v-else class="fas fa-check-circle mr-2"></i>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useVouchersApi } from "@/stores/vouchers";
import { useOpcionesDeporte } from "@/stores/deporte";

const props = defineProps({
  mostrar: Boolean,
  voucher: {
    type: Object,
    default: () => ({}),
  },
  procesando: [String, Number, null],
});

defineEmits(["cerrar", "validar"]);

const store = useVouchersApi();
const deporteStore = useOpcionesDeporte();
const imageLoading = ref(true);
const errorImagen = ref(false);
const isAccordionOpen = ref(true);

const voucherActualizado = computed(() => {
  if (!props.voucher?.id_voucher) return props.voucher;
  return (
    store.vouchers.find((v) => v.id_voucher === props.voucher.id_voucher) ||
    props.voucher
  );
});

const imagenUrl = computed(() => {
  if (!voucherActualizado.value?.nombre_imagen) return "";
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  return `${baseURL}/uploads/${voucherActualizado.value.nombre_imagen}`;
});

const procesandoJugadores = computed(
  () => store.procesando === `jugadores-${props.voucher.equipo_id}`
);

const sportInfo = computed(() => {
  if (!voucherActualizado.value?.deporte_id) return null;
  return deporteStore.deportes.find(
    (d) => d.valor === voucherActualizado.value.deporte_id
  );
});

const cicloInfo = computed(() => {
  if (!voucherActualizado.value?.ciclo) return null;
  return deporteStore.ciclos.find(
    (c) => c.etiqueta === voucherActualizado.value.ciclo
  );
});

const statusConfig = computed(() => {
  const estado = voucherActualizado.value?.estado;
  switch (estado) {
    case "pendiente":
      return { text: "Pendiente", classes: "bg-yellow-400/10 text-yellow-400" };
    case "validado":
      return { text: "Validado", classes: "bg-green-400/10 text-green-400" };
    case "rechazado":
      return { text: "Rechazado", classes: "bg-red-400/10 text-red-400" };
    default:
      return { text: "N/A", classes: "bg-gray-400/10 text-gray-400" };
  }
});

const statusStyles = computed(() => {
  const estado = voucherActualizado.value?.estado;
  switch (estado) {
    case "validado":
      return {
        color: "text-green-400",
        glow: "glow-text0",
        dotClasses: "bg-green-400 ring-green-400/20",
      };
    case "rechazado":
      return {
        color: "text-red-400",
        glow: "rechazado-text",
        dotClasses: "bg-red-400 ring-red-400/20",
      };
    case "pendiente":
      return {
        color: "text-yellow-400",
        glow: "pendiente-text",
        dotClasses: "bg-yellow-400 ring-yellow-400/20 animate-pulse",
      };
    default:
      return { color: "text-oscuro-300", glow: "" };
  }
});

watch(
  () => props.mostrar,
  (newVal) => {
    if (newVal) {
      document.body.classList.add("overflow-hidden");
      isAccordionOpen.value = true;
      if (props.voucher?.equipo_id && !props.voucher.jugadores) {
        store.obtenerJugadores(props.voucher.equipo_id);
      }
      if (!props.voucher?.nombre_imagen) {
        imageLoading.value = false;
        errorImagen.value = true;
        return;
      }
      imageLoading.value = true;
      errorImagen.value = false;
      const img = new Image();
      img.onload = () => {
        imageLoading.value = false;
      };
      img.onerror = () => {
        imageLoading.value = false;
        errorImagen.value = true;
      };
      img.src = imagenUrl.value;
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }
);

const formatearFecha = (fecha) => {
  if (!fecha) return "N/A";
  return new Date(fecha).toLocaleDateString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  });
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.aurora-bg::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 150%;
  height: 150%;
  background-image: radial-gradient(
      circle at 20% 20%,
      rgba(0, 255, 150, 0.1),
      transparent 35%
    ),
    radial-gradient(circle at 80% 70%, rgba(0, 150, 255, 0.1), transparent 35%);
  transform: translate(-50%, -50%);
  animation: spin 25s linear infinite;
  will-change: transform;
  z-index: -1;
}

@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
