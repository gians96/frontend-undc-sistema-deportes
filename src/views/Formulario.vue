<!-- src/views/Formulario.vue -->
<template>
  <div
    class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden"
  >
    <!-- BACKGROUND EFFECTS - Sutil Grid Pattern -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div
        class="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-green-500/5"
      ></div>
      <div class="cyber-grid"></div>
    </div>

    <!-- Partículas decorativas sutiles -->
    <div
      class="absolute top-20 left-10 w-2 h-2 bg-green-400/40 rounded-full animate-ping blur-sm"
    ></div>
    <div
      class="absolute top-40 right-20 w-2 h-2 bg-emerald-400/30 rounded-full animate-pulse blur-sm"
    ></div>
    <div
      class="absolute bottom-32 left-32 w-2 h-2 bg-green-400/40 rounded-full animate-ping blur-sm animation-delay-500"
    ></div>
    <div
      class="absolute bottom-60 right-10 w-2 h-2 bg-emerald-400/30 rounded-full animate-pulse blur-sm animation-delay-700"
    ></div>

    <!-- Orbes de luz sutiles -->
    <div class="subtle-orb subtle-orb-1"></div>
    <div class="subtle-orb subtle-orb-2"></div>

    <div class="py-4 sm:py-6 lg:py-8 relative z-10">
      <!-- Layout de 2 columnas -->
      <div class="flex flex-col xl:flex-row gap-6 lg:gap-8">
        <!-- COLUMNA IZQUIERDA - Información principal -->
        <div class="flex-1 space-y-6">
          <!-- Card principal de alerta - ESTILO ELEGANTE -->
          <div class="relative group">
            <!-- Glow effect sutil -->
            <div
              class="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700"
            ></div>

            <!-- Glass card con borde -->
            <div
              class="relative glass-card rounded-2xl overflow-hidden border border-red-400/30"
            >
              <!-- Scanline effect sutil -->
              <div class="scanline-subtle"></div>

              <!-- Contenido -->
              <div
                class="relative p-6 md:p-8 backdrop-blur-xl bg-gradient-to-br from-oscuro-900/80 via-oscuro-800/80 to-oscuro-900/80"
              >
                <!-- Header con icono -->
                <div class="flex items-start gap-6 mb-6">
                  <!-- Icono principal elegante -->
                  <div class="relative flex-shrink-0">
                    <div class="relative w-24 h-24 md:w-28 md:h-28">
                      <!-- Anillos sutiles -->
                      <div
                        class="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 animate-pulse-slow blur-md"
                      ></div>
                      <div
                        class="absolute inset-2 rounded-full bg-gradient-to-r from-red-500/15 to-orange-500/15 animate-pulse animation-delay-300 blur-sm"
                      ></div>

                      <!-- Icono central -->
                      <div
                        class="absolute inset-0 flex items-center justify-center"
                      >
                        <div
                          class="relative w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-xl shadow-red-500/30 transform rotate-45"
                        >
                          <i
                            class="fas fa-clock text-white text-3xl md:text-4xl transform -rotate-45"
                          ></i>
                        </div>
                      </div>

                      <!-- Badge de alerta -->
                      <div
                        class="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 animate-bounce-subtle border-2 border-red-300/30"
                      >
                        <i
                          class="fa-solid fa-exclamation text-white text-lg font-bold"
                        ></i>
                      </div>
                    </div>
                  </div>

                  <!-- Título -->
                  <div class="flex-1 pt-2">
                    <h1
                      class="text-white text-3xl md:text-5xl font-black mb-4 leading-tight"
                    >
                      <span class="glitch-text" data-text="¡FUERA DE PLAZO!"
                        >¡FUERA DE PLAZO!</span
                      >
                    </h1>
                    <div
                      class="inline-flex items-center gap-2 px-4 py-2 bg-red-800/20 border border-red-500/10 rounded-md backdrop-blur-sm"
                    >
                      <div
                        class="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                      ></div>
                      <i class="fa-solid fa-calendar-xmark text-red-400/80"></i>
                      <p
                        class="text-red-400/90 font-bold text-sm tracking-wider uppercase"
                      >
                        Inscripciones Cerradas
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Mensaje principal -->
                <div
                  class="relative overflow-hidden rounded-xl border border-oscuro-700/50 bg-gradient-to-br from-oscuro-900/60 to-oscuro-800/60 backdrop-blur-md p-6"
                >
                  <p
                    class="relative text-oscuro-100 text-base md:text-lg leading-relaxed font-medium"
                  >
                    {{
                      estadoInscripcion.mensaje ||
                      "Las inscripciones no están disponibles en este momento."
                    }}
                  </p>
                  <!-- Accent bar -->
                  <div
                    class="mt-4 h-1 bg-oscuro-700/50 rounded-full overflow-hidden"
                  >
                    <div
                      class="h-full w-2/3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Borde inferior sutil -->
              <div
                class="h-1 bg-gradient-to-r from-red-500/50 via-orange-500/50 to-red-500/50"
              ></div>
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Stat Card 1 -->
            <div class="relative group cursor-pointer">
              <div
                class="absolute -inset-0.5 bg-oscuro-850 rounded-md blur opacity-20 group-hover:opacity-40 transition duration-500"
              ></div>
              <div
                class="relative glass-card rounded-md p-5 border border-oscuro-800 hover:border-green-400/50 transition-all duration-300 overflow-hidden"
              >
                <div
                  class="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full blur-2xl"
                ></div>
                <div class="flex items-center gap-4 relative">
                  <div
                    class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300"
                  >
                    <i class="fa-solid fa-trophy text-white text-2xl"></i>
                  </div>
                  <div>
                    <p
                      class="text-green-400 text-xs font-bold uppercase tracking-wider"
                    >
                      Próxima temporada
                    </p>
                    <p class="text-white text-xl font-black">Muy pronto</p>
                  </div>
                </div>
                <div
                  class="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-green-500/10 to-transparent"
                ></div>
              </div>
            </div>

            <!-- Stat Card 2 -->
            <div class="relative group cursor-pointer">
              <div
                class="absolute -inset-0.5 bg-oscuro-850 rounded-md blur opacity-20 group-hover:opacity-40 transition duration-500"
              ></div>
              <div
                class="relative glass-card rounded-md p-5 border border-oscuro-800 hover:border-emerald-400/50 transition-all duration-300 overflow-hidden"
              >
                <div
                  class="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl"
                ></div>
                <div class="flex items-center gap-4 relative">
                  <div
                    class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all duration-300"
                  >
                    <i class="fa-solid fa-users text-white text-2xl"></i>
                  </div>
                  <div>
                    <p
                      class="text-emerald-400 text-xs font-bold uppercase tracking-wider"
                    >
                      Equipos participantes
                    </p>
                    <p class="text-white text-xl font-black">+50 Equipos</p>
                  </div>
                </div>
                <div
                  class="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- COLUMNA DERECHA - Acciones y recursos -->
        <div
          class="w-full xl:w-96 xl:sticky xl:top-24 xl:self-start xl:h-fit space-y-6"
        >
          <!-- Card de acciones -->
          <div class="relative group">
            <div
              class="absolute -inset-0.5 bg-oscuro-800 rounded blur opacity-30 group-hover:opacity-50 transition duration-500 cut-corner"
            ></div>
            <div
              class="relative glass-card rounded overflow-hidden cut-corner"
            >
              <div class="scanline-subtle"></div>

              <div
                class="p-6 backdrop-blur-xl bg-gradient-to-br from-oscuro-900/90 to-oscuro-800/90"
              >
                <!-- Header -->
                <div class="flex items-center gap-3 mb-6">
                  <div
                    class="relative w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30"
                  >
                    <i class="fa-solid fa-rocket text-white text-xl"></i>
                  </div>
                  <h2
                    class="text-white text-xl font-black uppercase tracking-wider"
                  >
                    Acciones
                  </h2>
                </div>

                <!-- Botones de acción -->
                <div class="space-y-3">
                  <!-- Botón principal -->
                  <router-link
                    to="/"
                    class="group relative w-full px-6 py-4 rounded overflow-hidden flex items-center justify-center gap-3 transform transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-600 shadow shadow-green-500/30 hover:shadow-lg hover:shadow-green-500/50 cut-corner-button"
                  >
                    <!-- Shine effect -->
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full  transition-transform duration-700"
                    ></div>

                    <!-- Content -->
                    <span
                      class="relative flex items-center gap-3 font-black text-white uppercase tracking-wider text-lg"
                    >
                      Volver al Inicio
                    </span>
                  </router-link>

                  <!-- Botón WhatsApp -->
                  <a
                    href="https://chat.whatsapp.com/H57QlIJMB1h6aXncegp4eV"
                    target="_blank"
                    class="group relative w-full px-6 py-4 rounded overflow-hidden flex items-center justify-center gap-3 transform transition-all duration-300 border border-oscuro-600 bg-gradient-to-r from-oscuro-800 to-oscuro-700 hover:from-green-800/20 hover:to-emerald-800/20 cut-corner-button"
                  >
                    <!-- Shine effect -->
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    ></div>

                    <!-- Content -->
                    <span
                      class="relative flex items-center gap-3 font-black text-white uppercase tracking-wider group-hover:text-verde-primario transition-colors"
                    >
                      <i
                        class="fa-brands fa-whatsapp text-2xl transition-all duration-300"
                      ></i>
                      Únete al grupo
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Card informativo -->
          <div class="relative group">
            <div
              class="absolute -inset-0.5 bg-oscuro-800 rounded blur opacity-30 group-hover:opacity-50 transition duration-500 cut-corner"
            ></div>
            <div
              class="relative glass-card rounded overflow-hidden cut-corner"
            >
              <div class="scanline-subtle"></div>

              <div
                class="p-6 backdrop-blur-xl bg-gradient-to-br from-oscuro-900/90 to-oscuro-800/90"
              >

              <div class="flex items-start gap-4 relative">
                <div
                  class="relative w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30"
                >
                  <i class="fa-solid fa-lightbulb text-white text-xl"></i>
                </div>
                <div>
                  <h3
                    class="text-verde-primario font-black text-lg mb-3 uppercase tracking-wide"
                  >
                    ¿Qué puedes hacer?
                  </h3>
                  <ul class="text-oscuro-200 text-sm space-y-3">
                    <li
                      class="flex items-start gap-3 group/item hover:text-green-300 transition-colors duration-300"
                    >
                      <div class="mt-1">
                        <div
                          class="w-1.5 h-1.5 bg-green-400 rounded-full"
                        ></div>
                      </div>
                      <span class="flex-1"
                        >Mantente atento a nuestras redes sociales para las
                        próximas convocatorias</span
                      >
                    </li>
                    <li
                      class="flex items-start gap-3 group/item hover:text-green-300 transition-colors duration-300"
                    >
                      <div class="mt-1">
                        <div
                          class="w-1.5 h-1.5 bg-green-400 rounded-full"
                        ></div>
                      </div>
                      <span class="flex-1"
                        >Únete a nuestro grupo de WhatsApp para recibir
                        notificaciones</span
                      >
                    </li>
                    <li
                      class="flex items-start gap-3 group/item hover:text-green-300 transition-colors duration-300"
                    >
                      <div class="mt-1">
                        <div
                          class="w-1.5 h-1.5 bg-green-400 rounded-full"
                        ></div>
                      </div>
                      <span class="flex-1"
                        >Revisa la sección de posiciones y próximos
                        partidos</span
                      >
                    </li>
                  </ul>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useInscripcionesApi } from "../stores/inscripciones.js";
