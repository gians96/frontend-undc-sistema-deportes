import { ref, computed, onMounted } from 'vue'
import { useVouchersApi } from '../stores/vouchers'

export function useAdminVouchers() {
  const vouchersStore = useVouchersApi()

  // Estados del modal
  const modalMostrar = ref(false)
  const voucherSeleccionado = ref(null)

  // Computed properties reactivos
  const vouchers = computed(() => vouchersStore.vouchers)
  const loading = computed(() => vouchersStore.loading)
  const error = computed(() => vouchersStore.error)
  const procesando = computed(() => vouchersStore.procesando)
  const filtroActivo = computed(() => vouchersStore.filtroActivo)
  const estadisticas = computed(() => vouchersStore.estadisticas)

  // Funciones de filtrado
  const filtrarPorEstado = (estado) => {
    vouchersStore.aplicarFiltros({ estado })
  }

  const filtrarPorCicloSeccion = (filtros) => {
    vouchersStore.aplicarFiltros(filtros)
  }

  // Funciones del modal
  const verImagen = (voucher) => {
    voucherSeleccionado.value = voucher
    modalMostrar.value = true
  }

  const cerrarModal = () => {
    modalMostrar.value = false
    voucherSeleccionado.value = null
  }

  // Funciones de validacion
  const validarVoucher = async (idVoucher, estado) => {
    try {
      // La lógica de re-filtrado ahora está en la acción del store
      await vouchersStore.validarVoucher(idVoucher, estado)
      cerrarModal()
    } catch (error) {
      console.error('Error al actualizar voucher:', error)
    }
  }

  // Funciones de utilidad
  const getEstadoClasses = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800'
      case 'validado':
        return 'bg-green-100 text-green-800'
      case 'rechazado':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEstadoTexto = (estado) => {
    switch (estado) {
      case 'pendiente':
        return 'Pendiente'
      case 'validado':
        return 'Validado'
      case 'rechazado':
        return 'Rechazado'
      default:
        return estado
    }
  }

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  // Inicializacion
  const inicializar = async () => {
    await vouchersStore.cargarTodosLosVouchers()
  }

  // Auto-inicializar al montar
  onMounted(() => {
    inicializar()
  })

  return {
    // Estado reactivo
    vouchers,
    loading,
    error,
    procesando,
    filtroActivo,
    estadisticas,

    // Estado del modal
    modalMostrar,
    voucherSeleccionado,

    // Funciones principales
    filtrarPorEstado,
    filtrarPorCicloSeccion, // Exportar nueva función
    validarVoucher,
    verImagen,
    cerrarModal,
    inicializar,

    // Funciones de utilidad
    getEstadoClasses,
    getEstadoTexto,
    formatearFecha
  }
}