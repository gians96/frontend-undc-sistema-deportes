<template>
  <div>
    <!-- Contenido principal del formulario (solo visible si tiene acceso) -->
    <div v-if="accesoAutorizado" class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <form @submit.prevent="handleSubmit" class="py-4 sm:py-6 lg:py-8">
          <!-- Layout flexible de 2 columnas -->
          <div class="flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-8">
            <!-- Columna Izquierda: Información del Grupo -->
            <div class="flex-1 xl:min-w-2xl space-y-4 sm:space-y-6 lg:space-y-8">
              <!-- Información del Grupo -->
              <RegistrarGrupo v-model="grupoData" />

              <!-- Registro de Jugadores -->
              <AgregarJugador v-model="jugadores" />
            </div>

            <!-- Columna Derecha: Información de Pago -->
            <div
              class="w-full xl:w-96 xl:sticky xl:top-8 xl:self-start xl:h-fit"
            >
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

    <!-- Mensaje de carga mientras se verifica el acceso -->
    <div v-else-if="!mostrarModalRegistro" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <i class="fas fa-spinner fa-spin text-4xl text-green-400 mb-4"></i>
        <p class="text-gray-300 text-lg">Verificando acceso...</p>
      </div>
    </div>

    <!-- Modal de confirmación/advertencia/éxito -->
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

    <!-- Modal de éxito simple -->
    <ModalConfirmacion
      :mostrar="modalConfirmacionMostrar"
      titulo="¡Inscripción Exitosa!"
      :mensaje="`Su inscripción ha sido procesada correctamente.<br><br>
                <strong>Equipo:</strong> ${datosGuardados.nombreGrupo}<br>
                <strong>Deporte:</strong> ${datosGuardados.deporte}<br>
                <strong>Jugadores:</strong> ${datosGuardados.cantidadJugadores}<br>`"
      textoConfirmar="Entendido"
      @confirmar="cerrarModalConfirmacion"
      @cerrar="cerrarModalConfirmacion"
    />

    <!-- Modal de registro/acceso UUID -->
    <ModalRegistro
      :mostrar="mostrarModalRegistro"
      @cerrar="cerrarModalRegistro"
      @acceso-concedido="manejarAccesoConcedido"
    />
  </div>
</template>

<style scoped>
/* Scrollbar personalizado */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #22c55e #374151;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #22c55e;
  border-radius: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #16a34a;
}
</style>

<script setup>
import { ref, computed, onMounted } from "vue";
import InscripcionesLayout from "../layouts/InscripcionesLayout.vue";
import RegistrarGrupo from "../components/Inscripciones/RegistrarGrupo.vue";
import AgregarJugador from "../components/Inscripciones/AgregarJugador.vue";
import RegistrarPago from "../components/Inscripciones/RegistrarPago.vue";
import Modal from "../components/Inscripciones/Modal.vue";
import ModalConfirmacion from "../components/Inscripciones/ModalConfirmacion.vue";
import ModalRegistro from "../components/Inscripciones/ModalRegistro.vue";
import { useOpcionesPago, useAutorizarIngreso, useInscripcionesApi } from "../stores/inscripciones.js";
import { useOpcionesDeporte } from "../stores/deporte.js";
import { useRouter } from 'vue-router';

defineOptions({
  layout: InscripcionesLayout,
});

const router = useRouter()

// Stores
const storePago = useOpcionesPago();
const storeDeporte = useOpcionesDeporte();
const storeAuth = useAutorizarIngreso();
const storeInscripciones = useInscripcionesApi();

// Control de acceso
const mostrarModalRegistro = ref(false);
const accesoAutorizado = ref(false);

// Computed properties para obtener nombres legibles
const nombreDeporte = computed(() => {
  const deporte = storeDeporte.deportes.find(d => d.valor === parseInt(grupoData.value.deporte));
  return deporte ? deporte.etiqueta : '';
});

const montoActual = computed(() => {
  const opcionPago = storePago.pago.find(p => p.valor === grupoData.value.tipoPago);
  return opcionPago ? opcionPago.monto : '30.00';
});

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

// Computed property segura para validar formulario completo
const formularioCompleto = computed(() => {
  try {
    // Validar datos del grupo
    const grupoCompleto =
      grupoData.value?.ciclo &&
      grupoData.value?.email &&
      grupoData.value?.celular &&
      grupoData.value?.nombreGrupo &&
      grupoData.value?.deporte &&
      grupoData.value?.tipoPago &&
      (grupoData.value?.tipoPago === 'adicional' || grupoData.value?.seccion);

    // Validar que haya al menos un jugador
    const hayJugadores = jugadores.value?.length > 0;

    // Validar que todos los jugadores estén completos
    const todosJugadoresCompletos = jugadores.value?.every((jugador) => {
      return (
        jugador?.nombre &&
        jugador?.apellido &&
        jugador?.dni &&
        jugador?.codigo &&
        jugador?.rol &&
        jugador?.sexo
      );
    });

    // Validar datos de pago
    const pagoCompleto =
      form.value?.titularCuenta && form.value?.numeroOperacion;

    // Validar que haya comprobante
    const hayComprobante = comprobante.value !== null;

    return !!(
      grupoCompleto &&
      hayJugadores &&
      todosJugadoresCompletos &&
      pagoCompleto &&
      hayComprobante
    );
  } catch (error) {
    console.warn("Error en validación de formulario:", error);
    return false;
  }
});

// Función auxiliar para validación manual (usada en modales)
const validarFormularioCompleto = () => {
  return formularioCompleto.value;
};

const isSubmitting = ref(false);
const comprobante = ref(null);

// Estados del modal
const modalMostrar = ref(false);
const modalTipo = ref("confirmacion");
const modalTitulo = ref("");
const modalMensaje = ref("");
const modalTextoConfirmar = ref("Confirmar");
const modalTextoCancelar = ref("Cancelar");
const modalMostrarCancelar = ref(true);
const modalCamposFaltantes = ref([]);

// Estado del modal de confirmación específico
const modalConfirmacionMostrar = ref(false);

// Datos guardados para el modal de éxito
const datosGuardados = ref({
  nombreGrupo: "",
  deporte: "",
  email: "",
  cantidadJugadores: 0,
});


// Funciones del modal
const mostrarModal = (configuracion) => {
  modalTipo.value = configuracion.tipo || "confirmacion";
  modalTitulo.value = configuracion.titulo || "";
  modalMensaje.value = configuracion.mensaje || "";
  modalTextoConfirmar.value = configuracion.textoConfirmar || "Confirmar";
  modalTextoCancelar.value = configuracion.textoCancelar || "Cancelar";
  modalMostrarCancelar.value = configuracion.mostrarCancelar !== false;
  modalCamposFaltantes.value = configuracion.camposFaltantes || [];
  modalMostrar.value = true;
};

const cerrarModal = () => {
  modalMostrar.value = false;
};


const mostrarModalCamposIncompletos = () => {
  const camposFaltantes = [];

  // Verificar campos del grupo
  if (!grupoData.value.ciclo) camposFaltantes.push("Ciclo Académico");
  if (!grupoData.value.email) camposFaltantes.push("Correo Electrónico");
  if (!grupoData.value.celular) camposFaltantes.push("Celular");
  if (!grupoData.value.nombreGrupo) camposFaltantes.push("Nombre del Grupo");
  if (!grupoData.value.deporte) camposFaltantes.push("Deporte");
  if (!grupoData.value.tipoPago) camposFaltantes.push("Tipo de Inscripción");
  if (grupoData.value.tipoPago !== 'adicional' && !grupoData.value.seccion) {
    camposFaltantes.push("Sección");
  }

  // Verificar jugadores
  if (jugadores.value.length === 0) {
    camposFaltantes.push("Al menos un jugador");
  } else {
    jugadores.value.forEach((jugador, index) => {
      if (!jugador.nombre)
        camposFaltantes.push(`Nombre del jugador ${index + 1}`);
      if (!jugador.apellido)
        camposFaltantes.push(`Apellido del jugador ${index + 1}`);
      if (!jugador.dni) camposFaltantes.push(`DNI del jugador ${index + 1}`);
      if (!jugador.codigo)
        camposFaltantes.push(`Código del jugador ${index + 1}`);
      if (!jugador.rol) camposFaltantes.push(`Rol del jugador ${index + 1}`);
      if (!jugador.sexo) camposFaltantes.push(`Sexo del jugador ${index + 1}`);
    });
  }

  // Verificar datos de pago
  if (!form.value.titularCuenta) camposFaltantes.push("Titular de la Cuenta");
  if (!form.value.numeroOperacion) camposFaltantes.push("Número de Operación");

  // Verificar comprobante
  if (!comprobante.value) camposFaltantes.push("Comprobante de Pago");

  mostrarModal({
    tipo: "advertencia",
    titulo: "Formulario Incompleto",
    mensaje:
      "Por favor complete todos los campos requeridos antes de continuar con la inscripción.",
    textoConfirmar: "Entendido",
    mostrarCancelar: false,
    camposFaltantes,
  });
};

const mostrarModalConfirmacion = () => {
  mostrarModal({
    tipo: "confirmacion",
    titulo: "Confirmar Inscripción",
    mensaje: `
      <strong>¿Está seguro de enviar la inscripción?</strong><br><br>
      Verifique que todos los datos estén correctos:<br>
      • <strong>Grupo:</strong> ${grupoData.value.nombreGrupo}<br>
      • <strong>Deporte:</strong> ${nombreDeporte.value}<br>
      • <strong>Jugadores:</strong> ${jugadores.value.length}<br>
      • <strong>Monto:</strong> S/ ${montoActual.value}
    `,
    textoConfirmar: "Sí, enviar inscripción",
    textoCancelar: "Revisar datos",
  });
};

const cerrarModalConfirmacion = () => {
  modalConfirmacionMostrar.value = false;
};

const manejarConfirmacion = () => {
  if (modalTipo.value === "confirmacion") {
    // Solo ejecutar el envío si es un modal de confirmación
    confirmarEnvio();
  } else {
    // Para otros tipos (éxito, advertencia, error), solo cerrar
    cerrarModal();
  }
};



const handleSubmit = async () => {
  // Validación del lado cliente - mostrar modal de advertencia si hay campos faltantes
  if (!validarFormularioCompleto()) {
    mostrarModalCamposIncompletos();
    return;
  }

  // Mostrar modal de confirmación
  mostrarModalConfirmacion();
};

const confirmarEnvio = async () => {
  // Cerrar modal de confirmación primero
  cerrarModal();

  // Esperar un poco para que la animación de cierre termine
  await new Promise((resolve) => setTimeout(resolve, 300));

  isSubmitting.value = true;

  try {
    // Procesar jugadores: unir nombre y apellido, convertir sexo
    const jugadoresProcesados = jugadores.value.map(jugador => ({
      ...jugador,
      nombre: `${jugador.nombre} ${jugador.apellido}`.trim(),
      sexo: jugador.sexo === 'masculino' ? 'M' : jugador.sexo === 'femenino' ? 'F' : jugador.sexo
    }));

    // Eliminar campo apellido de los jugadores procesados
    jugadoresProcesados.forEach(jugador => {
      delete jugador.apellido;
    });

    // Preparar datos para la API con los nombres correctos
    const datosAPI = {
      cicloId: grupoData.value.ciclo,
      email: grupoData.value.email,
      celular: grupoData.value.celular,
      equipoNombre: grupoData.value.nombreGrupo,
      deporteId: grupoData.value.deporte,
      tipoPago: grupoData.value.tipoPago,
      seccion: grupoData.value.seccion || null,
      jugadores: jugadoresProcesados,
      cantidadParticipantes: jugadores.value.length,
      numeroOperacion: form.value.numeroOperacion,
      titularCuenta: form.value.titularCuenta
    };

    console.log("Datos del formulario (original):", {
      ...grupoData.value,
      ...form.value,
      jugadores: jugadores.value,
      comprobante: comprobante.value ? comprobante.value.name : null,
    });

    console.log("Datos que se enviarán a la API:", datosAPI);

    // Realizar llamada a la API usando el store
    const resultado = await storeInscripciones.crearInscripcion(datosAPI, comprobante.value);
    console.log("Respuesta de la API:", resultado);

    // Guardar datos antes de limpiar para mostrar en el modal de éxito
    datosGuardados.value = {
      nombreGrupo: grupoData.value.nombreGrupo,
      deporte: nombreDeporte.value,
      email: grupoData.value.email,
      cantidadJugadores: jugadores.value.length,
    };

    // Limpiar formulario después del éxito
    Object.keys(grupoData.value).forEach((key) => {
      // Mantener el valor por defecto para tipoPago, limpiar otros campos
      if (key === 'tipoPago') {
        grupoData.value[key] = 'regular';
      } else {
        grupoData.value[key] = "";
      }
    });
    Object.keys(form.value).forEach((key) => {
      form.value[key] = "";
    });
    jugadores.value = [];
    comprobante.value = null;

    // Mostrar modal de éxito simple con datos guardados
    modalConfirmacionMostrar.value = true;
  } catch (error) {
    console.error("Error al enviar el formulario:", error);

    // Usar el mensaje del backend si está disponible, sino usar un mensaje genérico
    let mensajeError = "Ocurrió un error al procesar su inscripción. Por favor, verifique su conexión a internet e intente nuevamente.";

    if (error.response?.data?.mensaje) {
      mensajeError = error.response.data.mensaje;
    } else if (error.message && !error.message.includes('Network Error')) {
      mensajeError = error.message;
    }

    mostrarModal({
      tipo: "error",
      titulo: "Error en el Envío",
      mensaje: mensajeError,
      textoConfirmar: "Intentar nuevamente",
      mostrarCancelar: false,
    });
  } finally {
    isSubmitting.value = false;
  }
};

// Funciones de control de acceso
const verificarAcceso = () => {
  if (storeAuth.puedeAcceder) {
    accesoAutorizado.value = true;
  } else {
    accesoAutorizado.value = false;
    mostrarModalRegistro.value = true;
  }
};

const manejarAccesoConcedido = () => {
  accesoAutorizado.value = true;
  mostrarModalRegistro.value = false;
};

const cerrarModalRegistro = () => {
  mostrarModalRegistro.value = false;
  // Redirigir al home si no tiene acceso
  if (!accesoAutorizado.value) {
    router.push('/403');
  }
};

// Verificar acceso al montar el componente
onMounted(() => {
  verificarAcceso();
});
</script>
