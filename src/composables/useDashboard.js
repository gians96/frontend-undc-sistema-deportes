import { ref, computed, onMounted } from 'vue';
import { useEquiposApi } from '@/stores/equipos';
import { useVouchersApi } from '@/stores/vouchers';
import { useOpcionesDeporte } from '@/stores/deporte';

export function useDashboard() {
  const equiposStore = useEquiposApi();
  const vouchersStore = useVouchersApi();
  const deporteStore = useOpcionesDeporte();

  const loading = ref(true);

  onMounted(async () => {
    loading.value = true;
    try {
      await Promise.all([
        equiposStore.cargarTodosLosEquipos(),
        vouchersStore.cargarTodosLosVouchers(),
        vouchersStore.fetchPendingCount(),
      ]);
    } catch (error) {
      console.error("Error al cargar datos del dashboard:", error);
    } finally {
      loading.value = false;
    }
  });

  // --- ESTADÍSTICAS PRINCIPALES ---
  const totalEquipos = computed(() => equiposStore.todosLosEquipos.length);
  const vouchersPendientes = computed(() => vouchersStore.pendingCount || 0);
  const totalParticipantes = computed(() => {
    if (!equiposStore.todosLosEquipos) return 0;
    return equiposStore.todosLosEquipos.reduce((acc, equipo) => acc + (equipo.participantes || 1), 0);
  });

  const deporteMasPopular = computed(() => {
    if (!equiposStore.todosLosEquipos || equiposStore.todosLosEquipos.length === 0) return 'N/A';
    const conteo = {};
    equiposStore.todosLosEquipos.forEach(equipo => {
      if (equipo && equipo.deporte) {
        conteo[equipo.deporte] = (conteo[equipo.deporte] || 0) + 1;
      }
    });

    if (Object.keys(conteo).length === 0) return 'N/A';

    const deporte = Object.keys(conteo).reduce((a, b) => conteo[a] > conteo[b] ? a : b);
    return deporte.charAt(0).toUpperCase() + deporte.slice(1).toLowerCase();
  });

  // --- RANKING DE DEPORTES ---
  const rankingDeportes = computed(() => {
    if (!equiposStore.todosLosEquipos) return [];
    const conteo = {};
    equiposStore.todosLosEquipos.forEach(equipo => {
      if (equipo && equipo.deporte) {
        const deporteKey = equipo.deporte.toLowerCase();
        if (!conteo[deporteKey]) {
          conteo[deporteKey] = { 
            nombre: equipo.deporte, 
            cantidad: 0, 
            icono: deporteStore.obtenerDeportes.find(d => d.etiqueta.toLowerCase() === deporteKey)?.icono 
          };
        }
        conteo[deporteKey].cantidad++;
      }
    });
    return Object.values(conteo).sort((a, b) => b.cantidad - a.cantidad).slice(0, 5);
  });

  // --- ESTADO DE TORNEOS (simulado) ---
  const tournamentSummaries = computed(() => {
    return deporteStore.obtenerDeportes.map(deporte => {
      const id = deporte.valor;
      if (id === 1) return { ...deporte, estado: 'En Progreso', detalle: 'Cuartos de Final' };
      if (id === 3) return { ...deporte, estado: 'Finalizado', detalle: 'Campeón: Sistemas FC' };
      if (id === 2) return { ...deporte, estado: 'Pendiente', detalle: 'Listo para generar' };
      return { ...deporte, estado: 'No Iniciado', detalle: 'Sin equipos' };
    });
  });

  // --- GRÁFICO ---
  const equiposPorCiclo = computed(() => {
    const ciclos = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    if (!equiposStore.todosLosEquipos) {
      return ciclos.map(ciclo => ({ ciclo, cantidad: 0, porcentaje: 0 }));
    }
    const conteo = ciclos.map(ciclo => ({
      ciclo,
      cantidad: equiposStore.todosLosEquipos.filter(e => e.ciclo === ciclo).length
    }));
    const maxEquipos = Math.max(...conteo.map(c => c.cantidad));
    return conteo.map(c => ({ ...c, porcentaje: maxEquipos > 0 ? (c.cantidad / maxEquipos) * 100 : 0 }));
  });

  return {
    loading,
    totalEquipos,
    vouchersPendientes,
    totalParticipantes,
    equiposPorCiclo,
    tournamentSummaries,
    deporteMasPopular,
    rankingDeportes
  };
}
