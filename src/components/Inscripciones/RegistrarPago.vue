<template>
  <div class="p-4 sm:p-6 border-2 border-green-400 backdrop-blur-sm">
    <!-- Informacion de Pago usando componente separado -->
    <InformacionPago :tipoPago="tipoPago" />

    <!-- Informacion adicional del pago -->
    <div class="mt-4 sm:mt-6 space-y-4">
      <CampoFormulario
        v-model="formularioLocal.titularCuenta"
        etiqueta="Titular de la Cuenta"
        tipo="text"
        placeholder="Nombre del titular de la cuenta Yape"
        :obligatorio="true"
        id="titularCuenta"
      />

      <CampoFormulario
        v-model="formularioLocal.numeroOperacion"
        etiqueta="Número de Operación"
        tipo="text"
        placeholder="Código de operación del Yape"
        :obligatorio="true"
        id="numeroOperacion"
      />
    </div>

    <!-- Seccion para subir comprobante -->
    <div class="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-700/20 rounded-md border border-gray-400/30">
      <h6 class="text-green-400 font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
        <i class="fa-solid fa-cloud-arrow-up"></i>
        Subir Comprobante de Pago
      </h6>

      <div class="space-y-4">
        <!-- Área de drop para imágenes -->
        <div
          @dragover.prevent="dragActive = true"
          @dragenter.prevent="dragActive = true"
          @dragleave.prevent="dragActive = false"
          @drop.prevent="handleDrop"
          @click="fileInput?.click()"
          class="border-2 border-dashed border-gray-400/50 rounded-md p-4 sm:p-6 text-center cursor-pointer hover:border-green-400/50 hover:bg-gray-700/20 transition-all duration-300"
          :class="{
            'border-green-400/50 bg-gray-700/20': dragActive,
          }"
        >
          <div v-if="!comprobante" class="space-y-2">
            <i class="fa-solid fa-images text-2xl sm:text-3xl text-gray-400"></i>
            <p class="text-gray-300 text-xs sm:text-sm">
              Arrastra tu comprobante aquí o haz clic para seleccionar
            </p>
            <p class="text-gray-400 text-xs">
              Formatos: JPG, PNG, WebP (Max. 5MB)
            </p>
          </div>

          <!-- Vista previa de la imagen -->
          <div v-else class="relative">
            <img
              :src="comprobante.preview"
              :alt="comprobante.name"
              class="max-w-full max-h-24 sm:max-h-32 mx-auto rounded-md"
            />
            <p class="text-green-400 text-xs sm:text-sm mt-2 truncate">
              {{ comprobante.name }}
            </p>
            <button
              type="button"
              @click.stop="removeComprobante"
              class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 hover:bg-red-600 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-colors"
            >
              <i class="fa-solid fa-times text-xs"></i>
            </button>
          </div>
        </div>

        <!-- Input oculto para archivos -->
        <input
          ref="fileInput"
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          @change="handleFileChange"
          class="hidden"
        />
      </div>
    </div>

    <!-- Boton Completar Inscripcion -->
    <div class="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-400/20">
      <BotonPrincipal
        icon="fa-solid fa-paper-plane"
        text="Completar Inscripción"
        @click="$emit('submit')"
        :disabled="isSubmitting || !formularioCompleto"
        tipo="submit"
        className="w-full"
      />
      <p
        v-if="isSubmitting"
        class="text-center text-gray-300 text-xs sm:text-sm mt-2"
      >
        Enviando formulario...
      </p>
      <p v-else-if="!formularioCompleto" class="text-center text-yellow-400 text-xs sm:text-sm mt-2 px-2">
        <i class="fa-solid fa-exclamation-triangle mr-1"></i>
        Complete todos los campos para enviar la inscripción
      </p>
      <p v-else class="text-center text-green-400 text-xs sm:text-sm mt-2">
        <i class="fa-solid fa-check-circle mr-1"></i>
        Formulario completo. Listo para enviar
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import InformacionPago from './InformacionPago.vue'
import CampoFormulario from './CampoFormulario.vue'
import BotonPrincipal from '../common/botton/BotonPrincipal.vue'

