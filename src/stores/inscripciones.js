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
      { tipo: "Inscripción Básquet", monto: "10.00", valor: "basket" },
    ],
  }),
});

export const useAutorizarIngreso = defineStore("inicio", {
  state: () => ({
    // UUID autorizado para acceder a las inscripciones
    uuidAutorizado: import.meta.env.VITE_UUID_AUTHORIZED,
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
    lastSubmission: null,
    estadoInscripcion: {
      abierto: false,
      estado: false,
      mensaje: "Verificando estado de las inscripciones...",
      cargando: true,
    }
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

    async verificarEstadoInscripciones() {
      this.estadoInscripcion.cargando = true;
      this.error = null;
      try {
        const { data } = await api.get('/api/inscripciones');
        this.estadoInscripcion.abierto = data.abierto;
        this.estadoInscripcion.estado = data.estado;
        this.estadoInscripcion.mensaje = data.mensaje;
        return data;
      } catch (error) {
        this.error = error;
        this.estadoInscripcion.mensaje = "Error al verificar el estado de las inscripciones.";
        this.estadoInscripcion.abierto = false;
        this.estadoInscripcion.estado = false;
        throw error;
      } finally {
        this.estadoInscripcion.cargando = false;
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
