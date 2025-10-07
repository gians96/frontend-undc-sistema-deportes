// src/stores/inscripciones.js
import { defineStore } from "pinia";
import api from '../services/api';

export const useDatosYape = defineStore("yape", {
  state: () => ({
    // Datos para el pago del Yape:
    yape: [
      { etiqueta: "Nombre", valor: "Fernando C. Yovera Z." },
      { etiqueta: "DNI", valor: "62962727" },
      { etiqueta: "Celular", valor: "+51 940 466 753", isPhone: true },
    ],
  }),
});

export const useOpcionesPago = defineStore("pago", {
  state: () => ({
    pago: [
      { tipo: "Inscripción Regular", monto: "80.00", valor: "regular" },
      { tipo: "Inscripción Adicional", monto: "15.00", valor: "adicional" },
    ],
  }),
});

export const useAutorizarIngreso = defineStore("inicio", {
  state: () => ({
    // UUID autorizado para acceder a las inscripciones
    uuidAutorizado: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    // Estado de autorización del usuario actual
    usuarioAutorizado: false,
    // UUID ingresado por el usuario
    uuidIngresado: "",
  }),

  getters: {
    // Verificar si el UUID ingresado es válido
    esUuidValido: (state) => {
      return state.uuidIngresado === state.uuidAutorizado;
    },

    // Verificar si el usuario puede acceder
    puedeAcceder: (state) => {
      return state.usuarioAutorizado && state.esUuidValido;
    }
  },

  actions: {
    // Verificar el UUID ingresado
    verificarUuid(uuid) {
      this.uuidIngresado = uuid;
      this.usuarioAutorizado = this.esUuidValido;
      return this.usuarioAutorizado;
    },

    // Revocar acceso
    revocarAcceso() {
      this.usuarioAutorizado = false;
      this.uuidIngresado = "";
    },

    // Limpiar UUID ingresado
    limpiarUuid() {
      this.uuidIngresado = "";
    }
  }
});

export const useInscripcionesApi = defineStore("inscripcionesApi", {
  state: () => ({
    loading: false,
    error: null,
    lastSubmission: null
  }),

  actions: {
    async crearInscripcion(datosInscripcion, comprobante) {
      this.loading = true;
      this.error = null;

      try {
        const formData = new FormData();

        Object.keys(datosInscripcion).forEach(key => {
          if (key === 'jugadores') {
            formData.append(key, JSON.stringify(datosInscripcion[key]));
          } else {
            formData.append(key, datosInscripcion[key]);
          }
        });

        if (comprobante) {
          formData.append('comprobante', comprobante.file);
        }

        const response = await api.post('/api/inscripciones', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        this.lastSubmission = response.data;
        return response.data;
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    clearError() {
      this.error = null;
    },

    clearLastSubmission() {
      this.lastSubmission = null;
    }
  }
});