import InscripcionesLayout from "../layouts/InscripcionesLayout.vue";

defineOptions({
  layout: InscripcionesLayout,
});

const storeInscripciones = useInscripcionesApi();
const estadoInscripcion = computed(() => storeInscripciones.estadoInscripcion);
</script>

<style scoped>
/* === GRID PATTERN SUTIL === */
.cyber-grid {
  background-image: linear-gradient(
      rgba(34, 197, 94, 0.02) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(34, 197, 94, 0.02) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 25s linear infinite;
}

@keyframes grid-move {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
}

/* === CORTE EN ESQUINA INFERIOR DERECHA === */
.cut-corner {
  clip-path: polygon(100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 0);
}

.cut-corner-button {
  clip-path: polygon(100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 0);
}

/* === ORBS SUTILES === */
.subtle-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.08;
  pointer-events: none;
  z-index: 1;
}

.subtle-orb-1 {
  width: 350px;
  height: 350px;
  background: radial-gradient(
    circle,
    rgba(34, 197, 94, 0.3) 0%,
    transparent 70%
  );
  top: 15%;
  left: 10%;
  animation: float-orb 20s ease-in-out infinite;
}

.subtle-orb-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle,
    rgba(16, 185, 129, 0.2) 0%,
    transparent 70%
  );
  bottom: 25%;
  right: 20%;
  animation: float-orb 25s ease-in-out infinite reverse;
}

