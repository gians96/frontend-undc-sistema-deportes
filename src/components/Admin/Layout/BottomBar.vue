<template>
  <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-oscuro-900/90 backdrop-blur-sm shadow-lg z-30 border-t border-oscuro-700">
    <div class="flex justify-around items-center h-16 text-oscuro-300">
      <router-link
        v-for="item in bottomNavItems.slice(0, 4)" 
        :key="item.path"
        :to="item.path"
        class="flex flex-col items-center justify-center flex-1 py-2 transition-colors duration-300 ease-in-out"
        :class="{ 'text-green-400': $route.path.startsWith(item.path) }"
      >
        <component :is="item.icon" class="w-6 h-6 mb-1" />
        <span 
          class="font-medium text-xs"
          :class="{ 'glow-text': $route.path.startsWith(item.path) }"
        >
          {{ item.label }}
        </span>
      </router-link>
      <button
        @click="openSheet"
        class="flex flex-col items-center justify-center flex-1 py-2 transition-colors duration-300 ease-in-out"
      >
        <component :is="DashboardIcono" class="w-6 h-6 mb-1" />
        <span class="font-medium text-xs">Más</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import DashboardIcono from '@/components/icons/DashboardIcono.vue';

defineProps({
  bottomNavItems: Array,
});

const emit = defineEmits(['open-sheet']);

const openSheet = () => {
  emit('open-sheet');
};
</script>