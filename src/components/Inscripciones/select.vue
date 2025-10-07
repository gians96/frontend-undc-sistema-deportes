<template>
  <div class="flex flex-col">
    <label
      :for="inputId"
      class="text-gray-500 font-semibold mb-2 text-sm uppercase tracking-wider"
    >
      {{ label }}
    </label>

    <!-- Native Select -->
    <select
      :id="inputId"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :required="required"
      :disabled="disabled"
      class="px-4 py-3.5 border border-gray-700/40 rounded-md text-base transition-all duration-300 bg-[#182029] text-white focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20 focus:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <option value="" class="bg-gray-800">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        class="bg-gray-800"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true,
    validator: (options) => {
      return options.every(option =>
        typeof option === 'object' &&
        option.hasOwnProperty('value') &&
        option.hasOwnProperty('label')
      )
    }
  },
  placeholder: {
    type: String,
    default: 'Selecciona una opción'
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: null
  }
})

defineEmits(['update:modelValue'])

const inputId = computed(() => {
  return props.id || `select-${Math.random().toString(36).substr(2, 9)}`
})
</script>

<style scoped>
/* Scrollbar personalizado para el dropdown */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #1f2937;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #22c55e;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #16a34a;
}
</style>