<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-oscuro-950 via-oscuro-900 to-oscuro-950">

    <!-- Navbar -->
    <nav class="sticky top-0 z-50 bg-oscuro-800/80 backdrop-blur-sm sombra">
      <div class="max-w-7xl mx-auto px-2">
        <div class="flex justify-between items-center h-20 py-2 px-1.5">

          <!-- Logo y marca -->
          <RouterLink to="/" class="flex items-center gap-2 sm:gap-3 group">
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
          </RouterLink>

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
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="backdrop-blur-xl mt-auto bg-black">
      <SeccionRedes />
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <!-- El copy -->
          <div class="flex items-center gap-3">
            <div>
              <p class="text-oscuro-300 font-bold text-xs md:text-base uppercase ">
                © 2025 Todos los derechos reservados
                <span class="text-verde-primario tracking-wide normal-case">FernandoYZ</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import BotonHexagonal from '@/components/common/botton/BotonHexagonal.vue';
import SeccionRedes from '@/components/Home/SeccionRedes.vue';
</script>

<style scoped>
.sombra {
  box-shadow: 0 10px 15px rgba(0, 0, 0, .2);
}
</style>
