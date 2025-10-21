<template>
  <div v-if="loading" class="text-center py-12">
    <i class="fas fa-spinner fa-spin text-3xl text-green-400 mb-4"></i>
    <p class="text-oscuro-200">Cargando equipos...</p>
  </div>

  <div v-else-if="equipos.length === 0" class="bg-oscuro-850 rounded-2xl shadow-lg border border-oscuro-700 p-12 text-center">
    <div class="w-20 h-20 bg-oscuro-800 rounded-full flex items-center justify-center mx-auto mb-4">
      <i class="fas fa-users text-4xl text-oscuro-500"></i>
    </div>
    <h3 class="text-lg font-semibold text-white mb-2">No hay equipos</h3>
    <p class="text-oscuro-300 text-sm">No se encontraron equipos para este deporte.</p>
  </div>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    <div
      v-for="equipo in equipos"
      :key="getEquipoId(equipo)"
      class="relative md:bg-oscuro-850 bg-oscuro-800 backdrop-blur-md border border-oscuro-700 rounded-3xl overflow-hidden transition-all duration-300 hover:border-green-700/30 hover:shadow-2xl hover:shadow-green-900/20"
    >
      <div class="relative p-5 flex flex-col h-full">
        <!-- Cabecera -->
        <div class="flex-shrink-0 ">
          <div class="flex items-start gap-3">
            <div
              class="w-3 h-3 rounded-full ring-4 flex-shrink-0 mt-1.5"
              :class="esJugadorIndividual(equipo)
                ? 'bg-blue-400 ring-blue-400/20'
                : 'bg-green-400 ring-green-400/20'"
            ></div>
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-bold text-white truncate mb-1">
                {{ getNombre(equipo) }}
              </h3>
              <div class="flex items-center gap-2 text-xs flex-wrap">
                <span
                  class="px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5"
                  :class="esJugadorIndividual(equipo)
                    ? 'bg-blue-800/20 text-blue-400'
                    : 'bg-green-800/20 text-green-400'"
                >
                  <i :class="getTipoIcono(equipo)"></i>
                  {{ getTipoTexto(equipo) }}
                </span>
                <span class="px-3 py-1.5 bg-oscuro-700 text-oscuro-300 rounded-lg font-mono text-xs">
                  #{{ getEquipoId(equipo) }}
                </span>
                <span class="px-3 py-1.5 bg-oscuro-900/50 text-oscuro-300 rounded-lg text-xs flex items-center gap-1">
                  <i class="fas fa-calendar-day"></i>
                  {{ formatearFecha(equipo.fecha_inscripcion) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Cuerpo Principal: Participantes y Ciclo-Sección -->
        <div class="flex items-center justify-between my-6 flex-grow">
          <!-- Participantes o Jugador -->
          <div class="text-center flex-1">
            <div v-if="equipo.participantes">
              <p class="text-sm text-green-400 mb-1">Participantes</p>
              <p class="text-5xl font-bold text-green-400 glow-text">
                {{ equipo.participantes }}
              </p>
            </div>
            <div v-else>
              <p class="text-sm text-blue-400 mb-1">Jugador</p>
              <div class="w-16 h-16 bg-blue-500/20 border-2 border-blue-500/30 rounded-full flex items-center justify-center mx-auto">
                <i class="fas fa-user text-2xl text-blue-400"></i>
              </div>
            </div>
          </div>

          <!-- Divisor vertical -->
          <div class="w-px h-20 bg-oscuro-700 mx-4"></div>

          <!-- Ciclo y Sección -->
          <div class="text-center flex-1">
            <p class="text-sm text-oscuro-400 mb-1">Ciclo - Sección</p>
            <p class="text-5xl font-bold text-white">
              {{ equipo.ciclo }} <span class="text-oscuro-500">-</span> {{ equipo.seccion }}
            </p>
          </div>
        </div>


        <!-- Botón Ver Jugadores (solo para equipos) -->
        <button
          v-if="!esJugadorIndividual(equipo)"
          @click="abrirModalJugadores(equipo)"
          class="w-full mt-auto bg-oscuro-900/50 hover:bg-green-500/10 border border-oscuro-700 hover:border-green-500/50 rounded-2xl px-4 py-3 text-sm font-semibold text-oscuro-300 hover:text-green-400 transition-all duration-200 flex items-center justify-between"
        >
          <span class="flex items-center gap-2">
            <i class="fas fa-users"></i>
            Ver Jugadores
          </span>
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- Modal o Sheet de Jugadores (Renderizado Condicional) -->
  <component
    v-if="modalActivo"
    :is="isMobile ? SheetJugadores : JugadoresModal"
    :equipo="equipoSeleccionado"
    :jugadores="jugadoresDelEquipo"
    :cargando="cargandoJugadores"
    @close="cerrarModalJugadores"
  />
</template>

<script setup>
import { ref, shallowRef } from 'vue'
import api from '@/services/api'
import JugadoresModal from './JugadoresModal.vue'
import SheetJugadores from './SheetJugadores.vue' // Importar el nuevo sheet
import { useScreenSize } from '@/composables/useScreenSize' // Importar el composable

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

const { isMobile } = useScreenSize() // Usar el composable para obtener el tamaño de pantalla

// Marcar componentes como shallow para optimización, ya que son dinámicos
const JugadoresModal_ = shallowRef(JugadoresModal)
const SheetJugadores_ = shallowRef(SheetJugadores)

// --- Estados para el Modal/Sheet (la lógica se mantiene) ---
const modalActivo = ref(false)
const equipoSeleccionado = ref(null)
const jugadoresDelEquipo = ref([])
const cargandoJugadores = ref(false)

// --- Lógica del Modal/Sheet (la lógica se mantiene) ---
const abrirModalJugadores = async (equipo) => {
  equipoSeleccionado.value = equipo
  modalActivo.value = true
  
  if (!equipo.jugadores) {
    cargandoJugadores.value = true
    try {
      const response = await api.get(`/api/admin/equipos/jugadores/${equipo.equipo_id}`)
      equipo.jugadores = response.data
      jugadoresDelEquipo.value = response.data
    } catch (error) {
      console.error('❌ Error al cargar jugadores:', error)
      jugadoresDelEquipo.value = []
    } finally {
      cargandoJugadores.value = false
    }
  } else {
    jugadoresDelEquipo.value = equipo.jugadores
  }
}

const cerrarModalJugadores = () => {
  modalActivo.value = false
  equipoSeleccionado.value = null
  jugadoresDelEquipo.value = []
}

// --- Funciones de ayuda (se mantienen igual) ---
const esJugadorIndividual = (item) => item.jugador_id !== undefined
const getEquipoId = (item) => item.equipo_id || item.jugador_id
const getNombre = (item) => item.equipo_nombre || item.jugador_nombre
const getTipoIcono = (item) => esJugadorIndividual(item) ? 'fas fa-user' : 'fas fa-users'
const getTipoTexto = (item) => esJugadorIndividual(item) ? 'Jugador Individual' : 'Equipo'
const formatearFecha = (fecha) => {
  return new Date(fecha).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>