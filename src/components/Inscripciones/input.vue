<template>
  <div class="flex flex-col">
    <label
      :for="inputId"
      class="text-gray-500 font-semibold mb-2 text-sm uppercase tracking-wider"
    >
      {{ label }}
    </label>
    <input
      :id="inputId"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="px-4 py-3.5 border border-gray-700/40 rounded-md text-base transition-all duration-300 bg-[#182029] text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:shadow-lg focus:shadow-green-400/20 focus:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
    />
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
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
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
  return props.id || `input-${Math.random().toString(36).substr(2, 9)}`
})
</script>