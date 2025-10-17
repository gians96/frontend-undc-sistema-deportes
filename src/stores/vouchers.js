import { defineStore } from "pinia";
import api from "../services/api";

export const useVouchersApi = defineStore("vouchersApi", {
  state: () => ({
    vouchers: [],
    allVouchers: [], // Mantiene todos los vouchers sin filtrar
    loading: false,
    error: null,
    procesando: null,
    filtroActivo: null,
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
      pendiente: state.allVouchers.filter((v) => v.estado === "pendiente")
        .length,
      validado: state.allVouchers.filter((v) => v.estado === "validado").length,
      rechazado: state.allVouchers.filter((v) => v.estado === "rechazado")
        .length,
    }),
  },

  actions: {
    async cargarTodosLosVouchers() {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get("/api/admin/vouchers");
        this.allVouchers = response.data.data;
        this.vouchers = [...response.data.data]; // Mostrar todos inicialmente
        this.filtroActivo = null;
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

        const updateVoucher = (arr) => {
          const index = arr.findIndex((v) => v.id_voucher === idVoucher);
          if (index !== -1) {
            arr[index] = { ...arr[index], ...updatedData };
          }
        };

        updateVoucher(this.vouchers);
        updateVoucher(this.allVouchers);

        return response.data;
      } catch (error) {
        this.error = error;
        console.error("Error al validar voucher:", error);
        throw error;
      } finally {
        this.procesando = null;
      }
    },

    async filtrarPorEstado(estado) {
      this.filtroActivo = estado;

      if (this.allVouchers.length > 0) {
        if (estado) {
          this.vouchers = this.allVouchers.filter((v) => v.estado === estado);
        } else {
          this.vouchers = [...this.allVouchers];
        }
      } else {
        await this.cargarTodosLosVouchers();
        if (estado) {
          this.vouchers = this.allVouchers.filter((v) => v.estado === estado);
        }
      }
    },

    async obtenerJugadores(idEquipo) {
      const targetVoucher = this.allVouchers.find(v => v.equipo_id === idEquipo);
      if (targetVoucher && targetVoucher.jugadores) {
        return; // Players already loaded
      }

      this.procesando = `jugadores-${idEquipo}`;
      this.error = null;

      try {
        const response = await api.get(`/api/admin/vouchers/${idEquipo}`);
        
        console.log('Respuesta de la API de jugadores:', response.data);

        const jugadores = response.data?.jugadores;
        console.log('Mostrando jugadores:', jugadores);

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
    },
  },
});
