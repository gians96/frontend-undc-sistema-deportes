<template>
  <header
    class="lg:hidden bg-oscuro-900/80 backdrop-blur-lg border-b border-oscuro-700 sticky top-0 z-20"
  >
    <div class="flex items-center gap-4 p-4 h-16">
      <div
        class="bg-green-500/10 p-2 rounded-lg border border-green-500/20 shadow-lg shadow-green-950/50"
      >
        <i class="fa-solid fa-shield-halved text-green-400 text-lg"></i>
      </div>
      <h1 class="text-xl font-bold text-white glow-text">
        {{ title }}
      </h1>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
