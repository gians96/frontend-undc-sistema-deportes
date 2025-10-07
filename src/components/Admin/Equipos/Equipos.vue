<template>
  <div v-if="loading" class="text-center py-8">
    <i class="fas fa-spinner fa-spin text-2xl text-green-400"></i>
    <p class="mt-2 text-oscuro-200">Cargando equipos...</p>
  </div>

  <div v-else-if="equipos.length === 0" class="bg-oscuro-800 rounded-xl shadow-lg border border-oscuro-600 p-8 text-center">
    <i class="fas fa-users text-4xl text-oscuro-400 mb-4"></i>
    <h3 class="text-lg font-medium text-white mb-2">No hay equipos</h3>
    <p class="text-oscuro-200">No se encontraron equipos para este deporte.</p>
  </div>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    <div
      v-for="equipo in equipos"
      :key="equipo.id_equipo"
      class="group bg-oscuro-800 rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 border border-oscuro-600 hover:border-green-500/50 transform"
    >
      <!-- Header section with gradient background -->
      <div class="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-t-xl">
        <div class="flex justify-between items-start mb-2">
          <div class="flex-1">
            <h3 class="text-xl font-bold text-white mb-1 group-hover:text-green-100 transition-colors">
              {{ equipo.nombre_equipo }}
            </h3>
            <p class="text-green-100 text-sm font-medium">{{ equipo.deporte }}</p>
          </div>
          <span
            :class="getEstadoClasses(equipo.estado_inscripcion)"
            class="px-3 py-1 text-xs font-bold rounded-full shadow-sm"
          >
            {{ getEstadoTexto(equipo.estado_inscripcion) }}
          </span>
        </div>

        <!-- ID Badge -->
        <div class="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
          <i class="fas fa-hashtag text-white/80 text-xs mr-1"></i>
          <span class="text-white font-mono text-sm">{{ equipo.id_equipo }}</span>
        </div>
      </div>

      <!-- Content section -->
      <div class="p-6">
        <!-- Key metrics -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="bg-oscuro-700 rounded-lg p-3 text-center border border-oscuro-600">
            <div class="text-2xl font-bold text-white">{{ equipo.ciclo }}</div>
            <div class="text-xs text-oscuro-300 font-medium">Ciclo</div>
          </div>
          <div class="bg-green-900/30 rounded-lg p-3 text-center border border-green-600/30">
            <div class="text-2xl font-bold text-green-400">{{ equipo.cantidad_participantes }}</div>
            <div class="text-xs text-green-300 font-medium">Participantes</div>
          </div>
        </div>

        <!-- Contact information -->
        <div class="space-y-3 mb-4">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3 border border-green-500/30">
              <i class="fas fa-user text-green-400 text-sm"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate">{{ equipo.representante_nombre }}</p>
              <p class="text-xs text-oscuro-300">Representante</p>
            </div>
          </div>

          <div class="flex items-center">
            <div class="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 border border-purple-500/30">
              <i class="fas fa-phone text-purple-400 text-sm"></i>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-white">{{ equipo.representante_telefono }}</p>
              <p class="text-xs text-oscuro-300">Contacto</p>
            </div>
          </div>

          <div class="flex items-center">
            <div class="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center mr-3 border border-orange-500/30">
              <i class="fas fa-calendar text-orange-400 text-sm"></i>
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-white">{{ formatearFecha(equipo.fecha_inscripcion) }}</p>
              <p class="text-xs text-oscuro-300">Fecha de inscripción</p>
            </div>
          </div>
        </div>

        <!-- Voucher status if exists -->
        <div v-if="equipo.voucher_estado" class="mt-4 pt-4 border-t border-oscuro-600">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3 border border-yellow-500/30">
                <i class="fas fa-receipt text-yellow-400 text-sm"></i>
              </div>
              <span class="text-sm font-medium text-oscuro-200">Estado voucher</span>
            </div>
            <span
              :class="getEstadoClasses(equipo.voucher_estado)"
              class="px-3 py-1 text-xs font-bold rounded-full"
            >
              {{ getEstadoTexto(equipo.voucher_estado) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  equipos: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const getEstadoClasses = (estado) => {
  switch (estado) {
    case 'pendiente':
      return 'bg-yellow-100 text-yellow-800'
    case 'validado':
      return 'bg-green-100 text-green-800'
    case 'rechazado':
      return 'bg-red-100 text-red-800'
    case 'activo':
      return 'bg-green-100 text-green-800'
    case 'inactivo':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
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
    case 'activo':
      return 'Activo'
    case 'inactivo':
      return 'Inactivo'
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