<template>
  <div class="inscripciones-layout">
    <nav class="navbar-fixed bg-oscuro-800/90 backdrop-blur-sm">
      <div class="navbar-container max-w-7xl">
        <div class="nav-brand flex items-center gap-2 sm:gap-3">
          <div class="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 transition-transform duration-200 group-hover:scale-105">
            <img
              src="/images/logo_undc_sistemas_blanco.svg"
              alt="UNDC Logo"
              class="h-4 sm:h-6 w-auto"
            />
          </div>
          <div>
              <h1 class="text-xl lg:text-2xl font-bold text-white glow-text">
                UNDC <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Inscripción</span>
              </h1>
              <p class="text-xs text-oscuro-300 hidden sm:block">
                Sistema de inscripción deportiva
              </p>
            </div>
        </div>
        <div class="nav-actions">
          <BotonHexagonal
            size="sm"
            text="Ver reglas"
            href="https://drive.google.com/file/d/1_FDL7uk4XeAJy_lnKnE7xTob4q5HZH0K/view"
          />
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import BotonHexagonal from '@/components/common/botton/BotonHexagonal.vue'
</script>

<style scoped>
.inscripciones-layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #111827 0%, #1f2937 50%, #111827 100%);
  position: relative;
}

.inscripciones-layout::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #0f161b;
  /* background:
    radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%); */
  pointer-events: none;
}

.navbar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
  /* box-shadow: 0 4px 20px rgba(34, 197, 94, 0.1); */
  box-shadow: 0 10px 15px rgba(0, 0, 0, .2);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 1rem;
}

.nav-brand h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
}

.nav-actions {
  display: flex;
  align-items: center;
}

.main-content {
  padding-top: 5rem;
  min-height: calc(100vh - 5rem);
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 2rem;
  position: relative;
  z-index: 1;
}

/* Tablet styles */
@media (min-width: 640px) {
  .navbar-container {
    padding: 0 1.5rem;
  }

  .main-content {
    padding-top: 6rem;
    min-height: calc(100vh - 6rem);
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .navbar-container {
    padding: 0 2rem;
  }

  .main-content {
    padding-left: 2rem;
    padding-right: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

/* Mobile specific adjustments */
@media (max-width: 480px) {
  .navbar-container {
    padding: 0 0.75rem;
  }

  .main-content {
    padding-top: 4.5rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}
</style>