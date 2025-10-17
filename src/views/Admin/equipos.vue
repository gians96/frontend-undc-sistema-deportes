<template>
  <div class="equipos">
    <div class="bg-oscuro-850 rounded-xl shadow-lg px-6 py-4 mb-4 hidden lg:block">
      <div class="flex items-center gap-4">
        <div
          class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center"
        >
          <i class="fas fa-users text-white text-xl"></i>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-white">
            Gestión de <span class="text-green-400 glow-text">Equipos</span>
          </h1>
          <p class="text-oscuro-200">Visualiza los equipos inscritos por deporte</p>
        </div>
      </div>
    </div>

    <!-- Selector de deporte -->
    <DeporteSelector
      :deportes="deportes"
      :deporte-seleccionado="equiposStore.deporteSeleccionado"
      :todos-los-equipos="equiposStore.todosLosEquipos"
      :cantidad-equipos="equiposStore.equipos.length"
      @seleccionar-deporte="seleccionarDeporte"
    />

    <!-- Vista de equipos (solo visualización) -->
    <Vistas
      :deporte-seleccionado="equiposStore.deporteSeleccionado"
      :equipos="equiposStore.equipos"
      :loading="equiposStore.loading"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AdminLayout from '../../layouts/AdminLayout.vue'
import { useOpcionesDeporte } from '../../stores/deporte'
import { useEquiposApi } from '../../stores/equipos'
import DeporteSelector from '../../components/Admin/Equipos/DeporteSelector.vue'
import Vistas from '../../components/Admin/Equipos/Vistas.vue'

const opcionesStore = useOpcionesDeporte()
const deportes = opcionesStore.obtenerDeportes
const equiposStore = useEquiposApi()

const seleccionarDeporte = (deporte) => {
  equiposStore.seleccionarDeporte(deporte)
}

onMounted(async () => {
  // Cargar todos los equipos una sola vez
  await equiposStore.cargarTodosLosEquipos()

  // Preseleccionar el primer deporte si existe
  if (deportes.length > 0) {
    equiposStore.seleccionarDeporte(deportes[0])
  }
})
</script>

<style scoped>
.equipos {
  max-width: 7xl;
}
</style>