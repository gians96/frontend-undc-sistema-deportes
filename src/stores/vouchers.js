import { defineStore } from "pinia";
import api from '../services/api';

export const useVouchersApi = defineStore("vouchersApi", {
  state: () => ({
    vouchers: [],
    allVouchers: [], // Mantiene todos los vouchers sin filtrar
    loading: false,
    error: null,
    procesando: null,
    filtroActivo: null
  }),

  getters: {
    vouchersPendientes: (state) => state.allVouchers.filter(v => v.estado === 'pendiente'),
    vouchersValidados: (state) => state.allVouchers.filter(v => v.estado === 'validado'),
    vouchersRechazados: (state) => state.allVouchers.filter(v => v.estado === 'rechazado'),

    estadisticas: (state) => ({
      total: state.allVouchers.length,
      pendientes: state.allVouchers.filter(v => v.estado === 'pendiente').length,
      validados: state.allVouchers.filter(v => v.estado === 'validado').length,
      rechazados: state.allVouchers.filter(v => v.estado === 'rechazado').length
    })
  },

  actions: {
    async cargarTodosLosVouchers() {
      this.loading = true;
      this.error = null;

      try {
        const response = await api.get("/api/admin/vouchers");
        this.allVouchers = response.data;
        this.vouchers = [...response.data]; // Mostrar todos inicialmente
        this.filtroActivo = null;
      } catch (error) {
        this.error = error;
        console.error('Error al cargar vouchers:', error);
      } finally {
        this.loading = false;
      }
    },

    async cargarVouchers(estado = null) {
      // Si es la primera carga, cargar todos
      if (this.allVouchers.length === 0) {
        return await this.cargarTodosLosVouchers();
      }

      // Si ya tenemos los datos, solo filtrar
      this.filtroActivo = estado;
      if (estado) {
        this.vouchers = this.allVouchers.filter(v => v.estado === estado);
      } else {
        this.vouchers = [...this.allVouchers];
      }
    },

    async validarVoucher(idVoucher, estado) {
      this.procesando = idVoucher;
      this.error = null;

      try {
        const response = await api.patch(`/api/admin/vouchers/${idVoucher}/validar`, { estado });

        // Actualizar el voucher en ambos arrays
        const updateVoucher = (arr) => {
          const index = arr.findIndex(v => v.id_voucher === idVoucher);
          if (index !== -1) {
            arr[index] = { ...arr[index], estado };
          }
        };

        updateVoucher(this.vouchers);
        updateVoucher(this.allVouchers);

        return response.data;
      } catch (error) {
        this.error = error;
        console.error('Error al validar voucher:', error);
        throw error;
      } finally {
        this.procesando = null;
      }
    },

    async filtrarPorEstado(estado) {
      this.filtroActivo = estado;

      // Filtrar localmente si ya tenemos los datos
      if (this.allVouchers.length > 0) {
        if (estado) {
          this.vouchers = this.allVouchers.filter(v => v.estado === estado);
        } else {
          this.vouchers = [...this.allVouchers];
        }
      } else {
        // Si no tenemos datos, cargar desde API
        await this.cargarVouchers(estado);
      }
    },

    clearError() {
      this.error = null;
    },

    clearProcesando() {
      this.procesando = null;
    }
  }
});