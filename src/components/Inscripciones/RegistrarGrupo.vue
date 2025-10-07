<template>
  <div class="p-4 sm:p-6 rounded-md border border-gray-400/20 backdrop-blur-sm">
    <h3 class="text-white text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 pb-1 glow-text flex items-center gap-2 uppercase border-b border-gray-400/20">
      Información del equipo
    </h3>

    <div class="space-y-4 sm:space-y-6">
      <!-- 1. Tipo de Inscripción -->
      <CampoFormulario
        v-model="formularioLocal.tipoPago"
        etiqueta="Tipo de Inscripción"
        tipo="select"
        placeholder="Selecciona el tipo de inscripción"
        :opciones="opcionesPago"
        :obligatorio="true"
        id="tipoPago"
      />

      <!-- 2. Ciclo Académico y Sección -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CampoFormulario
          v-model="formularioLocal.ciclo"
          etiqueta="Ciclo Académico"
          tipo="select"
          placeholder="Selecciona el ciclo"
          :opciones="opcionesCiclos"
          :obligatorio="true"
          id="ciclo"
        />

        <CampoFormulario
          v-model="formularioLocal.seccion"
          etiqueta="Sección"
          tipo="select"
          placeholder="Selecciona una sección"
          :opciones="opcionesSecciones"
          :obligatorio="formularioLocal.tipoPago !== 'adicional'"
          :deshabilitado="formularioLocal.tipoPago === 'adicional'"
          id="seccion"
        />
      </div>

      <!-- 3. Celular y Correo Electrónico -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CampoFormulario
          v-model="formularioLocal.celular"
          etiqueta="Celular"
          tipo="tel"
          placeholder="Ingrese Nro. celular"
          :obligatorio="true"
          id="celular"
        />

        <CampoFormulario
          v-model="formularioLocal.email"
          etiqueta="Correo Electrónico"
          tipo="email"
          placeholder="Ingrese correo electrónico"
          :obligatorio="true"
          id="email"
        />
      </div>

      <!-- 4. Nombre del Grupo -->
      <CampoFormulario
        v-model="formularioLocal.nombreGrupo"
        etiqueta="Nombre del Grupo"
        tipo="text"
        placeholder="Ingrese el nombre de su equipo"
        :obligatorio="true"
        id="nombreGrupo"
      />

      <!-- 5. Deporte -->
      <CampoFormulario
        v-model="formularioLocal.deporte"
        etiqueta="Deporte"
        tipo="select"
        placeholder="Selecciona un deporte"
        :opciones="opcionesDeportes"
        :obligatorio="true"
        id="deporte"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import CampoFormulario from './CampoFormulario.vue'
import { useInscripcionesEquipo } from '@/composables/inscripciones-equipo.js'
import { useOpcionesPago } from '@/stores/inscripciones.js'

const propiedades = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      ciclo: '',
      celular: '',
      email: '',
      nombreGrupo: '',
      deporte: '',
      tipoPago: 'regular',
      seccion: ''
    })
  }
})

const emitir = defineEmits(['update:modelValue'])

const modelValue = computed(() => propiedades.modelValue)

// Store para opciones de pago
const storePago = useOpcionesPago()

// Transformar opciones de pago para el formato del select
const opcionesPago = computed(() =>
  storePago.pago.map(opcion => ({
    valor: opcion.valor,
    etiqueta: `${opcion.tipo} - S/ ${opcion.monto}`
  }))
)

// Opciones de secciones
const opcionesSecciones = [
  { valor: 'A', etiqueta: 'Sección A' },
  { valor: 'B', etiqueta: 'Sección B' }
]

const {
  formularioLocal,
  opcionesCiclos,
  opcionesDeportes,
  esFormularioCompleto
} = useInscripcionesEquipo(modelValue, emitir)

// Watcher para limpiar la sección cuando el tipo de pago es "adicional"
watch(() => formularioLocal.value.tipoPago, (nuevoTipo) => {
  if (nuevoTipo === 'adicional') {
    formularioLocal.value.seccion = ''
  }
})
</script>

