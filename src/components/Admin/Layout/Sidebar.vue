<template>
  <aside
    class="fixed left-0 top-0 h-full bg-oscuro-900/80 backdrop-blur-lg border-r border-oscuro-700 transition-transform duration-300 ease-in-out z-50 flex-col w-64 hidden lg:flex"
  >
    <!-- Header -->
    <div class="p-6 border-b border-oscuro-700">
      <div class="flex items-center gap-4">
        <div class="bg-green-500/10 py-3 px-2 rounded-lg border border-green-500/20 shadow-lg shadow-green-950/50">
          <i class="fa-solid fa-shield-halved text-green-400 text-xl"></i>
        </div>
        <div>
          <h1 class="text-xl font-bold text-white">
            UNDC <span class="text-green-400 glow-text">Admin</span>
          </h1>
          <p class="text-sm text-oscuro-300">Panel de control</p>
        </div>
      </div>
    </div>

    <!-- Navegación Desktop -->
    <nav class="p-4 flex-grow">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.path">
          <RouterLink
            :to="item.path"
            class="nav-item"
            :class="{ 'nav-item-active': $route.path.startsWith(item.path) }"
          >
            <component :is="item.icon" />
            <span>{{ item.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-oscuro-700 space-y-4">
        <button @click="$emit('goToHome')" class="w-full flex items-center gap-3 text-sm text-oscuro-200 hover:text-white transition-colors duration-200">
            <i class="fa-solid fa-arrow-up-right-from-square w-4 text-center"></i>
            <span>Volver al sitio principal</span>
        </button>

        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <img class="w-9 h-9 rounded-full object-cover" src="https://ui-avatars.com/api/?name=Admin+User&background=080c0f&color=22c55e&bold=true" alt="Avatar de usuario">
                <div>
                    <p class="text-sm font-semibold text-white">Admin User</p>
                    <p class="text-xs text-oscuro-400">Administrador</p>
                </div>
            </div>
            <button @click="$emit('cerrarSesion')" class="w-9 h-9 flex items-center justify-center text-oscuro-300 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors duration-200" title="Cerrar Sesión">
                <i class="fa-solid fa-power-off"></i>
            </button>
        </div>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router';

defineProps({
  menuItems: Array,
});

defineEmits(['goToHome', 'cerrarSesion']);

const route = useRoute(); // Needed for $route in template
</script>

<style scoped>
.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1.5rem;
  color: var(--color-oscuro-300);
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.025em;
  position: relative;
}

.nav-item:hover:not(.nav-item-active) {
  color: white;
  background-color: var(--color-oscuro-800);
  transform: translateX(4px);
}

.nav-item-active {
  color: white;
  background: linear-gradient(90deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0) 100%);
  box-shadow: 
    inset 3px 0 0 0 rgba(34, 197, 94, 0.7),
    0 1px 15px rgba(34, 197, 94, 0.1);
  transform: translateX(4px);
}

.nav-item-active span {
  color: #22c55e;
  font-weight: 700;
  text-shadow: 0 0 5px rgba(34, 197, 94, 0.5);
}

.nav-item :deep(svg) {
  width: 1.5rem;
  height: 1.5rem;
  transition: all 0.3s ease;
}

.nav-item-active :deep(svg) {
  color: #22c55e;
  filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.7));
}
</style>