<template>
  <Teleport to="body">
    <div
      v-if="mostrar"
      class="fixed inset-0 z-50 flex items-center justify-center"
      @click="cerrarPorFondo"
    >
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <!-- Modal -->
      <div
        class="relative bg-[#0f161b] rounded-xl shadow-2xl border max-w-lg w-full mx-4 transform transition-all duration-300 overflow-hidden"
        :class="[animacionClase, tipoClases.modalBorder]"
        @click.stop
      >
        <!-- Header con gradiente -->
        <div class="p-6 border-b" :class="tipoClases.headerBg">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="relative">
                <div
                  class="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                  :class="tipoClases.iconoGradiente"
                >
                  <i
                    class="text-white text-xl"
                    :class="tipoClases.iconoClase"
                  ></i>
                </div>
                <div
                  v-if="tipo === 'advertencia'"
                  class="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                >
                  <i class="fa-solid fa-exclamation text-gray-900 text-xs font-bold"></i>
                </div>
              </div>
              <div>
                <h3 class="text-white text-xl font-bold">{{ titulo }}</h3>
                <p class="text-sm" :class="tipoClases.subtitulo">{{ tipoClases.subtituloTexto }}</p>
              </div>
            </div>
            <button
              @click="cerrar"
              class="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700/50"
            >
              <i class="fa-solid fa-times text-lg"></i>
            </button>
          </div>
        </div>

        <!-- Contenido principal -->
        <div class="p-6">
          <div class="space-y-4 mb-6">
            <!-- Mensaje principal -->
            <div v-if="mensaje" class="text-gray-300 leading-relaxed" v-html="mensaje"></div>

            <!-- Lista de campos faltantes (solo para advertencia) -->
            <div
              v-if="tipo === 'advertencia' && camposFaltantes.length > 0"
              class="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30"
            >
              <h4 class="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                <i class="fa-solid fa-exclamation-triangle"></i>
                Campos faltantes:
              </h4>
              <ul class="space-y-1">
                <li
                  v-for="campo in camposFaltantes"
                  :key="campo"
                  class="text-yellow-300 text-sm flex items-center gap-2"
                >
                  <div class="w-1 h-1 rounded-full bg-yellow-300"></div>
                  {{ campo }}
                </li>
              </ul>
            </div>

            <!-- Advertencia especial para confirmación -->
            <div
              v-if="tipo === 'confirmacion'"
              class="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4"
            >
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i class="fa-solid fa-exclamation text-gray-900 text-xs font-bold"></i>
                </div>
                <div>
                  <h6 class="text-yellow-400 font-semibold mb-1">Importante</h6>
                  <p class="text-yellow-200 text-sm leading-relaxed">
                    Una vez enviada la inscripción, no podrá modificar los datos.
                    Asegúrese de que toda la información sea correcta antes de continuar.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Botones -->
          <div class="flex gap-3">
            <button
              v-if="mostrarCancelar"
              @click="cancelar"
              class="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-2"
            >
              <i class="fa-solid fa-arrow-left"></i>
              {{ textoCancelar }}
            </button>
            <button
              @click="confirmar"
              class="flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              :class="tipoClases.boton"
            >
              <i :class="tipoClases.botonIcono"></i>
              {{ textoConfirmar }}
            </button>
          </div>
        </div>

        <!-- Footer decorativo -->
        <div class="h-1" :class="tipoClases.footer"></div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

