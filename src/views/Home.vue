<template>
  <div class="min-h-screen bg-gradient-to-br from-oscuro-950 via-oscuro-900 to-oscuro-950 py-8">

    <!-- Selector de Deportes -->
    <div class="max-w-7xl mx-auto px-4 mb-8">
      <div class="bg-oscuro-800/50 backdrop-blur-xl rounded-xl border border-oscuro-600 p-4">
        <div class="flex flex-wrap gap-3 justify-center">
          <button
            v-for="deporte in deportes"
            :key="deporte.id"
            @click="seleccionarDeporte(deporte.id)"
            class="px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
            :class="deporteSeleccionado === deporte.id
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30'
              : 'bg-oscuro-700 text-oscuro-300 hover:bg-oscuro-600 hover:text-white'"
          >
            <i :class="deporte.icono"></i>
            <span>{{ deporte.nombre }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="max-w-7xl mx-auto px-4 pb-12">
      <!-- Skeleton Loading -->
      <SkeletonTabla v-if="cargando" />

      <!-- Tabla de posiciones -->
      <TablaPosiciones
        v-else-if="datos && datos.posiciones.length > 0"
        :nombre-deporte="datos.nombre_deporte"
        :torneo="datos.torneo"
        :fecha-actualizacion="datos.fecha_actualizacion"
        :posiciones="datos.posiciones"
      />

      <!-- Estado vacío -->
      <div v-else class="bg-oscuro-800 rounded-2xl shadow-2xl border border-oscuro-600 p-12">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-20 h-20 mb-6 bg-oscuro-700 rounded-2xl">
            <i class="fa-solid fa-table text-oscuro-400 text-3xl"></i>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">
            No hay posiciones disponibles
          </h3>
          <p class="text-oscuro-300 max-w-md mx-auto mb-6">
            Actualmente no hay torneos activos para {{ datos?.nombre_deporte || 'este deporte' }}.
            Las posiciones se actualizarán cuando comiencen los partidos.
          </p>
          <div class="flex justify-center">
            <BotonHexagonal
              text="Inscribirse"
              href="/inscripciones"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <section class="max-w-7xl mx-auto px-4 pb-16">
      <div class="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-500/30 rounded-2xl p-8 text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">
          ¿Quieres formar parte del torneo?
        </h2>
        <p class="text-oscuro-200 mb-6 max-w-2xl mx-auto">
          Inscribe a tu equipo y participa en los torneos interuniversitarios.
          ¡La competencia está más reñida que nunca!
        </p>
        <div class="flex justify-center">
          <BotonHexagonal
            text="Inscribirse Ahora"
            href="/inscripciones"
          />
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TablaPosiciones from '@/components/Home/TablaPosiciones.vue';
import SkeletonTabla from '@/components/Home/SkeletonTabla.vue';
import BotonHexagonal from '@/components/common/botton/BotonHexagonal.vue';
import { obtenerPosiciones, obtenerDeportesDisponibles } from '@/apis/posiciones.api';

const deportes = ref([]);
const deporteSeleccionado = ref(1);
const datos = ref(null);
const cargando = ref(false);

const cargarPosiciones = async (deporteId) => {
  cargando.value = true;
  try {
    datos.value = await obtenerPosiciones(deporteId);
  } catch (error) {
    console.error('Error al cargar posiciones:', error);
    datos.value = {
      id_deporte: deporteId,
      nombre_deporte: "Deporte",
      torneo: "Sin torneo activo",
      fecha_actualizacion: new Date().toISOString(),
      posiciones: []
    };
  } finally {
    cargando.value = false;
  }
};

const seleccionarDeporte = (deporteId) => {
  deporteSeleccionado.value = deporteId;
  cargarPosiciones(deporteId);
};

onMounted(() => {
  deportes.value = obtenerDeportesDisponibles();
  cargarPosiciones(deporteSeleccionado.value);
});
</script>

<style scoped>
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

.bg-grid-pattern {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>
