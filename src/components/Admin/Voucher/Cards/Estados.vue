<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
    <div
      v-for="card in cardConfig"
      :key="card.estado"
      @click="handleCardClick(card.estado)"
      class="relative p-4 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group border-2"
      :class="[
        filtroActivo === card.estado
          ? `${card.borderColor} ${card.bgColor} shadow-lg ${card.shadowColor}`
          : 'bg-oscuro-850 backdrop-blur-lg border-oscuro-800/60 hover:bg-oscuro-800 hover:border-oscuro-600'
      ]"
    >
      <div class="relative z-10 flex items-center gap-3 sm:gap-4">
        <!-- Contenedor del Icono -->
        <div 
          class="flex-shrink-0 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-colors duration-300"
          :class="filtroActivo === card.estado ? card.activeIconBg : 'bg-oscuro-900/70'"
        >
          <component 
            :is="card.icono" 
            class="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300"
            :class="filtroActivo === card.estado ? card.iconoColor : card.textColor"
          />
        </div>
        
        <!-- Contenido de Texto -->
        <div class="flex-grow">
          <p 
            class="text-xs sm:text-sm font-semibold opacity-80"
            :class="filtroActivo === card.estado ? card.textColor : 'text-oscuro-100'"
          >
            {{ card.titulo }}
          </p>
          <p 
            class="text-2xl sm:text-4xl font-bold"
            :class="filtroActivo === card.estado ? card.activeTextColor : card.textColor"
          >
            {{ stats[card.estado] }}
          </p>
        </div>
      </div>
      
      <!-- Efecto de brillo para la tarjeta activa -->
      <div 
        v-if="filtroActivo === card.estado" 
        class="absolute top-0 left-0 w-full h-full z-0 opacity-10"
        :class="`${card.gradientFrom} via-transparent to-transparent`"
        style="background-image: radial-gradient(circle at 20% 20%, var(--tw-gradient-stops));"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed, shallowRef } from 'vue'
import CirculoPendienteIcono from '@/components/icons/CirculoPendienteIcono.vue'
import CirculoCheckIcono from '@/components/icons/CirculoCheckIcono.vue'
import CiculoCancelarIcono from '@/components/icons/CiculoCancelarIcono.vue'

const props = defineProps({
  estadisticas: {
    type: Object,
    default: () => ({
      pendiente: 0,
      validado: 0,
      rechazado: 0
    })
  },
  filtroActivo: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['filtrar'])

const handleCardClick = (estado) => {
  if (props.filtroActivo === estado) {
    emit('filtrar', null)
  } else {
    emit('filtrar', estado)
  }
}

// Configuración de tarjetas con un estilo inspirado en One UI
const cardConfig = shallowRef([
  {
    estado: 'pendiente',
    titulo: 'Pendientes',
    icono: CirculoPendienteIcono,
    textColor: 'text-yellow-400',
    iconoColor: 'text-yellow-400',
    borderColor: 'border-yellow-400',
    bgColor: 'bg-yellow-500/10',
    shadowColor: 'shadow-yellow-500/10',
    gradientFrom: 'from-yellow-400',
    activeIconBg: 'bg-yellow-400/20',
    activeTextColor: 'text-yellow-300'
  },
  {
    estado: 'validado',
    titulo: 'Validados',
    icono: CirculoCheckIcono,
    textColor: 'text-green-400',
    iconoColor: 'text-green-400',
    borderColor: 'border-green-400',
    bgColor: 'bg-green-500/10',
    shadowColor: 'shadow-green-500/10',
    gradientFrom: 'from-green-400',
    activeIconBg: 'bg-green-400/20',
    activeTextColor: 'text-green-300'
  },
  {
    estado: 'rechazado',
    titulo: 'Rechazados',
    icono: CiculoCancelarIcono,
    textColor: 'text-red-400',
    iconoColor: 'text-red-400',
    borderColor: 'border-red-400',
    bgColor: 'bg-red-500/10',
    shadowColor: 'shadow-red-500/10',
    gradientFrom: 'from-red-400',
    activeIconBg: 'bg-red-400/20',
    activeTextColor: 'text-red-300'
  }
])

const stats = computed(() => props.estadisticas)
</script>