@keyframes float-orb {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(20px, -30px) scale(1.05);
  }
  66% {
    transform: translate(-15px, 20px) scale(0.95);
  }
}

/* === GLASS MORPHISM === */
.glass-card {
  background: rgba(15, 20, 25, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* === SCANLINE EFFECT SUTIL === */
.scanline-subtle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(34, 197, 94, 0.01) 50%
  );
  background-size: 100% 4px;
  animation: scanline-move 10s linear infinite;
  pointer-events: none;
  opacity: 0.2;
}

@keyframes scanline-move {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}

/* === GLITCH TEXT EFFECT SUTIL (ROJO) === */
.glitch-text {
  position: relative;
  display: inline-block;
  animation: glitch-skew 8s infinite;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.glitch-text::before {
  left: 2px;
  text-shadow: -1px 0 rgba(239, 68, 68, 0.5);
  clip: rect(24px, 550px, 90px, 0);
  animation: glitch-anim 4s infinite linear alternate-reverse;
}

.glitch-text::after {
  left: -2px;
  text-shadow: 1px 0 rgba(251, 146, 60, 0.4);
  clip: rect(85px, 550px, 140px, 0);
  animation: glitch-anim 3.5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% {
    clip: rect(31px, 9999px, 94px, 0);
  }
  5% {
    clip: rect(62px, 9999px, 45px, 0);
  }
  10% {
    clip: rect(10px, 9999px, 120px, 0);
  }
  15% {
    clip: rect(75px, 9999px, 28px, 0);
  }
  20% {
    clip: rect(42px, 9999px, 105px, 0);
  }
  25% {
    clip: rect(88px, 9999px, 15px, 0);
  }
  30% {
    clip: rect(18px, 9999px, 98px, 0);
  }
  35% {
    clip: rect(55px, 9999px, 72px, 0);
  }
  40% {
    clip: rect(95px, 9999px, 8px, 0);
  }
  45% {
    clip: rect(25px, 9999px, 115px, 0);
  }
  50% {
    clip: rect(68px, 9999px, 38px, 0);
  }
  55% {
    clip: rect(12px, 9999px, 102px, 0);
  }
  60% {
    clip: rect(82px, 9999px, 22px, 0);
  }
  65% {
    clip: rect(48px, 9999px, 85px, 0);
  }
  70% {
    clip: rect(35px, 9999px, 65px, 0);
  }
  75% {
    clip: rect(78px, 9999px, 18px, 0);
  }
  80% {
    clip: rect(5px, 9999px, 108px, 0);
  }
  85% {
    clip: rect(92px, 9999px, 32px, 0);
  }
  90% {
    clip: rect(52px, 9999px, 75px, 0);
  }
  95% {
    clip: rect(28px, 9999px, 88px, 0);
  }
  100% {
    clip: rect(65px, 9999px, 42px, 0);
  }
}

@keyframes glitch-skew {
  0% {
    transform: skew(0deg);
  }
  5% {
    transform: skew(0deg);
  }
  10% {
    transform: skew(-1deg);
  }
  15% {
    transform: skew(0deg);
  }
  20% {
    transform: skew(0deg);
  }
  25% {
    transform: skew(0.5deg);
  }
  30% {
    transform: skew(0deg);
  }
  35% {
    transform: skew(0deg);
  }
  40% {
    transform: skew(-0.5deg);
  }
  45% {
    transform: skew(0deg);
  }
  50% {
    transform: skew(0deg);
  }
  100% {
    transform: skew(0deg);
  }
}

/* === ANIMACIONES SUTILES === */
.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

@keyframes pulse-slow {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.03);
    opacity: 0.25;
  }
}

.animate-bounce-subtle {
  animation: bounce-subtle 2.5s ease-in-out infinite;
}

@keyframes bounce-subtle {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

/* === DELAYS === */
.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-500 {
  animation-delay: 500ms;
}

.animation-delay-700 {
  animation-delay: 700ms;
}

.animation-delay-1000 {
  animation-delay: 1000ms;
}

/* === RESPONSIVE === */
@media (max-width: 768px) {
  .cyber-grid {
    background-size: 30px 30px;
  }

  .subtle-orb {
    filter: blur(60px);
    opacity: 0.05;
  }

  /* Desactivar glitch en móviles para mejor performance */
  .glitch-text::before,
  .glitch-text::after {
    display: none;
  }

  .glitch-text {
    animation: none;
  }
}
</style>
