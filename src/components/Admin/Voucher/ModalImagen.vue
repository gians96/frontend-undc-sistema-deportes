<template>
  <div v-if="mostrar" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" @click="$emit('cerrar')"></div>

    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative transform overflow-hidden rounded-xl bg-oscuro-900 shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-4xl border border-oscuro-800">
        <!-- Header -->
        <div class="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 border-b border-oscuro-600">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <i class="fas fa-receipt text-white"></i>
              </div>
              <h3 class="text-lg font-semibold text-white">
                Comprobante de Pago
              </h3>
            </div>
            <button
              @click="$emit('cerrar')"
              class="rounded-lg text-white/80 hover:text-white hover:bg-white/10 focus:outline-none p-2 transition-all"
            >
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <!-- Content -->
        <div class="bg-oscuro-900 px-6 py-4">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Imagen del voucher -->
            <div class="space-y-4">
              <h4 class="text-md font-medium text-white flex items-center gap-2">
                <i class="fas fa-image text-green-400"></i>
                Comprobante
              </h4>
              <div class="border border-oscuro-600 rounded-lg overflow-hidden bg-oscuro-700">
                <img
                  :src="imagenUrl"
                  :alt="`Voucher ${voucher.numero_voucher}`"
                  class="w-full h-auto max-h-96 object-contain bg-oscuro-900"
                  @error="errorImagen = true"
                />
                <div v-if="errorImagen" class="p-8 text-center text-oscuro-300">
                  <i class="fas fa-image text-4xl mb-2"></i>
                  <p>No se pudo cargar la imagen</p>
                </div>
              </div>
            </div>

            <!-- Información del voucher -->
            <div class="space-y-4">
              <h4 class="text-md font-medium text-white flex items-center gap-2">
                <i class="fas fa-info-circle text-green-400"></i>
                Información del Pago
              </h4>

              <div class="space-y-3">
                <div class="bg-oscuro-800 p-4 rounded-lg">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-oscuro-300">Número de Operación</p>
                      <p class="font-semibold text-white">{{ voucher.numero_voucher }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-oscuro-300">Monto</p>
                      <p class="font-semibold text-green-400">S/ {{ voucher.monto }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-oscuro-300">Banco</p>
                      <p class="font-semibold text-white">{{ voucher.banco }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-oscuro-300">Estado</p>
                      <span
                        :class="getEstadoClasses(voucher.estado)"
                        class="px-2 py-1 text-xs font-semibold rounded-full"
                      >
                        {{ getEstadoTexto(voucher.estado) }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="bg-oscuro-800 p-4 rounded-lg">
                  <p class="text-sm text-oscuro-300 mb-2">Titular de la Cuenta</p>
                  <p class="font-semibold text-white">{{ voucher.cuenta_titular }}</p>
                </div>

                <div class="bg-oscuro-800 p-4 rounded-lg">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-oscuro-300">Equipo</p>
                      <p class="font-semibold text-white">{{ voucher.nombre_equipo }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-oscuro-300">Deporte</p>
                      <p class="font-semibold text-white">{{ voucher.deporte }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer con botones de acción -->
        <div class="bg-oscuro-800 px-6 py-4 border-t border-oscuro-700">
          <div class="flex justify-end space-x-3">
            <button
              @click="$emit('cerrar')"
              class="px-6 py-3 text-sm font-semibold text-oscuro-200 bg-oscuro-600 border border-oscuro-500 rounded-lg hover:bg-oscuro-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            >
              Cerrar
            </button>

            <button
              v-if="voucher.estado !== 'rechazado'"
              @click="$emit('validar', voucher.id_voucher, 'rechazado')"
              :disabled="procesando"
              class="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 border border-transparent rounded-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-200 shadow-lg"
            >
              <i v-if="procesando === voucher.id_voucher" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-times"></i>
              Rechazar
            </button>

            <button
              v-if="voucher.estado !== 'validado'"
              @click="$emit('validar', voucher.id_voucher, 'validado')"
              :disabled="procesando"
              class="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 border border-transparent rounded-lg hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-200 shadow-lg"
            >
              <i v-if="procesando === voucher.id_voucher" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-check"></i>
              Validar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  mostrar: {
    type: Boolean,
    default: false
  },
  voucher: {
    type: Object,
    default: () => ({})
  },
  procesando: {
    type: [String, Number, null],
    default: null
  }
})

const emit = defineEmits(['cerrar', 'validar'])

const errorImagen = ref(false)

const imagenUrl = computed(() => {
  if (!props.voucher.nombre_imagen) return ''
  const baseURL = import.meta.env.VITE_API_BASE_URL
  return `${baseURL}/uploads/${props.voucher.nombre_imagen}`
})

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
</script>

<style scoped>
/* Animación del modal */

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Estilos para la imagen */
img {
  transition: transform 0.2s ease;
}

img:hover {
  transform: scale(1.02);
}
</style>