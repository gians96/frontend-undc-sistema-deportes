<template>
  <div
    class="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-oscuro-950 via-oscuro-900 to-oscuro-950 px-4 overflow-hidden"
    @mousemove="spotlightActivo ? handleMouseMove($event) : null"
  >

    <!-- Fondo animado con formas geométricas -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Efecto spotlight que sigue el cursor (estilo Nuxt 3) -->
      <div
        class="spotlight-cursor"
        :style="{
          left: `${cursorX}px`,
          top: `${cursorY}px`
        }"
      ></div>

      <!-- Círculos decorativos -->
      <div class="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <!-- Grid pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>

    <!-- Contenedor principal -->
    <div class="relative z-10 w-full max-w-md">

      <!-- Card principal -->
      <div class="bg-oscuro-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-oscuro-600/50 overflow-hidden">

        <!-- Header con logo y título -->
        <div class="relative bg-gradient-to-br from-green-500/20 to-emerald-600/20 p-8 text-center border-b border-oscuro-600/50">
          <!-- Icono de escudo -->
          <div class="inline-flex items-center justify-center w-18 h-18 mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg shadow-green-500/30 animate-float">
            <img src="/images/logo_undc_sistemas_blanco.webp" alt="Logo Sistemas UNDC" class="w-auto h-8" />
          </div>

          <h1 class="text-3xl font-bold text-white mb-2">
            Panel de <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Administración</span>
          </h1>
          <p class="text-oscuro-300 text-sm hidden sm:block">
            Inicia sesión para gestionar el sistema
          </p>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="handleLogin" class="p-8 space-y-6">

          <!-- Campo Usuario -->
          <CampoLogin
            v-model="form.usuario"
            etiqueta="Usuario"
            tipo="text"
            placeholder="Ingresa tu usuario"
            obligatorio
          >
            <template #icono>
              <i class="fa-solid fa-user text-oscuro-400"></i>
            </template>
          </CampoLogin>

          <!-- Campo Contraseña -->
          <CampoLogin
            v-model="form.contrasena"
            etiqueta="Contraseña"
            tipo="password"
            placeholder="Ingresa tu contraseña"
            obligatorio
          >
            <template #icono>
              <i class="fa-solid fa-lock text-oscuro-400"></i>
            </template>
          </CampoLogin>

          <!-- Mensaje de error -->
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
          >
            <div v-if="auth.error" class="p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <div class="flex items-center gap-3 text-red-400">
                <i class="fa-solid fa-circle-exclamation"></i>
                <p class="text-sm font-medium">{{ auth.error }}</p>
              </div>
            </div>
          </transition>

          <!-- Botón de login -->
          <BotonLogin
            tipo="submit"
            :texto="auth.cargando ? 'Iniciando sesión...' : 'Iniciar Sesión'"
            :icono="auth.cargando ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-arrow-right'"
            :disabled="auth.cargando"
          />

          <!-- Enlace volver al inicio -->
          <div class="text-center pt-4">
            <router-link
              to="/"
              class="inline-flex items-center gap-2 text-sm text-oscuro-300 hover:text-green-400 transition-colors duration-200"
            >
              <i class="fa-solid fa-arrow-left"></i>
              <span>Volver al inicio</span>
            </router-link>
          </div>
        </form>

      </div>

      <!-- Footer info -->
      <div class="mt-6 text-center">
        <p class="text-oscuro-400 text-xs">
          © {{ new Date().getFullYear() }} UNDC Deportes - Sistema de Gestión Deportiva
        </p>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import CampoLogin from '@/components/Login/CampoLogin.vue'
import BotonLogin from '@/components/Login/BotonLogin.vue'

const router = useRouter()
const auth = useAuthStore()

const spotlightActivo = ref(true)

if (typeof window !== 'undefined') {
  spotlightActivo.value = window.matchMedia('(hover: hover)').matches
}

console.log('Spotlight activo:', spotlightActivo.value)

const form = ref({
  usuario: '',
  contrasena: '',
})

// Efecto spotlight que sigue el cursor
const cursorX = ref(0)
const cursorY = ref(0)

const handleMouseMove = (event) => {
  cursorX.value = event.clientX
  cursorY.value = event.clientY
}

const handleLogin = async () => {
  const exito = await auth.iniciarSesion(form.value)
  if (exito) {
    router.push('/admin')
  }
}
</script>

<style scoped>
/* Gradiente del fondo oscuro */
.bg-oscuro-950 {
  background-color: #0a0e13;
}

.bg-oscuro-900 {
  background-color: #0f1419;
}

/* Pattern de grid */
.bg-grid-pattern {
  background-image:
    linear-gradient(rgba(34, 197, 94, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(34, 197, 94, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* Efecto spotlight que sigue el cursor (estilo Nuxt 3) */
.spotlight-cursor {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;

  /* Gradiente radial con verde y esmeralda */
  background: radial-gradient(
    circle,
    rgba(34, 197, 94, 0.15) 0%,
    rgba(16, 185, 129, 0.1) 25%,
    rgba(34, 197, 94, 0.05) 50%,
    transparent 70%
  );

  /* Blur suave para efecto difuminado */
  filter: blur(40px);

  /* Animación sutil de pulso */
  animation: spotlight-pulse 4s ease-in-out infinite;
}

@keyframes spotlight-pulse {
  0%, 100% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.05);
  }
}

/* Animación de flotación suave */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Delay para animación de pulso */
.delay-1000 {
  animation-delay: 1s;
}

/* Transiciones suaves */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Ocultar spotlight en dispositivos móviles/táctiles */
@media (hover: none) {
  .spotlight-cursor {
    display: none;
  }
}
</style>
