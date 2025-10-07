<template>
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
    <!-- Lista de equipos (izquierda) -->
    <div class="xl:col-span-1">
      <div class="bg-gradient-to-br from-oscuro-800 to-oscuro-700 rounded-xl shadow-lg border border-oscuro-600 p-6">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
            <i class="fas fa-list text-white"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold text-white">Lista de Equipos</h3>
            <p class="text-sm text-oscuro-200">{{ equipos.length }} equipos registrados</p>
          </div>
        </div>

        <div class="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
          <div
            v-for="equipo in equipos"
            :key="equipo.id_equipo"
            class="group flex items-center justify-between p-4 bg-oscuro-700 rounded-lg border border-oscuro-600 hover:border-green-500/50 hover:shadow-md hover:shadow-green-500/10 transition-all duration-200"
          >
            <div class="flex items-center flex-1 min-w-0">
              <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3 group-hover:from-green-600 group-hover:to-green-700 transition-all">
                <span class="text-white font-bold text-sm">#{{ equipo.id_equipo }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-white truncate">{{ equipo.nombre_equipo }}</p>
                <p class="text-sm text-oscuro-300">Ciclo {{ equipo.ciclo }}</p>
              </div>
            </div>
            <span
              :class="getEstadoClasses(equipo.estado_inscripcion)"
              class="px-3 py-1 text-xs font-bold rounded-full ml-2"
            >
              {{ getEstadoTexto(equipo.estado_inscripcion) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Enfrentamientos (derecha) -->
    <div class="xl:col-span-2">
      <div class="bg-gradient-to-br from-oscuro-800 to-oscuro-700 rounded-xl shadow-lg border border-oscuro-600 p-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div class="flex items-center mb-4 sm:mb-0">
            <div class="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
              <i class="fas fa-trophy text-white"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white flex items-center">
                Enfrentamientos
                <span v-if="tieneEnfrentamientosGuardados" class="ml-3 px-3 py-1 text-xs bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-bold shadow-sm">
                  <i class="fas fa-check mr-1"></i>
                  Guardados
                </span>
              </h3>
              <p class="text-sm text-oscuro-200">Gestiona los enfrentamientos del torneo</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              v-if="!sorteoRealizado"
              @click="$emit('comenzarSorteo')"
              :disabled="!puedeRealizarSorteo"
              class="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform "
            >
              <i class="fas fa-play"></i>
              {{ tieneEnfrentamientosGuardados ? 'Ver Enfrentamientos' : 'Comenzar Sorteo' }}
            </button>
            <div v-else class="flex flex-wrap gap-2">
              <button
                v-if="!tieneEnfrentamientosGuardados"
                @click="$emit('guardarSorteo')"
                :disabled="guardandoSorteo"
                class="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform "
              >
                <i class="fas fa-save" :class="{ 'fa-spin': guardandoSorteo }"></i>
                {{ guardandoSorteo ? 'Guardando...' : 'Guardar Sorteo' }}
              </button>
              <button
                v-if="!tieneEnfrentamientosGuardados"
                @click="$emit('reiniciarSorteo')"
                :disabled="guardandoSorteo"
                class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform "
              >
                <i class="fas fa-redo"></i>
                Nuevo Sorteo
              </button>
            </div>
          </div>
        </div>

        <!-- Enfrentamientos -->
        <div v-if="!puedeRealizarSorteo" class="text-center py-8">
          <i class="fas fa-info-circle text-4xl text-oscuro-400 mb-4"></i>
          <h4 class="text-lg font-medium text-white mb-2">Se necesitan al menos 2 equipos</h4>
          <p class="text-oscuro-200">Para realizar un sorteo necesitas al menos 2 equipos registrados.</p>
        </div>

        <div v-else-if="!sorteoRealizado" class="text-center py-8">
          <i class="fas fa-hand-pointer text-4xl text-oscuro-400 mb-4"></i>
          <h4 class="text-lg font-medium text-white mb-2">¿Listo para el sorteo?</h4>
          <p class="text-oscuro-200">Haz clic en "Comenzar Sorteo" para generar los enfrentamientos aleatoriamente.</p>
        </div>

        <div v-else class="space-y-6">
          <!-- Mensaje para enfrentamientos guardados -->
          <div v-if="tieneEnfrentamientosGuardados" class="bg-gradient-to-r from-green-900/30 to-emerald-900/40 border border-green-500/30 rounded-xl p-6 mb-6">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <i class="fas fa-check text-white text-sm"></i>
              </div>
              <div>
                <p class="text-green-400 font-semibold">Enfrentamientos Confirmados</p>
                <p class="text-green-300 text-sm">Estos enfrentamientos ya están guardados en la base de datos.</p>
              </div>
            </div>
          </div>

          <!-- Enfrentamientos generados -->
          <div
            v-for="(enfrentamiento, index) in enfrentamientos"
            :key="index"
            class="bg-oscuro-700 border border-oscuro-600 rounded-xl p-6 shadow-sm hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
          >
            <div class="text-center mb-4">
              <div class="inline-flex items-center bg-oscuro-600 rounded-full px-4 py-2 border border-oscuro-500">
                <i class="fas fa-swords text-green-400 mr-2"></i>
                <span class="text-sm font-bold text-white">Enfrentamiento {{ index + 1 }}</span>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
              <!-- Equipo 1 -->
              <div class="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-center text-white transform hover:scale-105 transition-transform">
                <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i class="fas fa-users text-white"></i>
                </div>
                <h4 class="font-bold text-lg mb-1">{{ enfrentamiento.equipo1.nombre_equipo }}</h4>
                <p class="text-green-100 text-sm font-medium">Ciclo {{ enfrentamiento.equipo1.ciclo }}</p>
              </div>

              <!-- VS -->
              <div class="text-center py-4">
                <div class="w-16 h-16 bg-gradient-to-br from-oscuro-600 to-oscuro-700 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <span class="text-2xl font-black text-green-400">VS</span>
                </div>
                <p class="text-xs text-oscuro-300 font-medium">ENFRENTAMIENTO</p>
              </div>

              <!-- Equipo 2 -->
              <div class="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-center text-white transform hover:scale-105 transition-transform">
                <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i class="fas fa-users text-white"></i>
                </div>
                <h4 class="font-bold text-lg mb-1">{{ enfrentamiento.equipo2.nombre_equipo }}</h4>
                <p class="text-red-100 text-sm font-medium">Ciclo {{ enfrentamiento.equipo2.ciclo }}</p>
              </div>
            </div>
          </div>

          <!-- Equipo que pasa directo a la final (si hay numero impar) -->
          <div v-if="equipoFinalista" class="bg-gradient-to-br from-yellow-900/30 to-amber-900/40 border-2 border-yellow-500/50 rounded-xl p-6">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-crown text-white text-xl"></i>
              </div>
              <h4 class="text-xl font-bold text-yellow-400 mb-3">
                Pase Directo a la Siguiente Ronda
              </h4>
              <div class="bg-gradient-to-br from-yellow-600 to-amber-600 rounded-xl p-4 inline-block shadow-lg">
                <h4 class="font-bold text-white text-lg">{{ equipoFinalista.nombre_equipo }}</h4>
                <p class="text-yellow-100 font-medium">Ciclo {{ equipoFinalista.ciclo }}</p>
              </div>
              <p class="text-yellow-300 text-sm mt-3 font-medium">Este equipo avanza automáticamente por número impar de participantes</p>
            </div>
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
  enfrentamientos: {
    type: Array,
    required: true
  },
  equipoFinalista: {
    type: Object,
    default: null
  },
  puedeRealizarSorteo: {
    type: Boolean,
    required: true
  },
  sorteoRealizado: {
    type: Boolean,
    required: true
  },
  tieneEnfrentamientosGuardados: {
    type: Boolean,
    required: true
  },
  guardandoSorteo: {
    type: Boolean,
    default: false
  }
})

defineEmits(['comenzarSorteo', 'guardarSorteo', 'reiniciarSorteo'])

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
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: var(--color-oscuro-700);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-oscuro-500);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>