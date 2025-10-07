<script setup>
import { ref, computed } from "vue";
import Instrucciones from "./Instrucciones.vue";
import { useOpcionesPago, useDatosYape } from "@/stores/inscripciones.js";

// Props
const propiedades = defineProps({
  tipoPago: {
    type: String,
    default: 'regular'
  }
})

const mostrarInstrucciones = ref(false);
const copiado = ref(false);

// Stores
const storePago = useOpcionesPago()
const storeYape = useDatosYape()

// Computed para obtener el monto según el tipo de pago
const montoActual = computed(() => {
  const opcionSeleccionada = storePago.pago.find(opcion => opcion.valor === propiedades.tipoPago)
  return opcionSeleccionada ? opcionSeleccionada.monto : null
})

// Computed para verificar si hay una opción válida seleccionada
const tieneOpcionValida = computed(() => {
  return montoActual.value !== null
})

// Usar datos del store en lugar de hardcodeados
const informacionYape = computed(() => storeYape.yape)

const toggleInstrucciones = () => {
  mostrarInstrucciones.value = !mostrarInstrucciones.value;
};

const copiarNumero = async () => {
  const celularItem = informacionYape.value.find(item => item.etiqueta === "Celular");
  const numeroCelular = celularItem ? celularItem.valor : "";

  // Función fallback para navegadores más antiguos o sin HTTPS
  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Evitar scroll al bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  };

  try {
    // Intentar usar la API moderna del clipboard
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(numeroCelular);
      copiado.value = true;
      setTimeout(() => {
        copiado.value = false;
      }, 2000);
    } else {
      // Usar fallback para navegadores más antiguos o contextos no seguros
      const successful = fallbackCopyTextToClipboard(numeroCelular);
      if (successful) {
        copiado.value = true;
        setTimeout(() => {
          copiado.value = false;
        }, 2000);
      } else {
        throw new Error("Fallback copy failed");
      }
    }
  } catch (error) {
    console.error("Error al copiar el número:", error);
    // Mostrar el número en un prompt para que el usuario pueda copiarlo manualmente
    const userAction = prompt(
      "No se pudo copiar automáticamente. Selecciona y copia el número:",
      numeroCelular
    );
  }
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4 sm:mb-6">
      <h3
        class="text-green-400 text-xl sm:text-2xl lg:text-3xl font-semibold glow-text uppercase flex items-center gap-2 sm:gap-3"
      >
        Información de Pago
      </h3>
      <button
        type="button"
        @click="toggleInstrucciones"
        class="text-green-400 glow-text cursor-pointer"
      >
        <i class="fa-solid fa-circle-question text-lg sm:text-xl"></i>
      </button>
    </div>

    <!-- Instrucciones (Acordeón) -->
    <div
      v-if="mostrarInstrucciones"
      class="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-500/10 rounded-md border border-blue-400/30"
    >
      <Instrucciones />
    </div>

    <!-- Monto de inscripción -->
    <div
      class="mb-4 sm:mb-6 p-3 sm:p-4 rounded-md border transition-all duration-300"
      :class="tieneOpcionValida
        ? 'bg-gradient-to-r from-green-500/10 to-green-400/10 border-green-400/30'
        : 'bg-gradient-to-r from-yellow-500/10 to-yellow-400/10 border-yellow-400/30'"
    >
      <div class="flex items-center justify-between">
        <template v-if="tieneOpcionValida">
          <span 
            class="text-white/80 font-normal text-sm sm:text-base lg:text-lg"
          >
          Monto de Inscripción:</span
          >
          <span class="text-green-400 font-bold text-lg sm:text-xl lg:text-2xl glow-text">
            S/ {{ montoActual }}
          </span>
        </template>
        <template v-else>
          <span class="text-yellow-400 font-semibold text-sm sm:text-base lg:text-lg italic">
            Seleccione tipo de inscripción
          </span>
        </template>
      </div>
    </div>

    <!-- Método de pago Yape -->
    <div class="flex flex-col gap-3 sm:gap-4">
      <!-- QR Code Yape -->
      <div class="flex flex-col items-center justify-center">
        <div class="bg-white rounded-xl sm:rounded-2xl shadow-2xl">
          <img
            src="/images/form/qr_yape.webp"
            alt="Código QR Yape"
            class="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-lg sm:rounded-xl object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Información de Yape -->
      <div class="space-y-3 sm:space-y-4 flex-1 w-full">
        <!-- Datos del titular -->
        <div class="bg-gray-800/40 rounded-md p-3 sm:p-4 space-y-2 sm:space-y-3">
          <h5 class="text-green-400 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Datos del Titular:</h5>
          <div class="space-y-2">
            <div
              v-for="(item) in informacionYape"
              :key="item.etiqueta"
              class="flex justify-between items-center gap-2"
            >
              <span class="text-gray-300 text-xs sm:text-sm flex-shrink-0">{{ item.etiqueta }}:</span>
              <template v-if="item.isPhone">
                <div class="flex items-center gap-1 sm:gap-2 min-w-0">
                  <span class="text-white font-semibold text-xs sm:text-sm truncate" id="numero-celular">
                    {{ item.valor }}
                  </span>
                  <button
                    type="button"
                    @click="copiarNumero"
                    class="bg-green-400 hover:bg-white text-gray-800 p-1 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-green-400/30 cursor-pointer text-xs flex-shrink-0"
                    title="Copiar número"
                  >
                    <i v-if="!copiado" class="fa-solid fa-copy"></i>
                    <i v-else class="fa-solid fa-check"></i>
                  </button>
                </div>
              </template>
              <template v-else>
                <span class="text-white font-semibold text-xs sm:text-sm">{{ item.valor }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
