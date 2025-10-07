<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-oscuro-950 via-oscuro-900 to-oscuro-950">

    <!-- Navbar -->
    <nav class="sticky top-0 z-50 bg-oscuro-800/80 backdrop-blur-sm sombra">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20 py-2 px-1.5">

          <!-- Logo y marca -->
          <router-link to="/" class="flex items-center gap-2 sm:gap-3 group">
            <div class="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 transition-transform duration-200 group-hover:scale-105">
              <img
                src="/images/logo_undc_sistemas_blanco.svg"
                alt="UNDC Logo"
                class="h-4 sm:h-6 w-auto"
              />
            </div>
            <div class="">
              <h1 class="text-xl lg:text-2xl font-bold text-white glow-text">
                UNDC <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Deportes</span>
              </h1>
              <p class="text-xs text-oscuro-300 hidden sm:block">Sistema de Gestión Deportiva</p>
            </div>
          </router-link>

          <!-- Navigation -->
          <div class="flex items-center gap-3 sm:gap-4">
            <BotonHexagonal
              text="Inscripciones"
              href="/inscripciones"
            />
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-oscuro-800/50 backdrop-blur-xl border-t border-oscuro-600/50 mt-auto">
      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <!-- Logo y nombre -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-trophy text-white"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">UNDC Deportes</h3>
              <p class="text-oscuro-400 text-xs">
                © {{ new Date().getFullYear() }} Todos los derechos reservados
              </p>
            </div>
          </div>

          <!-- Redes sociales -->
          <div class="flex items-center gap-4">
            <a href="https://www.facebook.com/FIUNDC" class="text-oscuro-400 hover:text-green-400 transition-colors">
              <i class="fa-brands fa-facebook text-xl"></i>
            </a>
            <a href="#" class="text-oscuro-400 hover:text-green-400 transition-colors">
              <i class="fa-brands fa-instagram text-xl"></i>
            </a>
            <a href="https://www.tiktok.com/@fiundc?lang=es" class="text-oscuro-400 hover:text-green-400 transition-colors">
              <i class="fa-brands fa-tiktok text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import BotonHexagonal from '@/components/common/botton/BotonHexagonal.vue';
</script>

<style scoped>
/* Colores oscuros */
.bg-oscuro-950 {
  background-color: #0a0e13;
}

.bg-oscuro-900 {
  background-color: #0f1419;
}

.bg-oscuro-800 {
  background-color: #1a1f26;
}

.bg-oscuro-700 {
  background-color: #252b35;
}

.bg-oscuro-600 {
  background-color: #2d3541;
}

.sombra {
  box-shadow: 0 10px 15px rgba(0, 0, 0, .2);
}

</style>
