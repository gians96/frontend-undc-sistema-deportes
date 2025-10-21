<template>
  <li class="-ml-[25px]">
    <button
      @click="$emit('click')"
      :class="[
        'font-sans text-sm font-bold uppercase py-3.5 px-11 [clip-path:polygon(0_0,calc(100%-25px)_0,100%_100%,25px_100%)] transition-colors duration-300 cursor-pointer',
        active
          ? 'bg-verde-primario text-oscuro-800'
          : 'text-white bg-oscuro-600 hover:bg-oscuro-500'
      ]"
      type="button"
    >
      <slot></slot>
    </button>
  </li>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']);
</script>
