<template>
  <div class="p-4 sm:p-6 rounded-md border border-gray-400/20 backdrop-blur-sm">
    <div class="flex items-center justify-between mb-4 sm:mb-6 pb-2 border-b border-gray-700">
      <h3 class="text-white text-xl sm:text-2xl lg:text-3xl font-semibold glow-text flex items-center gap-2 uppercase">
        Jugadores ({{ jugadores.length }}/16)
      </h3>
      <!-- Botón solo visible en pantallas medianas y grandes -->
       <div class="hidden sm:block ">
         <BotonPrincipal
           icon="fa-solid fa-circle-plus"
           text="Agregar jugador"
           @click="agregarJugador"
           :disabled="jugadores.length >= 16"
           tipo="button"
         />
       </div>
    </div>

    <!-- Acordeon de Jugadores -->
    <div class="space-y-4 overflow-y-auto custom-scrollbar">
      <div
        v-for="(jugador, index) in jugadores"
        :key="index"
        class="group rounded-lg border border-gray-600/40 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-400/10"
        :class="{ 'border-green-400/60 shadow-lg shadow-green-400/20': jugador.expanded }"
      >
        <!-- Header del acordeon -->
        <button
          type="button"
          @click="toggleJugador(index)"
          class="w-full p-3 sm:p-5 text-left flex items-center justify-between hover:bg-gray-900/40 transition-all duration-300"
        >
          <div class="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <!-- Avatar mejorado -->
            <div class="relative flex-shrink-0">
              <div
                class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300"
                :class="jugador.expanded
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                  : 'bg-gray-600 text-gray-300 group-hover:bg-green-500/80 group-hover:text-white'"
              >
                {{ index + 1 }}
              </div>
            </div>

            <!-- Info del jugador -->
            <div class="flex-1 min-w-0">
              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                <span class="text-white font-semibold text-sm sm:text-lg truncate">
                  {{ jugador.nombre || "Nuevo Jugador" }}
                  {{ jugador.apellido || "" }}
                </span>
                <!-- Badge de rol -->
                <span
                  v-if="jugador.rol"
                  class="px-1.5 sm:px-2 py-0.5 text-xs font-semibold rounded-md self-start sm:self-center"
                  :class="{
                    'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30': jugador.rol === 'capitan',
                    'bg-blue-500/20 text-blue-400 border border-blue-500/30': jugador.rol === 'titular',
                    'bg-gray-500/20 text-gray-400 border border-gray-500/30': jugador.rol === 'suplente'
                  }"
                >
                  {{ jugador.rol === 'capitan' ? 'Capitán' : jugador.rol === 'titular' ? 'Titular' : 'Suplente' }}
                </span>
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-gray-400">
                <span v-if="jugador.dni" class="truncate">DNI: {{ jugador.dni }}</span>
                <span v-if="jugador.codigo" class="truncate">{{ jugador.codigo }}</span>
                <span
                  v-if="jugador.sexo"
                  class="flex items-center gap-1"
                >
                  <i :class="jugador.sexo === 'masculino' ? 'fa-solid fa-mars' : 'fa-solid fa-venus'"></i>
                  {{ jugador.sexo === 'masculino' ? 'M' : 'F' }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-1 sm:gap-3 flex-shrink-0">
            <!-- Estado de completitud -->
            <div class="flex items-center gap-1">
              <div
                class="w-2 h-2 rounded-full"
                :class="isJugadorComplete(jugador)
                  ? 'bg-green-500 shadow-sm shadow-green-500/50'
                  : 'bg-yellow-500 shadow-sm shadow-yellow-500/50'"
              ></div>
            </div>

            <!-- Chevron -->
            <i
              class="fa-solid transition-all duration-300 text-sm sm:text-lg"
              :class="jugador.expanded
                ? 'fa-chevron-up text-green-400 rotate-180'
                : 'fa-chevron-down text-gray-400 group-hover:text-green-400'"
            ></i>

            <!-- Boton eliminar mejorado -->
            <button
              type="button"
              @click.stop="eliminarJugador(index)"
              class="ml-1 sm:ml-2 p-1.5 sm:p-2 text-red-400/70 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300 hover:scale-110"
              title="Eliminar jugador"
            >
              <i class="fa-solid fa-trash-can text-xs sm:text-sm"></i>
            </button>
          </div>
        </button>

        <!-- Contenido del acordeon con animacion -->
        <div
          v-if="jugador.expanded"
          class="border-t border-gray-600/40 animate-in slide-in-from-top-2 duration-300"
        >
          <div class="p-4 sm:p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div class="flex flex-col">
                <label
                  class="text-green-300 font-semibold mb-2 text-sm uppercase tracking-wider"
                >Nombre</label>
                <input
                  type="text"
                  :value="jugador.nombre"
                  @input="actualizarJugador(index, 'nombre', $event.target.value)"
                  required
                  class="px-3 py-2 sm:px-4 sm:py-3 border border-gray-600/60 rounded-lg text-sm sm:text-base bg-[#182029] text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                  placeholder="Nombre del jugador"
                />
              </div>

              <div class="flex flex-col">
                <label
                  class="text-green-300 font-semibold mb-2 text-sm uppercase tracking-wider"
                >Apellido</label>
                <input
                  type="text"
                  :value="jugador.apellido"
                  @input="actualizarJugador(index, 'apellido', $event.target.value)"
                  required
                  class="px-3 py-2 sm:px-4 sm:py-3 border border-gray-600/60 rounded-lg text-sm sm:text-base bg-[#182029] text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                  placeholder="Apellido del jugador"
                />
              </div>

              <div class="flex flex-col">
                <label
                  class="text-green-300 font-semibold mb-2 text-sm uppercase tracking-wider"
                >DNI</label>
                <input
                  type="text"
                  :value="jugador.dni"
                  @input="actualizarJugador(index, 'dni', $event.target.value)"
                  required
                  class="px-3 py-2 sm:px-4 sm:py-3 border border-gray-600/60 rounded-lg text-sm sm:text-base bg-[#182029] text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                  placeholder="12345678"
                />
              </div>

              <div class="flex flex-col">
                <label
                  class="text-green-300 font-semibold mb-2 text-sm uppercase tracking-wider"
                >Código Estudiante</label>
                <input
                  type="text"
                  :value="jugador.codigo"
                  @input="actualizarJugador(index, 'codigo', $event.target.value)"
                  required
                  class="px-3 py-2 sm:px-4 sm:py-3 border border-gray-600/60 rounded-lg text-sm sm:text-base bg-[#182029] text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                  placeholder="2000000000"
                />
              </div>

              <div class="flex flex-col">
                <label
                  class="text-green-300 font-semibold mb-2 text-sm uppercase tracking-wider"
                >Rol</label>
                <select
                  :value="jugador.rol"
                  @change="actualizarJugador(index, 'rol', $event.target.value)"
                  required
                  class="px-3 py-2 sm:px-4 sm:py-3 border border-gray-600/60 rounded-lg text-sm sm:text-base bg-[#182029] text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                >
                  <option value="" class="bg-gray-900">Selecciona un rol</option>
                  <option value="capitan" class="bg-gray-900">Capitán</option>
                  <option value="titular" class="bg-gray-900">Titular</option>
                  <option value="suplente" class="bg-gray-900">Suplente</option>
                </select>
              </div>

              <div class="flex flex-col">
                <label
                  class="text-green-300 font-semibold mb-2 text-sm uppercase tracking-wider"
                >Sexo</label>
                <select
                  :value="jugador.sexo"
                  @change="actualizarJugador(index, 'sexo', $event.target.value)"
                  required
                  class="px-3 py-2 sm:px-4 sm:py-3 border border-gray-600/60 rounded-lg text-sm sm:text-base bg-[#182029] text-white focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                >
                  <option value="" class="bg-gray-900">Selecciona el sexo</option>
                  <option value="masculino" class="bg-gray-900">Masculino</option>
                  <option value="femenino" class="bg-gray-900">Femenino</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje cuando no hay jugadores -->
      <div
        v-if="jugadores.length === 0"
        class="text-center py-8 text-gray-400"
      >
        <i class="fa-solid fa-users text-4xl mb-4 opacity-50"></i>
        <p>No hay jugadores registrados</p>
        <p class="text-sm">
          Haz clic en "Agregar Jugador" para comenzar
        </p>
      </div>
    </div>

    <!-- Botón flotante para móviles en la parte inferior -->
    <div class="mt-4">
      <BotonPrincipal
        icon="fa-solid fa-circle-plus"
        text="Agregar jugador"
        @click="agregarJugador"
        :disabled="jugadores.length >= 16"
        tipo="button"
        :className="'w-full items-center justify-center'"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BotonPrincipal from '../common/botton/BotonPrincipal.vue'
import { useInscripcionesJugadores } from '../../composables/inscripciones-jugadores.js'

const propiedades = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emitir = defineEmits(['update:modelValue'])

const jugadores = computed(() => propiedades.modelValue)

const {
  agregarJugador,
  eliminarJugador,
  toggleJugador,
  actualizarJugador,
  isJugadorComplete,
  todosJugadoresCompletos,
  cantidadJugadores,
  puedeAgregarJugador
} = useInscripcionesJugadores(jugadores, emitir)
</script>

<style scoped>
/* Scrollbar personalizado */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #22c55e #374151;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #22c55e;
  border-radius: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #16a34a;
}
</style>