const propiedades = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      titularCuenta: '',
      numeroOperacion: ''
    })
  },
  tipoPago: {
    type: String,
    default: 'regular'
  },
  comprobante: {
    type: Object,
    default: null
  },
  isSubmitting: {
    type: Boolean,
    default: false
  },
  formularioCompleto: {
    type: Boolean,
    default: false
  }
})

const emitir = defineEmits(['update:modelValue', 'update:comprobante', 'submit'])

const formularioLocal = ref({ ...propiedades.modelValue })
const comprobante = ref(propiedades.comprobante)
const dragActive = ref(false)
const fileInput = ref(null)

// Bandera para evitar ciclos infinitos
let actualizandoDesdeProps = false

// Observador para emitir cambios al componente padre
watch(formularioLocal, (valorNuevo) => {
  if (!actualizandoDesdeProps) {
    emitir('update:modelValue', valorNuevo)
  }
}, { deep: true })

// Observador para actualizar el valor local cuando cambia el prop
watch(() => propiedades.modelValue, (valorNuevo) => {
  actualizandoDesdeProps = true
  formularioLocal.value = { ...valorNuevo }
  nextTick(() => {
    actualizandoDesdeProps = false
  })
}, { deep: true })

// Observador para el comprobante
watch(comprobante, (valorNuevo) => {
  emitir('update:comprobante', valorNuevo)
}, { deep: true })

watch(() => propiedades.comprobante, (valorNuevo) => {
  comprobante.value = valorNuevo
}, { deep: true })

const esPagoCompleto = computed(() => {
  return formularioLocal.value.titularCuenta &&
         formularioLocal.value.numeroOperacion &&
         comprobante.value !== null
})

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    processFile(file)
  } else {
    // Limpiar el input si no hay archivo
    event.target.value = ''
  }
}

const handleDrop = (event) => {
  dragActive.value = false
  const file = event.dataTransfer.files[0]
  if (file) {
    processFile(file)
  }
}

const processFile = (file) => {
  try {
    // Validar que el archivo existe
    if (!file) {
      console.error('No se recibió ningún archivo')
      return
    }

    // Validar tipo de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP)')
      limpiarInputFile()
      return
    }

    // Validar tamaño (5MB maximo)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      alert('El archivo es demasiado grande. El tamaño máximo es 5MB.')
      limpiarInputFile()
      return
    }

    // Crear preview con manejo de errores mejorado
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        if (e.target && e.target.result) {
          comprobante.value = {
            file: file,
            name: file.name,
            preview: e.target.result,
            size: file.size,
            type: file.type
          }
          console.log('Archivo procesado correctamente:', file.name)
        } else {
          console.error('Error: No se pudo obtener el resultado del FileReader')
          limpiarInputFile()
        }
      } catch (error) {
        console.error('Error al procesar el resultado del archivo:', error)
        alert('Error al procesar la imagen. Por favor, intenta nuevamente.')
        limpiarInputFile()
      }
    }

    reader.onerror = (error) => {
      console.error('Error al leer el archivo:', error)
      alert('Error al leer el archivo. Por favor, intenta con otra imagen.')
      limpiarInputFile()
    }

    reader.onabort = () => {
      console.warn('Lectura del archivo cancelada')
      limpiarInputFile()
    }

    // Iniciar la lectura del archivo
    reader.readAsDataURL(file)

  } catch (error) {
    console.error('Error en processFile:', error)
    alert('Error inesperado al procesar la imagen. Por favor, intenta nuevamente.')
    limpiarInputFile()
  }
}

// Función auxiliar para limpiar el input de archivos
const limpiarInputFile = () => {
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const removeComprobante = () => {
  comprobante.value = null
  limpiarInputFile()
}

defineExpose({
  esPagoCompleto
})
</script>