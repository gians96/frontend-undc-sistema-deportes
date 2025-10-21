import { defineStore } from "pinia";
import api from "../services/api";

export const useVouchersApi = defineStore("vouchersApi", {
  state: () => ({
    vouchers: [],
    allVouchers: [],
    loading: false,
    error: null,
    procesando: null,
    filtroActivo: null,
    cicloSeleccionado: null,
    seccionSeleccionada: null,
    pendingCount: 0, // Nuevo estado para el contador
  }),

  getters: {
    vouchersPendientes: (state) =>
      state.allVouchers.filter((v) => v.estado === "pendiente"),
    vouchersValidados: (state) =>
      state.allVouchers.filter((v) => v.estado === "validado"),
    vouchersRechazados: (state) =>
      state.allVouchers.filter((v) => v.estado === "rechazado"),
    estadisticas: (state) => ({
      total: state.allVouchers.length,
      pendiente: state.allVouchers.filter((v) => v.estado === "pendiente").length,
      validado: state.allVouchers.filter((v) => v.estado === "validado").length,
      rechazado: state.allVouchers.filter((v) => v.estado === "rechazado").length,
    }),
  },

  actions: {
    async fetchPendingCount() {
      try {
        const response = await api.get("/api/admin/vouchers?estado=pendiente");
        this.pendingCount = response.data.total || 0;
      } catch (error) {
        console.error("Error al obtener el contador de vouchers pendientes:", error);
        this.pendingCount = 0;
      }
    },

    async cargarTodosLosVouchers() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get("/api/admin/vouchers");
        this.allVouchers = response.data.data;
        this.aplicarFiltros({});
      } catch (error) {
        this.error = error;
        console.error("Error al cargar vouchers:", error);
      } finally {
        this.loading = false;
      }
    },

    async validarVoucher(idVoucher, estado) {
      this.procesando = idVoucher;
      this.error = null;
      try {
        const response = await api.patch(
          `/api/admin/vouchers/${idVoucher}/validar`,
          { estado }
        );
        const updatedData = response.data.voucher;
        const index = this.allVouchers.findIndex((v) => v.id_voucher === idVoucher);
        if (index !== -1) {
          this.allVouchers[index] = { ...this.allVouchers[index], ...updatedData };
        }
        this.aplicarFiltros({});
        this.fetchPendingCount(); // Actualizar contador después de validar
        return response.data;
      } catch (error) {
        this.error = error;
        console.error("Error al validar voucher:", error);
        throw error;
      } finally {
        this.procesando = null;
      }
    },

    aplicarFiltros({ estado, ciclo, seccion }) {
      if (estado !== undefined) this.filtroActivo = estado;
      if (ciclo !== undefined) this.cicloSeleccionado = ciclo;
      if (seccion !== undefined) this.seccionSeleccionada = seccion;

      let vouchersFiltrados = [...this.allVouchers];

      if (this.filtroActivo) {
        vouchersFiltrados = vouchersFiltrados.filter(v => v.estado === this.filtroActivo);
      }

      if (this.cicloSeleccionado) {
        const cicloRomano = toRoman(this.cicloSeleccionado);
        vouchersFiltrados = vouchersFiltrados.filter(v => v.ciclo === cicloRomano);
      }

      if (this.seccionSeleccionada) {
        vouchersFiltrados = vouchersFiltrados.filter(v => v.seccion === this.seccionSeleccionada);
      }

      this.vouchers = vouchersFiltrados;
    },

    async obtenerJugadores(idEquipo) {
      const targetVoucher = this.allVouchers.find(v => v.equipo_id === idEquipo);
      if (targetVoucher && targetVoucher.jugadores) return;
      this.procesando = `jugadores-${idEquipo}`;
      this.error = null;
      try {
        const response = await api.get(`/api/admin/vouchers/${idEquipo}`);
        const jugadores = response.data?.jugadores;
        const updateVoucherInArray = (arr) => {
          const index = arr.findIndex((v) => v.equipo_id === idEquipo);
          if (index !== -1) {
            arr[index] = { ...arr[index], jugadores: jugadores || [] };
          }
        };
        updateVoucherInArray(this.allVouchers);
        updateVoucherInArray(this.vouchers);
      } catch (error) {
        this.error = error;
        console.error(`Error al cargar jugadores para el equipo ${idEquipo}:`, error);
        const updateVoucherInArray = (arr) => {
          const index = arr.findIndex((v) => v.equipo_id === idEquipo);
          if (index !== -1) {
            arr[index] = { ...arr[index], jugadores: [] };
          }
        };
        updateVoucherInArray(this.allVouchers);
        updateVoucherInArray(this.vouchers);
      } finally {
        if (this.procesando === `jugadores-${idEquipo}`) {
          this.procesando = null;
        }
      }
    },

    clearError() {
      this.error = null;
    },

    resetStore() {
      this.vouchers = [];
      this.allVouchers = [];
      this.error = null;
      this.filtroActivo = null;
      this.procesando = null;
      this.cicloSeleccionado = null;
      this.seccionSeleccionada = null;
      this.pendingCount = 0;
    },
  },
});

// Helper para convertir a números romanos (si se usa en este archivo)
const toRoman = (num) => {
  if (!num) return '';
  const map = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let result = '';
  for (let key in map) {
    while (num >= map[key]) {
      result += key;
      num -= map[key];
    }
  }
  return result;
};
