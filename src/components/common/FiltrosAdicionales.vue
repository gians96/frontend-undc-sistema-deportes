<template>
  <div class="flex items-center gap-3">
    <!-- Filtro por Ciclo -->
    <div class="relative flex-1">
      <select 
        id="filtro-ciclo" 
        v-model="cicloSeleccionado" 
        @change="emitirFiltros" 
        class="w-full appearance-none bg-oscuro-800 border border-oscuro-700 text-white text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 block px-3 py-4 transition"
      >
        <option :value="null">Todos los Ciclos</option>
        <option v-for="ciclo in ciclos" :key="ciclo" :value="ciclo">{{ ciclo }}° Ciclo</option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
        <i class="fas fa-chevron-down text-sm text-oscuro-400"></i>
      </div>
    </div>
    <!-- Filtro por Sección -->
    <div class="relative flex-1">
      <select 
        id="filtro-seccion" 
        v-model="seccionSeleccionada" 
        @change="emitirFiltros" 
        class="w-full appearance-none bg-oscuro-800 border border-oscuro-700 text-white text-base rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 block px-3 py-4 transition"
      >
        <option :value="null">Todas las Secciones</option>
        <option v-for="seccion in secciones" :key="seccion" :value="seccion">Sección '{{ seccion }}'</option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
        <i class="fas fa-chevron-down text-sm text-oscuro-400"></i>
      </div>
    </div>
    <!-- Botón para limpiar filtros -->
    <div v-if="filtrosActivos" class="transition-all duration-300 animate-in fade-in-0 zoom-in-95">
      <button 
        @click="limpiarFiltros" 
        class="w-12 h-12 flex items-center justify-center bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-xl transition-colors"
        aria-label="Limpiar filtros"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['update:filtros']);

const ciclos = Array.from({ length: 10 }, (_, i) => i + 1);
const secciones = ['A', 'B'];

const cicloSeleccionado = ref(null);
const seccionSeleccionada = ref(null);

const filtrosActivos = computed(() => cicloSeleccionado.value || seccionSeleccionada.value);

const emitirFiltros = () => {
  emit('update:filtros', {
    ciclo: cicloSeleccionado.value,
    seccion: seccionSeleccionada.value,
  });
};

const limpiarFiltros = () => {
  cicloSeleccionado.value = null;
  seccionSeleccionada.value = null;
  emitirFiltros();
};
</script>
