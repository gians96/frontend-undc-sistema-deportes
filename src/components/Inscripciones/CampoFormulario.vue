<template>
  <div class="flex flex-col">
    <label
      :for="idCampo"
      class="text-gray-500 font-semibold mb-2 text-sm uppercase tracking-wider"
    >
      {{ etiqueta }}
    </label>

    <!-- Input de texto, numero, email, tel, etc -->
    <input
      v-if="tipo !== 'select'"
      :id="idCampo"
      :type="tipo"
      :placeholder="placeholder"
      :required="obligatorio"
      :disabled="deshabilitado"
      :value="modelValue"
      @input="actualizarValor($event.target.value)"
      class="px-4 py-3.5 border border-gray-700/40 rounded-md text-base transition-all duration-300 bg-[#182029] text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20 focus:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
    />

    <!-- Select nativo -->
    <select
      v-else
      :id="idCampo"
      :value="modelValue"
      @input="actualizarValor($event.target.value)"
      :required="obligatorio"
      :disabled="deshabilitado"
      class="px-4 py-3.5 border border-gray-700/40 rounded-md text-base transition-all duration-300 bg-[#182029] text-white focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20 focus:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <option value="" class="bg-gray-800">{{ placeholder }}</option>
      <option
        v-for="opcion in opciones"
        :key="opcion.valor"
        :value="opcion.valor"
        class="bg-gray-800"
      >
        {{ opcion.etiqueta }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const propiedades = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  etiqueta: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    default: 'text',
    validator: (valor) => {
      return ['text', 'email', 'tel', 'number', 'password', 'select'].includes(valor)
    }
  },
  placeholder: {
    type: String,
    default: ''
  },
  obligatorio: {
    type: Boolean,
    default: false
  },
  deshabilitado: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: null
  },
  opciones: {
    type: Array,
    default: () => [],
    validator: (opciones) => {
      return opciones.every(opcion =>
        typeof opcion === 'object' &&
        opcion.hasOwnProperty('valor') &&
        opcion.hasOwnProperty('etiqueta')
      )
    }
  }
})

const emitir = defineEmits(['update:modelValue'])

const idCampo = computed(() => {
  return propiedades.id || `campo-${Math.random().toString(36).substr(2, 9)}`
})

const actualizarValor = (nuevoValor) => {
  emitir('update:modelValue', nuevoValor)
}
</script>

<style scoped>
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px #182029 inset !important; /* fondo */
  box-shadow: 0 0 0 1000px #182029 inset !important;
  -webkit-text-fill-color: #e2e8f0 !important;
  caret-color: #e2e8f0 !important;
  border-color: #374151 !important; /* gray-700 */
  outline: none;
  
}

input:-webkit-autofill:focus {
  border-color: #22c55e; /* green-400 */
  outline: none;
}



</style>