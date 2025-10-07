<template>
  <div class="vouchers">
    <div class="bg-oscuro-800 rounded-xl shadow-lg border border-oscuro-600 p-8 mb-8 hidden lg:block">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
          <i class="fas fa-receipt text-white text-xl"></i>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">
            Gestión de <span class="text-green-400 glow-text">Vouchers</span>
          </h1>
          <p class="text-oscuro-200">Administra los comprobantes de pago</p>
        </div>
      </div>
    </div>

    <!-- Cards de estadísticas -->
    <CardEstados :estadisticas="estadisticas" :filtroActivo="filtroActivo" @filtrar="filtrarPorEstado" />


    <!-- Botón para mostrar todos -->
    <div class="mb-6 flex justify-between items-center">
      <button
        v-if="filtroActivo"
        @click="filtrarPorEstado(null)"
        class="px-6 py-3 bg-gradient-to-r from-oscuro-600 to-oscuro-700 hover:from-oscuro-700 hover:to-oscuro-800 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 border border-oscuro-500 hover:border-green-500/50"
      >
        <i class="fas fa-arrow-left"></i>
        Mostrar Todos
      </button>
      <div v-else class="text-sm text-oscuro-300 bg-oscuro-800 px-4 py-2 rounded-lg border border-oscuro-600">
        <i class="fas fa-info-circle text-green-400 mr-2"></i>
        Haz clic en las tarjetas de arriba para filtrar por estado
      </div>
    </div>

    <!-- Cards de vouchers -->
    <div v-if="loading" class="text-center py-8">
      <i class="fas fa-spinner fa-spin text-2xl text-green-400"></i>
      <p class="mt-2 text-oscuro-200">Cargando vouchers...</p>
    </div>

    <div v-else-if="vouchers.length === 0" class="bg-oscuro-800 rounded-xl shadow-lg border border-oscuro-600 p-8 text-center">
      <i class="fas fa-receipt text-4xl text-oscuro-400 mb-4"></i>
      <h3 class="text-lg font-medium text-white mb-2">No hay vouchers</h3>
      <p class="text-oscuro-200">No se encontraron vouchers con el filtro seleccionado.</p>
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
  </div>
</template>

<script setup>
import AdminLayout from '../../layouts/AdminLayout.vue'
import CardEstados from '../../components/Admin/Voucher/Cards/Estados.vue'
import VoucherCard from '../../components/Admin/Voucher/Cards/Voucher.vue'
import ModalImagen from '../../components/Admin/Voucher/ModalImagen.vue'
import { useAdminVouchers } from '../../composables/admin-vouchers'

defineOptions({
  layout: AdminLayout
})

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
  cerrarModal
} = useAdminVouchers()
</script>

<style scoped>
.vouchers {
  max-width: 7xl;
}
</style>