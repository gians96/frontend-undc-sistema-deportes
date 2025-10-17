<template>
  <div class="admin-layout bg-black">
    <!-- Sidebar para Desktop -->
    <Sidebar 
      :menu-items="menuItems"
      @go-to-home="goToHome"
      @cerrar-sesion="handleCerrarSesion"
    />

    <!-- Contenido Principal -->
    <div class="lg:ml-64 min-h-screen pb-16 lg:pb-0">
      <Navbar :title="pageTitle" />
      <main class="p-4 sm:p-6 lg:p-8">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>

    <!-- Navegación Móvil -->
    <BottomBar 
      :bottomNavItems="menuItems" 
      @open-sheet="isSheetOpen = true"
    />
    <SheetNavegacion 
      v-model="isSheetOpen" 
      :menuItems="menuItems"
      :configMenuItem="configMenuItem"
      @menu-action="handleMenuAction"
    />
  </div>
</template>

<script setup>
import { ref, shallowRef, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// Importar componentes de layout y de íconos
import Sidebar from '@/components/Admin/Layout/Sidebar.vue';
import Navbar from '@/components/Admin/Layout/Navbar.vue';
import BottomBar from '@/components/Admin/Layout/BottomBar.vue';
import SheetNavegacion from '@/components/Admin/Layout/SheetNavegacion.vue';
import DashboardIcono from '@/components/icons/DashboardIcono.vue';
import VoucherIcono from '@/components/icons/VoucherIcono.vue';
import EquiposIcono from '@/components/icons/EquiposIcono.vue';
import PartidosIcono from '@/components/icons/PartidosIcono.vue';
import LogoutIcono from '@/components/icons/LogoutIcono.vue';
import InicioIcono from '@/components/icons/InicioIcono.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const isSheetOpen = ref(false);

// Definir items del menú
const menuItems = shallowRef([
  { path: '/admin/dashboard', label: 'Dashboard', icon: InicioIcono },
  { path: '/admin/voucher', label: 'Vouchers', icon: VoucherIcono },
  { path: '/admin/equipos', label: 'Equipos', icon: EquiposIcono },
  { path: '/admin/partidos', label: 'Partidos', icon: PartidosIcono },
]);

const configMenuItem = shallowRef({
  label: 'Cerrar Sesión',
  icon: LogoutIcono,
  action: 'logout',
});

const pageTitle = computed(() => {
  const currentPath = route.path;
  const menuItem = menuItems.value.find(item => currentPath.startsWith(item.path));
  return menuItem ? menuItem.label : 'Admin';
});

const goToHome = () => {
  router.push('/');
};

const handleCerrarSesion = async () => {
  try {
    await authStore.cerrarSesion();
    router.push('/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

const handleMenuAction = (action) => {
  if (action === 'logout') {
    handleCerrarSesion();
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>