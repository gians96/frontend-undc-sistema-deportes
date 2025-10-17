<template>
  <button
    :type="tipo"
    :disabled="disabled"
    :class="[
      'group relative w-full px-6 py-4 md:py-3.5 overflow-hidden rounded-full md:rounded-lg font-semibold text-base transition-all duration-300',
      disabled
        ? 'bg-oscuro-600 text-oscuro-400 cursor-not-allowed'
        : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 active:scale-95 cursor-pointer transition-colors'
    ]"
    @click="handleClick"
  >
    <!-- Efecto de brillo animado -->
    <span
      v-if="!disabled"
      class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
    ></span>

    <!-- Contenido del botón -->
    <span class="relative flex items-center justify-center gap-2">
      <i v-if="icono" :class="icono"></i>
      <span>{{ texto }}</span>
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  texto: {
    type: String,
    required: true
  },
  icono: {
    type: String,
    default: ''
  },
  tipo: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>
