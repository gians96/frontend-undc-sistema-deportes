<template>
  <div>
    <!-- Estado de Verificación -->
    <div v-if="verificando" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <i class="fas fa-spinner fa-spin text-4xl text-green-400 mb-4"></i>
        <p class="text-gray-300 text-lg">{{ mensajeVerificacion }}</p>
      </div>
    </div>

    <!-- Contenido del Formulario (si se concede el acceso) -->
    <div v-else-if="accesoConcedido" class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <form @submit.prevent="handleSubmit" class="py-4 sm:py-6 lg:py-8">
          <div class="flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-8">
            <div class="flex-1 xl:min-w-2xl space-y-4 sm:space-y-6 lg:space-y-8">
              <RegistrarGrupo v-model="grupoData" />
              <AgregarJugador
                v-model="jugadores"
                :limiteJugadores="limiteJugadores"
                :hayDeporteSeleccionado="hayDeporteSeleccionado"
              />
            </div>
            <div class="w-full xl:w-96 xl:sticky xl:top-8 xl:self-start xl:h-fit">
              <RegistrarPago
                v-model="form"
                :tipoPago="grupoData.tipoPago"
                :comprobante="comprobante"
                @update:comprobante="comprobante = $event"
                :isSubmitting="isSubmitting"
                :formularioCompleto="formularioCompleto"
                @submit="handleSubmit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Modales -->
    <Modal
      :mostrar="modalMostrar"
      :tipo="modalTipo"
      :titulo="modalTitulo"
      :mensaje="modalMensaje"
      :textoConfirmar="modalTextoConfirmar"
      :textoCancelar="modalTextoCancelar"
      :mostrarCancelar="modalMostrarCancelar"
      :camposFaltantes="modalCamposFaltantes"
      @confirmar="manejarConfirmacion"
      @cancelar="cerrarModal"
      @cerrar="cerrarModal"
    />
    <ModalConfirmacion
      :mostrar="modalConfirmacionMostrar"
      titulo="¡Inscripción Exitosa!"
      :mensaje="`Su inscripción ha sido procesada correctamente.<br>
                <strong>Equipo:</strong> ${datosGuardados.nombreGrupo}<br>
                <strong>Deporte:</strong> ${datosGuardados.deporte}<br>
                <strong>Jugadores:</strong> ${datosGuardados.cantidadJugadores}<br>`"
      textoConfirmar="Entendido"
      @confirmar="cerrarModalConfirmacion"
      @cerrar="cerrarModalConfirmacion"
    />
    <ModalRegistro
      :mostrar="mostrarModalRegistro"
      @cerrar="cerrarModalRegistro"
      @acceso-concedido="manejarAccesoConcedido"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import InscripcionesLayout from "../layouts/InscripcionesLayout.vue";
import RegistrarGrupo from "../components/Inscripciones/RegistrarGrupo.vue";
import AgregarJugador from "../components/Inscripciones/AgregarJugador.vue";
import RegistrarPago from "../components/Inscripciones/RegistrarPago.vue";
import Modal from "../components/Inscripciones/Modal.vue";
import ModalConfirmacion from "../components/Inscripciones/ModalConfirmacion.vue";
import ModalRegistro from "../components/Inscripciones/ModalRegistro.vue";
import {
  useOpcionesPago,
  useAutorizarIngreso,
  useInscripcionesApi,
} from "../stores/inscripciones.js";
import { useOpcionesDeporte } from "../stores/deporte.js";
import { useInscripcionesEquipo } from "../composables/inscripciones-equipo.js";

defineOptions({
  layout: InscripcionesLayout,
});

const router = useRouter();
const storeAuth = useAutorizarIngreso();
const storeInscripciones = useInscripcionesApi();
const storePago = useOpcionesPago();
const storeDeporte = useOpcionesDeporte();

// --- Lógica de Verificación ---
const verificando = ref(true);
const mensajeVerificacion = ref("Verificando acceso...");
const accesoConcedido = ref(false);
const mostrarModalRegistro = ref(false);

const iniciarProcesoDeVerificacion = async () => {
  verificando.value = true;

  // 1. Verificar UUID
  mensajeVerificacion.value = "Verificando autorización...";
  if (!storeAuth.puedeAcceder) {
    mostrarModalRegistro.value = true;
    verificando.value = false;
    return;
  }

  // 2. Verificar Estado de Inscripción (API)
  mensajeVerificacion.value = "Verificando estado de las inscripciones...";
  try {
    await storeInscripciones.verificarEstadoInscripciones();
    const estado = storeInscripciones.estadoInscripcion;

    if (estado.abierto && estado.estado) {
      accesoConcedido.value = true;
    } else {
      router.push('/formulario');
    }
  } catch (error) {
    console.error("Error al verificar el estado de la inscripción:", error);
    router.push('/formulario');
  } finally {
    verificando.value = false;
  }
};

const manejarAccesoConcedido = () => {
  mostrarModalRegistro.value = false;
  iniciarProcesoDeVerificacion();
};

const cerrarModalRegistro = () => {
  mostrarModalRegistro.value = false;
  if (!storeAuth.puedeAcceder) {
    router.push("/");
  }
};

onMounted(() => {
  iniciarProcesoDeVerificacion();
});

// --- Lógica del Formulario ---
const grupoData = ref({
  ciclo: "",
  email: "",
  celular: "",
  nombreGrupo: "",
  deporte: "",
  tipoPago: "regular",
  seccion: "",
});

const form = ref({
  titularCuenta: "",
  numeroOperacion: "",
});

const jugadores = ref([]);
const comprobante = ref(null);
const isSubmitting = ref(false);

const { limiteJugadores } = useInscripcionesEquipo(grupoData, () => {});
const hayDeporteSeleccionado = computed(() => grupoData.value.deporte !== "" && grupoData.value.deporte !== null);

const nombreDeporte = computed(() => {
  const deporte = storeDeporte.deportes.find((d) => d.valor === parseInt(grupoData.value.deporte));
  return deporte ? deporte.etiqueta : "";
});

const montoActual = computed(() => {
  const opcionPago = storePago.pago.find((p) => p.valor === grupoData.value.tipoPago);
  return opcionPago ? opcionPago.monto : "30.00";
});

const formularioCompleto = computed(() => {
  const grupoCompleto = grupoData.value.ciclo && grupoData.value.email && grupoData.value.celular && grupoData.value.nombreGrupo && grupoData.value.deporte && grupoData.value.tipoPago && (grupoData.value.tipoPago === "adicional" || grupoData.value.seccion);
  const hayJugadores = jugadores.value.length > 0;
  const todosJugadoresCompletos = jugadores.value.every((j) => j.nombre && j.apellido && j.dni && j.codigo && j.rol && j.sexo);
  const pagoCompleto = form.value.titularCuenta && form.value.numeroOperacion;
  const hayComprobante = comprobante.value !== null;
  return !!(grupoCompleto && hayJugadores && todosJugadoresCompletos && pagoCompleto && hayComprobante);
});

// Lógica de Modales
const modalMostrar = ref(false);
const modalTipo = ref("confirmacion");
const modalTitulo = ref("");
const modalMensaje = ref("");
const modalTextoConfirmar = ref("Confirmar");
const modalTextoCancelar = ref("Cancelar");
const modalMostrarCancelar = ref(true);
const modalCamposFaltantes = ref([]);
const modalConfirmacionMostrar = ref(false);
const datosGuardados = ref({ nombreGrupo: "", deporte: "", email: "", cantidadJugadores: 0 });

const mostrarModal = (config) => {
  Object.assign(modalState, config);
  modalMostrar.value = true;
};

const cerrarModal = () => { modalMostrar.value = false; };
const cerrarModalConfirmacion = () => { modalConfirmacionMostrar.value = false; };

const manejarConfirmacion = () => {
  if (modalTipo.value === "confirmacion") {
    confirmarEnvio();
  } else {
    cerrarModal();
  }
};

const handleSubmit = async () => {
  if (!formularioCompleto.value) {
    // Lógica para mostrar campos incompletos
    return;
  }
  mostrarModal({ tipo: "confirmacion", titulo: "Confirmar Inscripción", /*...*/ });
};

const confirmarEnvio = async () => {
  cerrarModal();
  isSubmitting.value = true;
  try {
    const jugadoresProcesados = jugadores.value.map(j => ({ ...j, nombre: `${j.nombre} ${j.apellido}`.trim(), sexo: j.sexo === 'masculino' ? 'M' : 'F' }));
    jugadoresProcesados.forEach(j => delete j.apellido);

    const datosAPI = { ...grupoData.value, ...form.value, jugadores: jugadoresProcesados, cantidadParticipantes: jugadores.value.length };
    const resultado = await storeInscripciones.crearInscripcion(datosAPI, comprobante.value);

    datosGuardados.value = { nombreGrupo: grupoData.value.nombreGrupo, deporte: nombreDeporte.value, email: grupoData.value.email, cantidadJugadores: jugadores.value.length };
    
    // Resetear formulario
    Object.keys(grupoData.value).forEach(key => grupoData.value[key] = key === 'tipoPago' ? 'regular' : '');
    Object.keys(form.value).forEach(key => form.value[key] = '');
    jugadores.value = [];
    comprobante.value = null;

    modalConfirmacionMostrar.value = true;
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    mostrarModal({ tipo: "error", titulo: "Error en el Envío", mensaje: error.response?.data?.mensaje || "Ocurrió un error.", mostrarCancelar: false });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
