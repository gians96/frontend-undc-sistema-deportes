<template>
  <a
    :href="href"
    class="relative flex flex-col items-center justify-center w-32 h-28 bg-oscuro-900 border-2 border-[#68fb9a] text-[#68fb9a] font-sans transition-all duration-300 ease-out group hover:bg-[#68fb9a] hover:text-[#0a0b0f]"
  >
    <i class="text-3xl" :class="icono"></i>

    <span class="mt-3 uppercase text-sm font-semibold tracking-widest">{{
      texto
    }}</span>

    <svg
      class="absolute -bottom-1.5"
      xmlns="http://www.w3.org/2000/svg"
      width="65"
      height="5"
      viewBox="0 0 65 5"
    >
      <path
        d="M968,5630h65l-4,5H972Z"
        transform="translate(-968 -5630)"
        fill="#68fb9a"
      ></path>
    </svg>
  </a>
</template>

<script setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
  icono: {
    type: String,
    required: true,
  },
  texto: {
    type: String,
    required: true,
  },
});
</script>
