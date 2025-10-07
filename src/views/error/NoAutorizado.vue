<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0a0e13] via-[#0f161b] to-[#0a0e13] relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-10 w-72 h-72 bg-red-400/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-red-400/5 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-400/5 rounded-full blur-3xl"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-lg w-full text-center">
        <!-- Logo/Icon -->
        <div class="mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-red-400/10 rounded-full border border-red-400/20 backdrop-blur-sm">
            <i class="fas fa-ban text-3xl text-red-400"></i>
          </div>
        </div>

        <!-- Error Code -->
        <h1 class="text-8xl sm:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-300 mb-4 animate-pulse">
          403
        </h1>

        <!-- Title -->
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4 glow-text">
          Acceso No Autorizado
        </h2>

        <!-- Message -->
        <p class="text-gray-400 text-lg mb-8 leading-relaxed">
          No tienes permisos para acceder a este recurso.
          <br class="hidden sm:block">
          Contacta al administrador si necesitas acceso.
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            @click="goBack"
            class="group px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white font-semibold rounded-lg border border-gray-600/50 hover:border-gray-500 transition-all duration-300 backdrop-blur-sm"
          >
            <i class="fas fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform duration-300"></i>
            Volver Atrás
          </button>

          <button
            @click="goHome"
            class="group px-6 py-3 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500 text-white font-semibold rounded-lg shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105"
          >
            <i class="fas fa-home mr-2 group-hover:scale-110 transition-transform duration-300"></i>
            Ir al Inicio
          </button>
        </div>


        <!-- Decorative Elements -->
        <div class="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-red-400/30"></div>
        <div class="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-red-400/30"></div>
        <div class="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-red-400/30"></div>
        <div class="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-red-400/30"></div>
      </div>
    </div>

    <!-- Footer -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
      <p class="text-gray-600 text-sm">
        © 2025 UNDC Deportes - Sistema de Inscripción
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.glow-text {
  text-shadow: 0 0 20px rgba(248, 113, 113, 0.3);
}

/* Animaciones personalizadas */
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

/* Efectos adicionales para elementos interactivos */
.group:hover .fas {
  filter: drop-shadow(0 0 8px rgba(248, 113, 113, 0.4));
}

/* Mejoras de accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .animate-pulse,
  .animate-float,
  .transition-all,
  .transition-transform,
  .transition-colors {
    animation: none;
    transition: none;
  }
}

/* Efectos de hover mejorados */
.group:hover {
  transform: translateY(-2px);
}

/* Efectos de gradiente y glow para los botones */
.bg-gradient-to-r:hover {
  filter: brightness(1.1);
}

/* Animación de aparición */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out;
}
</style>