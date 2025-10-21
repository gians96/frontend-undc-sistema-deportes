<template>
  <div
    class="pt-6"
  >
    <!-- Seccion cabecera -->
    <div class="max-w-7xl mx-auto px-4 mb-8">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
        <!-- Titulo y un badge -->
        <div class="text-center md:text-left">
          <span class="bg-gradient-to-r from-verde-primario via-verde-primario/40 to-transparent text-white text-xs font-bold uppercase px-5 py-1 tracking-widest md:text-sm lg:text-xl">
            Torneo Deportivo
          </span>
          <h2 class="text-3xl md:text-4xl lg:text-6xl font-bold text-white mt-3 uppercase titulo">Resultados</h2>
        </div>
        <!-- selector de deportes -->
        <div class="p-2">
          <ul class="flex flex-wrap justify-center md:justify-end">
            <BotonNavegacion
              v-for="deporte in deportes"
              :key="deporte.valor"
              @click="seleccionarDeporte(deporte.valor)"
              :active="deporteSeleccionado === deporte.valor"
            >
              {{ deporte.etiqueta }}
            </BotonNavegacion>
          </ul>
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
      <div
        v-else
        class="bg-oscuro-800 rounded-2xl shadow-2xl border border-oscuro-600 p-12"
      >
        <div class="text-center">
          <div
            class="inline-flex items-center justify-center w-20 h-20 mb-6 bg-oscuro-700 rounded-2xl"
          >
            <i class="fa-solid fa-table text-oscuro-400 text-3xl"></i>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">
            No hay posiciones disponibles
          </h3>
          <p class="text-oscuro-300 max-w-md mx-auto mb-6">
            Actualmente no hay torneos activos para
            {{ datos?.nombre_deporte || "este deporte" }}. Las posiciones se
            actualizarán cuando comiencen los partidos.
          </p>
          <div class="flex justify-center">
            <BotonHexagonal text="Inscribirse" href="/inscripciones" />
          </div>
        </div>
      </div>
    </div>

    <!-- Inscribirse -->
    <SeccionInscripcion />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import TablaPosiciones from "@/components/Home/TablaPosiciones.vue";
import SkeletonTabla from "@/components/Home/SkeletonTabla.vue";
import BotonHexagonal from "@/components/common/botton/BotonHexagonal.vue";
import BotonNavegacion from "@/components/common/botton/BotonNavegacion.vue";
import SeccionInscripcion from "@/components/Home/SeccionInscripcion.vue";
import { obtenerPosiciones } from "@/apis/posiciones.api";
import { useOpcionesDeporte } from "@/stores/deporte.js";

const deporteStore = useOpcionesDeporte();

const deportes = computed(() => deporteStore.obtenerDeportes);
const deporteSeleccionado = ref(1);
const datos = ref(null);
const cargando = ref(false);

const cargarPosiciones = async (deporteId) => {
  cargando.value = true;
  try {
    datos.value = await obtenerPosiciones(deporteId);
  } catch (error) {
    console.error("Error al cargar posiciones:", error);
    datos.value = {
      id_deporte: deporteId,
      nombre_deporte: "Deporte",
      torneo: "Sin torneo activo",
      fecha_actualizacion: new Date().toISOString(),
      posiciones: [],
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
  cargarPosiciones(deporteSeleccionado.value);
});
</script>

<style scoped>
.bg-grid-pattern {
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}

.titulo {
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(180, 235, 215, 0.3);
}
</style>
