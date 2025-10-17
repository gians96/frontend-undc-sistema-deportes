<template>
  <div>
    <div class="partidos">
      <!-- Header para desktop -->
      <div class="bg-oscuro-800 rounded-xl shadow-lg border border-oscuro-600 p-8 mb-8 hidden lg:block">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
            <i class="fas fa-calendar-alt text-white text-xl"></i>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-white mb-2">
              Gestión de <span class="text-green-400 glow-text">Partidos</span>
            </h1>
            <p class="text-oscuro-200">Programa y administra los encuentros deportivos</p>
          </div>
        </div>
      </div>

      <!-- Header para móvil -->
      <div class="bg-oscuro-800 rounded-lg shadow-lg border border-oscuro-600 p-4 mb-6 lg:hidden">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <i class="fas fa-calendar-alt text-white text-lg"></i>
          </div>
          <div>
            <h1 class="text-xl font-bold text-white">
              Gestión de <span class="text-green-400 glow-text">Partidos</span>
            </h1>
            <p class="text-sm text-oscuro-200">Administra encuentros deportivos</p>
          </div>
        </div>
      </div>

      <!-- Selector de deporte -->
      <SelectorDeporte
        :deportes="deportes"
        :deporte-seleccionado="deporteSeleccionado"
        @seleccionar="seleccionarDeporte"
      />

      <!-- Panel de control del torneo -->
      <PanelControl
        v-if="deporteSeleccionado"
        :deporte-seleccionado="deporteSeleccionado"
        :cantidad-equipos="equiposParaTorneo.length"
        :estado-torneo="torneo.estado"
        @generar="generarTorneo"
        @reiniciar="reiniciarTorneo"
      />

      <!-- Vista del torneo -->
      <div v-if="torneo.estado !== 'no_iniciado'">
        <TorneoBracket
          :torneo="torneo"
          :deporte-seleccionado="deporteSeleccionado"
          @iniciar-partido="iniciarPartido"
          @finalizar-partido="finalizarPartido"
          @editar-partido="finalizarPartido"
          @completar-fase="completarFase"
        />
      </div>

      <!-- Listado tradicional de partidos (fallback) -->
      <div v-else-if="!deporteSeleccionado" class="bg-oscuro-800 rounded-xl shadow-lg border border-oscuro-600 p-6">
        <div class="text-center py-12">
          <i class="fa-solid fa-trophy text-6xl text-oscuro-400 mb-4"></i>
          <h3 class="text-xl font-semibold text-oscuro-200 mb-2">
            Selecciona un deporte para comenzar
          </h3>
          <p class="text-oscuro-300">
            Elige un deporte para ver o generar su torneo
          </p>
        </div>
      </div>

    </div>

    <!-- Modal de Registro de Resultado -->
    <ModalResultado
      :visible="modalPartido.visible"
      :partido="modalPartido.partido"
      :es-edicion="modalPartido.partido?.estado === 'finalizado'"
      @cerrar="cerrarModal"
      @confirmar="guardarResultado"
    />
  </div>
</template>

<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import TorneoBracket from '@/components/TorneoBracket.vue';
import ModalResultado from '@/components/ModalResultado.vue';
import SelectorDeporte from '@/components/Admin/Partidos/SelectorDeporte.vue';
import PanelControl from '@/components/Admin/Partidos/PanelControl.vue';
import { useAdminPartidos } from '@/composables/admin-partidos';

// Usar el composable que maneja toda la lógica
const {
  // Estado
  deporteSeleccionado,
  deportes,
  torneo,
  equiposParaTorneo,
  cargando,
  modalPartido,

  // Métodos
  seleccionarDeporte,
  generarTorneo,
  reiniciarTorneo,
  iniciarPartido,
  finalizarPartido,
  guardarResultado,
  completarFase,
  cerrarModal
} = useAdminPartidos();
</script>

<style scoped>
.partidos {
  max-width: 7xl;
}
</style>
