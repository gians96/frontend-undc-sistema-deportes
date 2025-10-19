<template>
  <Teleport to="body">
    <div
      v-if="mostrar"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      @click="cerrarPorFondo"
    >
      <!-- Overlay mejorado -->
      <div class="absolute inset-0 bg-gradient-to-br from-black/70 to-gray-900/95 backdrop-blur-md"></div>

      <!-- Modal mejorado -->
      <div
        class="relative bg-gradient-to-br from-[#0f1419] to-[#1a2332] rounded-2xl shadow-2xl border border-green-400/20 max-w-lg w-full transform transition-all duration-500 overflow-hidden"
        :class="animacionClase"
        @click.stop
      >
        <!-- Efectos decorativos -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/5 to-transparent opacity-50"></div>

        <!-- Contenido centrado -->
        <div class="relative p-10 text-center">
          <!-- Icono de éxito mejorado -->
          <div class="relative mx-auto mb-6">
            <!-- Anillo exterior animado -->
            <div class="h-24 w-24 rounded-full bg-gradient-to-br from-green-400/30 to-emerald-500/30 mx-auto animate-pulse-slow shadow-2xl shadow-green-400/25"></div>
            <!-- Icono principal -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <i class="fa-solid fa-check text-white text-2xl animate-bounce-once"></i>
              </div>
            </div>
            <!-- Partículas decorativas -->
            <div class="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            <div class="absolute -bottom-2 -left-2 w-2 h-2 bg-emerald-400 rounded-full animate-ping animation-delay-300"></div>
          </div>

          <!-- Título mejorado -->
          <h3 class="text-white text-4xl font-black mb-4 bg-gradient-to-r from-white to-green-100 bg-clip-text drop-shadow-lg">
            {{ titulo }}
          </h3>

          <!-- Mensaje mejorado -->
          <div class="bg-gray-800/30 rounded-xl p-6 mb-8 border border-gray-700/50 backdrop-blur-sm">
            <p class="text-gray-200 font-medium leading-relaxed text-sm" v-html="mensaje"></p>
          </div>

          <!-- Card para unirse a WhatsApp (Flexbox Compacto) -->
          <a
            :href="whatsApp.link"
            target="_blank"
            key="whatsapp-link-flex"
            class="group relative block w-full p-3 mb-4 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 hover:border-green-500/40 rounded-lg transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <i class="fa-brands fa-whatsapp text-2xl text-green-400 transition-transform duration-300 group-hover:scale-110"></i>
                <div class="text-left">
                  <p class="font-semibold text-white text-sm">Únete al grupo de WhatsApp</p>
                  <p class="text-gray-400 text-xs">{{ whatsApp.nombreGrupo }}</p>
                </div>
              </div>
              <i class="fa-solid fa-chevron-right text-green-400/50 transition-transform duration-300 group-hover:translate-x-1"></i>
            </div>
            <div class="absolute top-0 left-0 h-full w-full bg-green-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </a>

          <!-- Botón mejorado -->
          <button
            @click="confirmar"
            class="group relative w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-lg transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-green-400/25 hover:shadow-2xl transform overflow-hidden cursor-pointer"
          >
            <!-- Efecto de brillo al hover -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <!-- Texto del botón -->
            <span class="relative flex items-center justify-center gap-2">
              <i class="fa-solid fa-thumbs-up group-hover:animate-bounce"></i>
              {{ textoConfirmar }}
            </span>
          </button>

          <!-- Texto secundario -->
          <!-- <p class="text-gray-400 text-sm mt-4 opacity-75">
            Presiona <kbd class="px-2 py-1 bg-gray-700 rounded text-xs">ESC</kbd> para cerrar
          </p> -->
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  mostrar: {
    type: Boolean,
    default: false
  },
  titulo: {
    type: String,
    default: '¡Éxito!'
  },
  mensaje: {
    type: String,
    default: 'Operación completada correctamente.'
  },
  textoConfirmar: {
    type: String,
    default: 'Entendido'
  },
  cerrarPorOverlay: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['confirmar', 'cerrar'])

const whatsApp = {
  link: 'https://chat.whatsapp.com/H57QlIJMB1h6aXncegp4eV?mode=wwc',
  nombreGrupo: 'Coordinación Deportiva'
}



const animacionClase = ref('scale-95 opacity-0')

const confirmar = () => {
  emit('confirmar')
  cerrar()
}

const cerrar = () => {
  animacionClase.value = 'scale-95 opacity-0'
  setTimeout(() => {
    emit('cerrar')
  }, 200)
}

const cerrarPorFondo = () => {
  if (props.cerrarPorOverlay) {
    cerrar()
  }
}

const manejarEscape = (evento) => {
  if (evento.key === 'Escape' && props.mostrar) {
    cerrar()
  }
}

// Watcher para manejar las animaciones cuando el modal se muestra/oculta
watch(() => props.mostrar, async (nuevoValor) => {
  if (nuevoValor) {
    // Modal se está mostrando - iniciar con escala pequeña
    animacionClase.value = 'scale-95 opacity-0'
    await nextTick()
    // Pequeño delay para permitir que el DOM se actualice
    requestAnimationFrame(() => {
      animacionClase.value = 'scale-100 opacity-100'
    })
  }
}, { immediate: false })

onMounted(() => {
  document.addEventListener('keydown', manejarEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', manejarEscape)
})
</script>

<style scoped>
/* Animaciones personalizadas mejoradas */
.transform {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease;
}

/* Animación de pulso lento para el anillo exterior */
@keyframes pulse-slow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.4;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

/* Animación de bounce único para el check */
@keyframes bounce-once {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.animate-bounce-once {
  animation: bounce-once 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s both;
}

/* Delay para las partículas */
.animation-delay-300 {
  animation-delay: 300ms;
}

/* Efecto de float sutil */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

/* Mejora del gradiente text */
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}

/* Estilo para kbd */
kbd {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  border: 1px solid #374151;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* Mejora de la transición de escala */
.scale-95 {
  transform: scale(0.95) translateY(10px);
}

.scale-100 {
  transform: scale(1) translateY(0px);
}

/* Efecto de glow en hover para el botón */
button:hover {
  box-shadow: 0 20px 25px -5px rgba(34, 197, 94, 0.1),
              0 10px 10px -5px rgba(34, 197, 94, 0.04),
              0 0 0 1px rgba(34, 197, 94, 0.05);
}

/* Animación adicional para el modal */
@keyframes modalEntrance {
  0% {
    transform: scale(0.9) translateY(20px) rotateX(10deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0px) rotateX(0deg);
    opacity: 1;
  }
}

.modal-enter {
  animation: modalEntrance 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
</style>