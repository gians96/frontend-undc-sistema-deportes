<template>
  <div
    @click="$emit('verImagen', voucher)"
    class="relative bg-oscuro-800 backdrop-blur-md border border-oscuro-850 rounded-3xl overflow-hidden transition-all duration-300 group cursor-pointer hover:border-oscuro-700 hover:shadow-2xl hover:shadow-oscuro-950/50"
  >
    <div class="relative p-5 flex flex-col h-full">
      <!-- Cabecera -->
      <div class="flex-shrink-0 mb-5">
        <!-- Línea 1: Nombre del Equipo y Estado -->
        <div class="flex items-center gap-3">
          <div
            class="w-3 h-3 rounded-full ring-4 flex-shrink-0"
            :class="statusConfig.dotClasses"
          ></div>
          <h3 class="text-lg font-bold text-white truncate">
            {{ voucher.nombre_equipo }}
          </h3>
        </div>
        <!-- Línea 2: Barra de Metadatos -->
        <div
          class="mt-3 bg-oscuro-900/50 rounded-xl flex items-center justify-between text-xs text-oscuro-300 px-3 py-2"
        >
          <span class="flex items-center gap-1.5"
            ><i class="fas fa-futbol w-4 text-center"></i>
            {{ voucher.deporte }}</span
          >
          <span class="flex items-center gap-2 text-base font-bold text-white"
            ><i class="fas fa-graduation-cap"></i> Ciclo
            {{ voucher.ciclo }} - {{ voucher.seccion }}</span
          >
          <span class="flex items-center gap-1.5"
            ><i class="fas fa-university w-4 text-center"></i>
            {{ voucher.banco }}</span
          >
        </div>
      </div>

      <!-- Cuerpo Principal -->
      <div class="flex-grow flex items-center my-2">
        <div class="w-1/2 pr-4 border-r border-oscuro-700 text-center">
          <p
            class="text-sm"
            :class="statusConfig.textColor.replace('text-', 'text-')"
          >
            Monto
          </p>
          <p
            class="text-4xl font-bold"
            :class="statusConfig.textColor"
          >
            S/ {{ voucher.monto }}
          </p>
        </div>
        <div class="w-1/2 pl-4 text-center">
          <p class="text-sm text-oscuro-300">Nro. Operación</p>
          <p class="text-2xl font-bold text-white font-mono tracking-wider">
            {{ voucher.numero_voucher }}
          </p>
        </div>
      </div>

      <!-- Pie de página de información -->
      <div class="flex-shrink-0 text-sm text-oscuro-200 space-y-2 mt-5">
        <div class="flex items-center gap-3">
          <i class="fas fa-user w-4 text-center text-oscuro-400"></i>
          <span
            >Cuenta:
            <span class="font-medium text-white">{{
              voucher.cuenta_titular
            }}</span></span
          >
        </div>

        <div class="grid grid-cols-2 gap-5">
          <div class="flex items-center gap-3">
            <i class="fas fa-users w-4 text-center text-oscuro-400"></i>
            <span
              >Participantes:
              <span class="font-medium text-white">{{
                voucher.cantidad_participantes
              }}</span></span
            >
          </div>
          <div class="flex items-center gap-3">
            <i class="fas fa-calendar-day w-4 text-center text-oscuro-400"></i>
            <span
              >Fecha:
              <span class="font-medium text-white">{{
                formatearFecha(voucher.fecha_subida)
              }}</span></span
            >
          </div>
        </div>
      </div>

      <!-- Overlay de Hover -->
      <div
        class="absolute inset-0 bg-oscuro-900/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div class="text-center text-white">
          <i class="text-3xl" :class="statusConfig.buttonIcon"></i>
          <p class="mt-2 font-semibold">{{ statusConfig.buttonText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  voucher: {
    type: Object,
    required: true,
  },
});

defineEmits(["verImagen"]);

const statusConfig = computed(() => {
  const estado = props.voucher.estado;
  switch (estado) {
    case "pendiente":
      return {
        dotClasses: "bg-yellow-400 ring-yellow-400/20 animate-pulse",
        textColor: "pendiente-text text-yellow-400",
        buttonText: "Revisar Voucher",
        buttonIcon: "fas fa-search-dollar",
      };
    case "validado":
      return {
        dotClasses: "bg-green-400 ring-green-400/20",
        textColor: "glow-text text-green-400",
        buttonText: "Ver Detalles",
        buttonIcon: "fas fa-eye",
      };
    case "rechazado":
      return {
        dotClasses: "bg-red-400 ring-red-400/20",
        textColor: "rechazado-text text-red-400",
        buttonText: "Ver Detalles",
        buttonIcon: "fas fa-eye",
      };
    default:
      return {
        dotClasses: "bg-gray-400 ring-gray-400/20",
        textColor: "text-gray-400",
        buttonText: "Ver Detalles",
        buttonIcon: "fas fa-eye",
      };
  }
});

const formatearFecha = (fecha) => {
  if (!fecha) return "N/A";
  return new Date(fecha).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
</script>