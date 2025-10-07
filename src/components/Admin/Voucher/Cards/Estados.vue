<template>
  <div class="voucher-cards grid grid-cols-3 gap-2 sm:gap-4 mb-6">
    <div
      v-for="card in cardConfig"
      :key="card.estado"
      @click="$emit('filtrar', card.estado)"
      :class="[
        'bg-oscuro-800 rounded-xl shadow-lg border-l-4 p-2 sm:p-4 cursor-pointer transition-all duration-300 transform',
        card.borderColor,
        filtroActivo === card.estado ?
          `ring-2 ${card.ringColor} ${card.bgColor} ${card.shadowColor} active` :
          `hover:shadow-xl ${card.hoverBorder} border-oscuro-600`
      ]"
    >
      <div class="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left">
        <div class="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-3">
          <div :class="`hidden sm:block bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} p-2 rounded-lg shadow-lg`">
            <i :class="`fa-solid ${card.icono} text-white text-lg`"></i>
          </div>
          <div>
            <p class="text-xs sm:text-sm font-medium text-oscuro-200">{{ card.titulo }}</p>
            <p :class="`text-lg sm:text-2xl font-bold ${card.textColor}`">{{ stats[card.estado] }}</p>
          </div>
        </div>
        <div v-if="filtroActivo === card.estado" class="hidden sm:block">
          <i :class="`fas fa-check-circle ${card.textColor}`"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  estadisticas: {
    type: Object,
    default: () => ({
      total: 0,
      pendientes: 0,
      validados: 0,
      rechazados: 0
    })
  },
  filtroActivo: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['filtrar'])

// Configuración de los cards con clases completas para Tailwind
const cardConfig = [
  {
    estado: 'pendiente',
    titulo: 'Pendientes',
    color: 'yellow',
    icono: 'fa-clock',
    borderColor: 'border-yellow-400',
    textColor: 'text-yellow-400',
    ringColor: 'ring-yellow-400',
    bgColor: 'bg-yellow-900/30',
    shadowColor: 'shadow-yellow-400/20',
    hoverBorder: 'hover:border-yellow-300',
    gradientFrom: 'from-yellow-500',
    gradientTo: 'to-yellow-600'
  },
  {
    estado: 'validado',
    titulo: 'Validados',
    color: 'green',
    icono: 'fa-check-circle',
    borderColor: 'border-green-400',
    textColor: 'text-green-400',
    ringColor: 'ring-green-400',
    bgColor: 'bg-green-900/30',
    shadowColor: 'shadow-green-400/20',
    hoverBorder: 'hover:border-green-300',
    gradientFrom: 'from-green-500',
    gradientTo: 'to-green-600'
  },
  {
    estado: 'rechazado',
    titulo: 'Rechazados',
    color: 'red',
    icono: 'fa-times-circle',
    borderColor: 'border-red-400',
    textColor: 'text-red-400',
    ringColor: 'ring-red-400',
    bgColor: 'bg-red-900/30',
    shadowColor: 'shadow-red-400/20',
    hoverBorder: 'hover:border-red-300',
    gradientFrom: 'from-red-500',
    gradientTo: 'to-red-600'
  }
]

// Usar las estadísticas que vienen del store
const stats = computed(() => props.estadisticas)

// Formatear montos
const formatAmount = (amount) => {
  return amount
}
</script>

<style scoped>
.voucher-cards {
  min-height: fit-content;
}

/* Animaciones hover para desktop */
@media (min-width: 640px) {
  .voucher-cards > div {
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  }

  .voucher-cards > div:hover:not(.active) {
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  }
}

/* Optimización para móviles */
@media (max-width: 639px) {
  .voucher-cards {
    gap: 0.5rem;
  }

  .voucher-cards > div {
    padding: 0.5rem;
    min-height: auto;
  }

  /* Reducir aún más el espaciado en móviles */
  .voucher-cards > div > div > div {
    gap: 0.25rem;
  }
}
</style>