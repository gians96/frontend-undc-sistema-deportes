<template>
  <div class="equipos">
    <div class="bg-oscuro-800 rounded-xl shadow-lg border border-oscuro-600 p-8 mb-8 hidden lg:block">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
          <i class="fas fa-users text-white text-xl"></i>
        </div>
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">
            Gestión de <span class="text-green-400 glow-text">Equipos</span>
          </h1>
          <p class="text-oscuro-200">Administra los equipos por deporte</p>
        </div>
      </div>
    </div>

    <!-- Selector de deporte -->
    <DeporteSelector
      :deportes="deportes"
      :deporte-seleccionado="equiposStore.deporteSeleccionado"
      @seleccionar-deporte="seleccionarDeporte"
    />

    <!-- Vista de equipos (solo visualización) -->
    <Vistas
      :deporte-seleccionado="equiposStore.deporteSeleccionado"
      :equipos="equiposStore.equipos"
      :loading="equiposStore.loading"
      :vista-actual="equiposStore.vistaActual"
      @cambiar-vista="equiposStore.cambiarVista"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminLayout from '../../layouts/AdminLayout.vue'
import { useOpcionesDeporte } from '../../stores/deporte'
import { useEquiposApi } from '../../stores/equipos'
import DeporteSelector from '../../components/Admin/Equipos/DeporteSelector.vue'
import Vistas from '../../components/Admin/Equipos/Vistas.vue'

defineOptions({
  layout: AdminLayout
})

const opcionesStore = useOpcionesDeporte()
const deportes = opcionesStore.obtenerDeportes
const equiposStore = useEquiposApi()

const seleccionarDeporte = (deporte) => equiposStore.seleccionarDeporte(deporte)

onMounted(() => {
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