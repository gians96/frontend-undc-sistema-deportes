<template>
  <div class="flex flex-col group">
    <!-- Etiqueta -->
    <label
      :for="idCampo"
      class="text-oscuro-300 font-medium mb-2 text-sm transition-colors duration-200 group-focus-within:text-green-400"
    >
      {{ etiqueta }}
    </label>

    <!-- Input container -->
    <div class="relative">
      <!-- Icono izquierdo (slot) -->
      <div v-if="$slots.icono" class="absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 group-focus-within:text-green-400">
        <slot name="icono"></slot>
      </div>

      <!-- Input -->
      <input
        :id="idCampo"
        :type="mostrarContrasena ? 'text' : tipo"
        :placeholder="placeholder"
        :required="obligatorio"
        :disabled="deshabilitado"
        :value="modelValue"
        @input="actualizarValor($event.target.value)"
        :class="[
          'w-full px-4 py-3 bg-oscuro-900/50 text-white placeholder-oscuro-400 rounded-full md:rounded-lg border transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'hover:border-oscuro-500',
          $slots.icono ? 'pl-12' : 'pl-4',
          tipo === 'password' ? 'pr-12' : 'pr-4',
          'border-oscuro-600'
        ]"
      />

      <!-- Toggle contraseña -->
      <button
        v-if="tipo === 'password'"
        type="button"
        @click="mostrarContrasena = !mostrarContrasena"
        tabindex="-1"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-oscuro-400 hover:text-green-400 transition-colors duration-200"
      >
        <i :class="mostrarContrasena ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
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
    validator: valor => ['text', 'email', 'tel', 'number', 'password'].includes(valor)
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
  }
})

const emit = defineEmits(['update:modelValue'])

const idCampo = computed(() => props.id || `campo-${Math.random().toString(36).substring(2, 9)}`)

const actualizarValor = (valor) => {
  emit('update:modelValue', valor)
}

const mostrarContrasena = ref(false)
</script>

<style scoped>
/* Autofill styling */
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px #0f1419 inset !important;
  -webkit-text-fill-color: #ffffff !important;
  caret-color: #ffffff !important;
  border-color: #374151 !important;
}

input:-webkit-autofill:focus {
  border-color: #22c55e !important;
  -webkit-box-shadow: 0 0 0 1000px #0f1419 inset, 0 0 0 2px rgba(34, 197, 94, 0.5) !important;
}
</style>
