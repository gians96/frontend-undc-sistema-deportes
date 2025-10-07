<template>
  <div class="admin-layout">
    <!-- Mobile overlay -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
      @click="closeSidebar"
    ></div>

    <!-- Sidebar -->
    <aside
      class="fixed left-0 top-0 h-full bg-oscuro-800 border-r border-oscuro-600 transition-transform duration-300 z-50"
      :class="[
        'w-64',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Header -->
      <div class="p-6 border-b border-oscuro-600">
        <div class="flex items-center gap-3">
          <div class="bg-green-500 py-2 px-2 rounded-lg shadow-lg">
            <i class="fa-solid fa-shield-halved text-white text-lg"></i>
          </div>
          <div>
            <h1 class="text-xl font-bold text-white">
              UNDC <span class="text-green-400 glow-text">Admin</span>
            </h1>
            <p class="text-sm text-oscuro-200">Panel de administración</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="p-4">
        <ul class="space-y-2">
          <li>
            <RouterLink
              to="/admin"
              class="nav-item"
              :class="{ 'nav-item-active': $route.path === '/admin' }"
              @click="closeSidebar"
            >
              <i class="fa-solid fa-chart-line"></i>
              <span>Dashboard</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/voucher"
              class="nav-item"
              :class="{ 'nav-item-active': $route.path === '/admin/voucher' }"
              @click="closeSidebar"
            >
              <i class="fa-solid fa-receipt"></i>
              <span>Vouchers</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/equipos"
              class="nav-item"
              :class="{ 'nav-item-active': $route.path === '/admin/equipos' }"
              @click="closeSidebar"
            >
              <i class="fa-solid fa-users"></i>
              <span>Equipos</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/admin/partidos"
              class="nav-item"
              :class="{ 'nav-item-active': $route.path === '/admin/partidos' }"
              @click="closeSidebar"
            >
              <i class="fa-solid fa-futbol"></i>
              <span>Partidos</span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- Footer -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-oscuro-600 space-y-2 bg-oscuro-800/90 backdrop-blur-md">
        <!-- Botón de cerrar sesión -->
        <button
          @click="handleCerrarSesion"
          class="w-full flex items-center justify-between gap-3 px-4 py-3 text-red-400 hover:bg-red-950/20 rounded-lg transition-all duration-300 group cursor-pointer"
        >
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-arrow-right-from-bracket transition-transform duration-300"></i>
            <span class="font-medium">Cerrar Sesión</span>
          </div>
          <i class="fas fa-circle-exclamation text-sm opacity-50 group-hover:opacity-100 transition-opacity"></i>
        </button>

        <!-- Botón volver al sitio -->
        <button
          @click="goToHome"
          class="w-full flex items-center justify-between gap-3 px-4 py-3 text-oscuro-200 hover:text-white hover:bg-oscuro-700/50 rounded-lg transition-all duration-200 group"
        >
          <div class="flex items-center gap-3">
            <i class="fa-solid fa-arrow-left transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:scale-110"></i>
            <span class="font-medium">Volver al sitio</span>
          </div>
          <i class="fas fa-house text-sm opacity-50 group-hover:opacity-100 transition-opacity"></i>
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="lg:ml-64 min-h-screen bg-oscuro-900">
      <!-- Mobile header -->
      <header class="lg:hidden bg-oscuro-800 shadow-lg border-b border-oscuro-600">
        <div class="flex items-center justify-between p-4">
          <button
            @click="openSidebar"
            class="p-2 rounded-lg hover:bg-oscuro-700 transition-colors"
          >
            <i class="fa-solid fa-bars text-gray-300"></i>
          </button>
          <h1 class="text-lg font-semibold text-white">
            {{ getPageTitle() }}
          </h1>
          <div class="w-10"></div>
        </div>
      </header>

      <!-- Page content -->
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const sidebarOpen = ref(false)

const openSidebar = () => {
  sidebarOpen.value = true
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const goToHome = () => {
  router.push('/')
}

const handleCerrarSesion = async () => {
  try {
    await authStore.cerrarSesion()
    router.push('/login')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

const getPageTitle = () => {
  const titles = {
    '/admin': 'Dashboard',
    '/admin/voucher': 'Administración de Vouchers',
    '/admin/equipos': 'Gestión de Equipos',
    '/admin/partidos': 'Partidos'
  }
  return titles[route.path] || 'Admin'
}
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  background-color: var(--color-oscuro-900);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--color-oscuro-200);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  width: 100%;
  text-decoration: none;
  position: relative;
  font-weight: 500;
}

.nav-item:hover:not(.nav-item-active) {
  color: white;
  background: linear-gradient(135deg, var(--color-oscuro-700), var(--color-oscuro-600));
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.1);
}

.nav-item-active {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.3));
  color: #22c55e;
  border-left: 3px solid #22c55e;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
  transform: translateX(3px);
}

.nav-item-active::before {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  background: #22c55e;
  border-radius: 2px 0 0 2px;
}

.nav-item i {
  width: 1.25rem;
  text-align: center;
  transition: all 0.3s ease;
}

.nav-item:hover:not(.nav-item-active) i,
.nav-item-active i {
  text-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .admin-layout aside {
    width: 280px;
  }
}

/* Custom scrollbar for navigation */
nav::-webkit-scrollbar {
  width: 4px;
}

nav::-webkit-scrollbar-track {
  background: var(--color-oscuro-800);
}

nav::-webkit-scrollbar-thumb {
  background: var(--color-oscuro-600);
  border-radius: 2px;
}

nav::-webkit-scrollbar-thumb:hover {
  background: var(--color-oscuro-500);
}
</style>