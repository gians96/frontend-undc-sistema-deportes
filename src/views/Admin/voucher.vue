<template>
  <div class="vouchers">
    <div class="bg-oscuro-850 rounded-xl shadow-lg px-6 py-4 mb-4 hidden lg:block">
      <div class="flex items-center gap-4">
        <div
          class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center"
        >
          <i class="fas fa-receipt text-white text-xl"></i>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-white">
            Gestión de <span class="text-green-400 glow-text">Vouchers</span>
          </h1>
          <p class="text-oscuro-200">Administra los comprobantes de pago</p>
        </div>
      </div>
    </div>

    <!-- Cards de estadísticas -->
    <CardEstados
      :estadisticas="estadisticas"
      :filtroActivo="filtroActivo"
      @filtrar="filtrarPorEstado"
    />

    <!-- Cards de vouchers -->
    <div v-if="loading" class="text-center py-8">
      <i class="fas fa-spinner fa-spin text-2xl text-green-400"></i>
      <p class="mt-2 text-oscuro-200">Cargando vouchers...</p>
    </div>

    <div
      v-else-if="vouchers.length === 0"
      class="flex flex-col items-center justify-center bg-oscuro-850 rounded-3xl shadow-xl p-6 sm:p-10 text-center transition-all duration-300"
    >
      <!-- Contenedor del ícono -->
      <div
        class="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-oscuro-700 shadow-inner mb-6"
      >
        <i class="fas fa-receipt text-4xl sm:text-5xl text-oscuro-300"></i>
      </div>

      <!-- Texto -->
      <h3 class="text-xl sm:text-2xl font-semibold text-white mb-2">
        No hay vouchers
      </h3>
      <p class="text-oscuro-300 text-sm sm:text-base max-w-sm">
        No se encontraron vouchers con el filtro seleccionado.
      </p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <VoucherCard
        v-for="voucher in vouchers"
        :key="voucher.id_voucher"
        :voucher="voucher"
        @ver-imagen="verImagen"
        @validar="validarVoucher"
      />
    </div>

    <!-- Modal para ver imagen del voucher -->
    <ModalImagen
      :mostrar="modalMostrar"
      :voucher="voucherSeleccionado"
      :procesando="procesando"
      @cerrar="cerrarModal"
      @validar="validarVoucher"
    />

    <!-- Sheet para ver imagen en móvil -->
    <SheetImagen
      :mostrar="modalMostrar"
      :voucher="voucherSeleccionado"
      :procesando="procesando"
      @cerrar="cerrarModal"
      @validar="validarVoucher"
    />
  </div>
</template>

<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import CardEstados from "@/components/Admin/Voucher/Cards/Estados.vue";
import VoucherCard from "@/components/Admin/Voucher/Cards/Voucher.vue";
import ModalImagen from "@/components/Admin/Voucher/ModalImagen.vue";
import SheetImagen from "@/components/Admin/Voucher/SheetImagen.vue";
import { useAdminVouchers } from "@/composables/admin-vouchers";

// Usar el composable que maneja toda la lógica
const {
  // Estado reactivo
  vouchers,
  loading,
  estadisticas,
  filtroActivo,
  procesando,

  // Estado del modal
  modalMostrar,
  voucherSeleccionado,

  // Funciones principales
  filtrarPorEstado,
  validarVoucher,
  verImagen,
  cerrarModal,
} = useAdminVouchers();
</script>

<style scoped>
.vouchers {
  max-width: 7xl;
}
</style>