const props = defineProps({
  mostrar: {
    type: Boolean,
    default: false
  },
  tipo: {
    type: String,
    default: 'confirmacion',
    validator: (valor) => ['confirmacion', 'exito', 'advertencia', 'error'].includes(valor)
  },
  titulo: {
    type: String,
    required: true
  },
  mensaje: {
    type: String,
    required: true
  },
  textoConfirmar: {
    type: String,
    default: 'Confirmar'
  },
  textoCancelar: {
    type: String,
    default: 'Cancelar'
  },
  mostrarCancelar: {
    type: Boolean,
    default: true
  },
  camposFaltantes: {
    type: Array,
    default: () => []
  },
  cerrarPorOverlay: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['confirmar', 'cancelar', 'cerrar'])

const animacionClase = ref('scale-95 opacity-0')

const tipoClases = computed(() => {
  const clases = {
    confirmacion: {
      modalBorder: 'border-green-400/30',
      headerBg: 'bg-gradient-to-r from-green-500/20 to-green-400/20 border-green-400/30',
      iconoGradiente: 'bg-gradient-to-br from-green-400 to-green-600',
      iconoClase: 'fa-solid fa-shield-halved',
      subtitulo: 'text-green-300/80',
      subtituloTexto: 'Verificar datos antes de enviar',
      boton: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-green-500/25',
      botonIcono: 'fa-solid fa-paper-plane',
      footer: 'bg-gradient-to-r from-green-400 via-green-500 to-green-400'
    },
    exito: {
      modalBorder: 'border-green-400/30',
      headerBg: 'bg-gradient-to-r from-green-500/20 to-green-400/20 border-green-400/30',
      iconoGradiente: 'bg-gradient-to-br from-green-400 to-green-600',
      iconoClase: 'fa-solid fa-check-circle',
      subtitulo: 'text-green-300/80',
      subtituloTexto: '¡Proceso completado exitosamente!',
      boton: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-green-500/25',
      botonIcono: 'fa-solid fa-check',
      footer: 'bg-gradient-to-r from-green-400 via-green-500 to-green-400'
    },
    advertencia: {
      modalBorder: 'border-yellow-400/10',
      headerBg: 'bg-gradient-to-r from-yellow-400/10 to-yellow-400/10 border-yellow-400/30',
      iconoGradiente: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
      iconoClase: 'fa-solid fa-exclamation-triangle',
      subtitulo: 'text-yellow-300/80',
      subtituloTexto: 'Revisar campos requeridos',
      boton: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 hover:shadow-yellow-500/25',
      botonIcono: 'fa-solid fa-check',
      footer: 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400'
    },
    error: {
      modalBorder: 'border-red-400/30',
      headerBg: 'bg-gradient-to-r from-red-500/20 to-red-400/20 border-red-400/30',
      iconoGradiente: 'bg-gradient-to-br from-red-400 to-red-600',
      iconoClase: 'fa-solid fa-times-circle',
      subtitulo: 'text-red-300/80',
      subtituloTexto: 'Ha ocurrido un error',
      boton: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white hover:shadow-red-500/25',
      botonIcono: 'fa-solid fa-times',
      footer: 'bg-gradient-to-r from-red-400 via-red-500 to-red-400'
    }
  }
  return clases[props.tipo]
})

const confirmar = () => {
  emit('confirmar')
}

const cancelar = () => {
  emit('cancelar')
}

const cerrar = () => {
  animacionClase.value = 'scale-95 opacity-0'
  setTimeout(() => {
    emit('cerrar')
  }, 200)
}

const cerrarPorFondo = () => {
  if (props.cerrarPorOverlay) {
    cerrar()
  }
}

const manejarEscape = (evento) => {
  if (evento.key === 'Escape' && props.mostrar) {
    cerrar()
  }
}

// Watcher para manejar las animaciones cuando el modal se muestra/oculta
watch(() => props.mostrar, async (nuevoValor) => {
  if (nuevoValor) {
    // Modal se está mostrando - iniciar con escala pequeña
    animacionClase.value = 'scale-95 opacity-0'
    await nextTick()
    // Pequeño delay para permitir que el DOM se actualice
    requestAnimationFrame(() => {
      animacionClase.value = 'scale-100 opacity-100'
    })
  }
}, { immediate: false })

onMounted(() => {
  document.addEventListener('keydown', manejarEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', manejarEscape)
})
</script>

<style scoped>
/* Animaciones personalizadas */
.transform {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
</style>