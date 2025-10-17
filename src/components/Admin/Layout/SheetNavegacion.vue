<template>
  <div>
    <!-- Menú Sheet Modal (Overlay) -->
    <div
      v-if="modelValue"
      @click="close"
      class="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
      :class="modelValue ? 'opacity-100' : 'opacity-0 pointer-events-none'"
    ></div>

    <!-- Menú Sheet Modal (Contenido) -->
    <aside
      class="fixed bottom-0 left-0 right-0 w-full bg-oscuro-850 border border-oscuro-700 backdrop-blur-xl shadow-2xl z-50 md:hidden transition-transform duration-300 ease-in-out rounded-t-4xl"
      :class="modelValue ? 'translate-y-0' : 'translate-y-full'"
    >
      <div class="p-4 max-h-[80vh] overflow-y-auto">
        <div class="w-12 h-1.5 mx-auto rounded-full bg-oscuro-600 mb-4"></div>
        <nav class="pt-2">
          <RouterLink
            v-for="(item, i) in menuItems"
            :key="item.path"
            :to="item.path"
            @click="close"
            class="flex items-center py-4 px-4 transition-colors duration-200 group border-b"
            :class="[
              $route.path === item.path
                ? 'text-green-400 font-bold'
                : 'text-oscuro-200',
              i === menuItems.length - 1
                ? 'border-transparent'
                : 'border-oscuro-600',
            ]"
          >
            <component
              :is="item.icon"
              class="w-5 h-5 mr-4 transition-colors duration-200"
              :class="[
                $route.path === item.path
                  ? 'text-green-400'
                  : 'text-oscuro-400',
              ]"
            />
            <span>{{ item.label }}</span>
          </RouterLink>

          <!-- Ítem de configuración / logout -->
          <button
            @click="handleAction(configMenuItem.action)"
            class="flex items-center py-4 px-4 transition-colors duration-200 group border-t mt-2 pt-4 border-oscuro-600 text-oscuro-200 w-full"
          >
            <component
              :is="configMenuItem.icon"
              class="w-5 h-5 mr-4 text-oscuro-400"
            />
            <span>{{ configMenuItem.label }}</span>
          </button>
        </nav>
      </div>
    </aside>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  menuItems: Array,
  configMenuItem: Object,
});

const emit = defineEmits(['update:modelValue', 'menu-action']);

const close = () => {
  emit('update:modelValue', false);
};

const handleAction = (action) => {
  emit('menu-action', action);
  close();
};
</script>
