<template>
  <div
    v-if="mostrar"
    class="fixed inset-0 bg-[#0a0e13]/20 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    @click.self="$emit('cerrar')"
  >
    <div
      class="bg-gradient-to-br from-[#0a0e13] via-[#0f161b] to-[#0a0e13] rounded-xl border border-gray-700/50 shadow-2xl shadow-green-700/20 max-w-md w-full transform transition-all duration-300"
      :class="{ 'scale-95 opacity-0': !mostrar }"
    >
      <!-- Header -->
      <div class="p-6 border-b border-gray-700/50">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-green-400/10 rounded-full flex items-center justify-center border border-green-400/20">
              <i class="fas fa-key text-green-400"></i>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white glow-text">
                Acceso a Inscripciones
              </h3>
              <p class="text-gray-400 text-sm">
                Ingrese su UUID autorizado
              </p>
            </div>
          </div>
          <button
            @click="$emit('cerrar')"
            class="text-gray-400 hover:text-white transition-colors p-1"
          >
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-6">
        <!-- Mensaje de informacion -->
        <div class="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
          <div class="flex items-start space-x-3">
            <i class="fas fa-info-circle text-blue-400 mt-0.5"></i>
            <div class="text-sm text-blue-200">
              <p class="font-medium mb-1">Acceso Restringido</p>
              <p class="text-blue-300/80">
                Por seguridad, necesita un UUID válido para acceder al formulario de inscripciones.
                Este código debe ser proporcionado por la administración.
              </p>
            </div>
          </div>
        </div>

        <!-- Campo UUID -->
        <div class="space-y-2">
          <CampoFormulario
            v-model="uuidIngresado"
            etiqueta="UUID de Acceso"
            tipo="text"
            placeholder="Ingrese el UUID"
            :obligatorio="true"
            id="uuidAcceso"
            @keyup.enter="validarAcceso"
          />

          <!-- Mensaje de error -->
          <div
            v-if="mostrarError"
            class="bg-red-500/10 border border-red-400/30 rounded-lg p-3"
          >
            <div class="flex items-center space-x-2">
              <i class="fas fa-exclamation-triangle text-red-400 text-sm"></i>
              <p class="text-red-300 text-sm">
                {{ mensajeError }}
              </p>
            </div>
          </div>

          <!-- Mensaje de exito -->
          <div
            v-if="mostrarExito"
            class="bg-green-500/10 border border-green-400/30 rounded-lg p-3"
          >
            <div class="flex items-center space-x-2">
              <i class="fas fa-check-circle text-green-400 text-sm"></i>
              <p class="text-green-300 text-sm">
                UUID válido. Redirigiendo...
              </p>
            </div>
          </div>
        </div>

      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-gray-700/50 flex justify-end space-x-3">
        <button
          @click="$emit('cerrar')"
          class="px-4 py-2 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-all duration-300"
          :disabled="validando"
        >
          Cancelar
        </button>
        <button
          @click="validarAcceso"
          class="px-6 py-2 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white font-medium rounded-lg shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          :disabled="!uuidIngresado.trim() || validando"
        >
          <i v-if="validando" class="fas fa-spinner fa-spin"></i>
          <i v-else class="fas fa-unlock"></i>
          <span>{{ validando ? 'Validando...' : 'Acceder' }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import CampoFormulario from './CampoFormulario.vue'
import { useAutorizarIngreso } from '@/stores/inscripciones.js'

const props = defineProps({
  mostrar: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['cerrar', 'acceso-concedido'])

const router = useRouter()
const storeAuth = useAutorizarIngreso()

// Estado del componente
const uuidIngresado = ref('')
const validando = ref(false)
const mostrarError = ref(false)
const mostrarExito = ref(false)
const mensajeError = ref('')

// Limpiar estados cuando se cierra el modal
watch(() => props.mostrar, (nuevo) => {
  if (!nuevo) {
    limpiarEstados()
  }
})

const limpiarEstados = () => {
  uuidIngresado.value = ''
  mostrarError.value = false
  mostrarExito.value = false
  mensajeError.value = ''
  validando.value = false
}

const validarFormatoUuid = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

const validarAcceso = async () => {
  if (!uuidIngresado.value.trim()) {
    mostrarErrorMessage('Por favor, ingrese un UUID válido')
    return
  }

  // Validar formato del UUID
  if (!validarFormatoUuid(uuidIngresado.value.trim())) {
    mostrarErrorMessage('El formato del UUID no es válido. Debe seguir el patrón: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    return
  }

  validando.value = true
  mostrarError.value = false
  mostrarExito.value = false

  try {
    // Simular un pequeño delay para mejor UX
    await new Promise(resolve => setTimeout(resolve, 800))

    // Verificar UUID usando el store
    const esValido = storeAuth.verificarUuid(uuidIngresado.value.trim())

    if (esValido) {
      mostrarExito.value = true

      // Emit para notificar al componente padre
      emit('acceso-concedido')

      // Redirigir después de un breve delay
      setTimeout(() => {
        router.push('/inscripciones')
        emit('cerrar')
      }, 1500)

    } else {
      mostrarErrorMessage('UUID no autorizado. Verifique el código e intente nuevamente.')
    }

  } catch (error) {
    console.error('Error al validar UUID:', error)
    mostrarErrorMessage('Error interno. Intente nuevamente en unos momentos.')
  } finally {
    validando.value = false
  }
}

const mostrarErrorMessage = (mensaje) => {
  mensajeError.value = mensaje
  mostrarError.value = true
  mostrarExito.value = false
}

// Limpiar error cuando el usuario empiece a escribir
watch(uuidIngresado, () => {
  if (mostrarError.value) {
    mostrarError.value = false
  }
})
</script>

<style scoped>
.glow-text {
  text-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
}

/* Animacion de entrada del modal */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Efectos de hover mejorados */
button:hover:not(:disabled) {
  transform: translateY(-1px);
}

/* Animacion del spinner */
.fa-spin {
  animation: fa-spin 1s infinite linear;
}

@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Efectos de focus mejorados */
input:focus {
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

/* Responsive mejoras */
@media (max-width: 480px) {
  .max-w-md {
    max-width: calc(100vw - 2rem);
    margin: 1rem;
  }
}

</style>