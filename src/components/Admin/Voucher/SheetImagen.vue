<template>
  <transition name="sheet-fade">
    <div v-if="mostrar" class="md:hidden fixed inset-0 z-50">
      <!-- Overlay -->
      <div
        class="absolute inset-0 bg-oscuro-950/80 backdrop-blur-sm"
        @click="$emit('cerrar')"
      ></div>

      <!-- Contenido del Sheet -->
      <div
        class="absolute bottom-0 left-0 right-0 bg-oscuro-850 backdrop-blur-xl border border-oscuro-700 rounded-t-4xl shadow-2xl flex flex-col max-h-[85vh]"
      >
        <!-- Handle y Cabecera -->
        <div class="flex-shrink-0 p-4 border-b border-oscuro-700">
          <div class="w-12 h-1.5 mx-auto rounded-full bg-oscuro-600 mb-3"></div>
          <div class="flex justify-between items-center">
            <h3 class="font-semibold text-white">Detalles del Comprobante</h3>
            <span
              :class="statusConfig.classes"
              class="px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap"
            >
              {{ statusConfig.text }}
            </span>
          </div>
        </div>

        <!-- Cuerpo con Scroll -->
        <div class="flex-grow p-4 space-y-4 overflow-y-auto pb-28">
          <!-- Imagen -->
          <div
            class="relative group rounded-lg overflow-hidden border border-oscuro-600"
          >
            <img
              :src="imagenUrl"
              alt="Comprobante de pago"
              class="w-full max-h-80 object-contain"
            />
          </div>

          <!-- Información -->
          <div class="text-center mb-4">
            <h2 class="text-xl font-bold text-white">
              {{ voucher.nombre_equipo }}
            </h2>
          </div>
          <div class="flex gap-4 justify-around text-center">
            <div>
              <p class="text-sm text-green-300">Monto</p>
              <p class="text-3xl font-bold text-green-400 glow-text">
                S/ {{ voucher.monto }}
              </p>
            </div>
            <div>
              <p class="text-sm text-oscuro-300">Nro. Op.</p>
              <p class="text-3xl font-bold text-white font-mono">
                {{ voucher.numero_voucher }}
              </p>
            </div>
          </div>
          <!-- Detalles adicionales -->
          <div
            class="grid grid-cols-1 gap-2 bg-oscuro-900/50 p-4 rounded-xl mt-4"
          >
            <div class="flex justify-between items-center">
              <span class="text-oscuro-300 text-sm">Banco</span>
              <strong class="text-white text-sm">{{ voucher.banco }}</strong>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-oscuro-300 text-sm">Titular</span>
              <strong class="text-white text-sm truncate text-right">{{
                voucher.cuenta_titular
              }}</strong>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-oscuro-300 text-sm">Jugadores</span>
              <strong class="text-white text-sm">{{
                voucher.cantidad_participantes
              }}</strong>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-oscuro-300 text-sm">Fecha</span>
              <strong class="text-white text-sm">{{
                formatearFecha(voucher.fecha_subida)
              }}</strong>
            </div>
          </div>
        </div>

        <!-- Footer Fijo con Acciones -->
        <div
          v-if="voucher"
          class="absolute bottom-0 left-0 right-0 flex-shrink-0 flex justify-end items-center gap-3 px-4 py-3 bg-oscuro-850 border-t border-oscuro-700"
        >
          <!-- Botón Rechazar: visible en pendiente o validado -->
          <button
            v-if="voucher.estado === 'pendiente' || voucher.estado === 'validado'"
            @click="$emit('validar', voucher.id_voucher, 'rechazado')"
            :disabled="procesando"
            class="px-5 py-3.5 font-bold text-md rounded-2xl flex items-center bg-red-700/30 text-red-500/80 border-1 border-red-800/70 disabled:opacity-50 flex-1 justify-center"
          >
            Rechazar
          </button>
          <!-- Botón Aprobar: visible en pendiente o rechazado -->
          <button
            v-if="voucher.estado === 'pendiente' || voucher.estado === 'rechazado'"
            @click="$emit('validar', voucher.id_voucher, 'validado')"
            :disabled="procesando"
            class="px-5 py-3.5 font-bold text-md rounded-2xl flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white disabled:opacity-50 flex-1 justify-center"
          >
            <i v-if="procesando" class="fas fa-spinner fa-spin mr-2"></i>
            Aprobar
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, watch } from "vue";

const props = defineProps({
  mostrar: Boolean,
  voucher: Object,
  procesando: [String, Number, null],
});

defineEmits(["cerrar", "validar"]);

watch(
  () => props.mostrar,
  (newVal) => {
    if (newVal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }
);

const imagenUrl = computed(() => {
  if (!props.voucher?.nombre_imagen) return "";
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  return `${baseURL}/uploads/${props.voucher.nombre_imagen}`;
});

const statusConfig = computed(() => {
  const estado = props.voucher?.estado;
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
.sheet-fade-enter-active,
.sheet-fade-leave-active {
  transition: opacity 0.3s ease;
}
.sheet-fade-enter-from,
.sheet-fade-leave-to {
  opacity: 0;
}

.sheet-fade-enter-active .absolute.bottom-0,
.sheet-fade-leave-active .absolute.bottom-0 {
  transition: transform 0.3s ease-in-out;
}
.sheet-fade-enter-from .absolute.bottom-0,
.sheet-fade-leave-to .absolute.bottom-0 {
  transform: translateY(100%);
}
</style>
