<template>
  <div class="group bg-oscuro-800 rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 border border-oscuro-700 hover:border-green-500/20 transform">
    <!-- Header section with gradient background -->
    <div class="bg-oscuro-900 p-6 rounded-t-xl">
      <div class="flex justify-between items-start mb-2">
        <div class="flex-1">
          <h3 class="text-xl font-bold text-white mb-1 group-hover:text-green-100 transition-colors">
            {{ voucher.nombre_equipo }}
          </h3>
          <p class="text-green-100 text-sm font-medium">{{ voucher.deporte }}</p>
        </div>
        <span
          :class="getEstadoClasses(voucher.estado)"
          class="px-3 py-1 text-xs font-bold rounded-full shadow-sm"
        >
          {{ getEstadoTexto(voucher.estado) }}
        </span>
      </div>

      <!-- ID Badge -->
      <div class="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
        <i class="fas fa-hashtag text-white/80 text-xs mr-1"></i>
        <span class="text-white font-mono text-sm">{{ voucher.id_voucher }}</span>
      </div>
    </div>

    <!-- Content section -->
    <div class="p-6">
      <!-- Key metrics -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-oscuro-700 rounded-lg p-3 text-center border border-oscuro-600">
          <div class="text-lg font-bold text-white">{{ voucher.numero_voucher }}</div>
          <div class="text-xs text-oscuro-300 font-medium">Nro. Voucher</div>
        </div>
        <div class="bg-green-900/30 rounded-lg p-3 text-center border border-green-600/30">
          <div class="text-lg font-bold text-green-400">S/ {{ voucher.monto }}</div>
          <div class="text-xs text-green-300 font-medium">Monto</div>
        </div>
      </div>

      <!-- Voucher information -->
      <div class="space-y-3 mb-6">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3 border border-blue-500/30">
            <i class="fas fa-user text-blue-400 text-sm"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-white truncate">{{ voucher.cuenta_titular }}</p>
            <p class="text-xs text-oscuro-300">Titular de cuenta</p>
          </div>
        </div>

        <div class="flex items-center">
          <div class="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 border border-purple-500/30">
            <i class="fas fa-users text-purple-400 text-sm"></i>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-white">{{ voucher.cantidad_participantes }} participantes</p>
            <p class="text-xs text-oscuro-300">Total del equipo</p>
          </div>
        </div>

        <div class="flex items-center">
          <div class="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center mr-3 border border-orange-500/30">
            <i class="fas fa-calendar text-orange-400 text-sm"></i>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-white">{{ formatearFecha(voucher.fecha_subida) }}</p>
            <p class="text-xs text-oscuro-300">Fecha de subida</p>
          </div>
        </div>
      </div>

      <!-- Action buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          @click="$emit('verImagen', voucher)"
          class="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform cursor-pointer"
        >
          <i class="fas fa-eye"></i>
          Ver Comprobante
        </button>

        <div class="">
          <button
            v-if="voucher.estado !== 'validado'"
            @click="$emit('validar', voucher.id_voucher, 'validado')"
            class="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform cursor-pointer"
            :title="'Validar voucher'"
          >
            <i class="fas fa-check"></i>
            Validar
          </button>

          <button
            v-if="voucher.estado !== 'rechazado'"
            @click="$emit('validar', voucher.id_voucher, 'rechazado')"
            class="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform cursor-pointer"
            :title="'Rechazar voucher'"
          >
            <i class="fas fa-times"></i>
            Rechazar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  voucher: {
    type: Object,
    required: true
  }
})

defineEmits(['verImagen', 'validar'])

const getEstadoClasses = (estado) => {
  switch (estado) {
    case 'pendiente':
      return 'bg-yellow-800/40 text-yellow-400'
    case 'validado':
      return 'bg-green-800/40 text-green-400'
    case 'rechazado':
      return 'bg-red-800/40 text-red-400'
    default:
      return 'bg-gray-800/40 text-gray-400'
  }
}

const getEstadoTexto = (estado) => {
  switch (estado) {
    case 'pendiente':
      return 'Pendiente'
    case 'validado':
      return 'Validado'
    case 'rechazado':
      return 'Rechazado'
    default:
      return estado
  }
}

const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>