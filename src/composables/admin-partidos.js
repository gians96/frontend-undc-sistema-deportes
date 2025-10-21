import { ref, computed, onMounted } from 'vue';
import { usePartidosApi } from '@/stores/partidos.js';
import { useOpcionesDeporte } from '@/stores/deporte.js';

export const useAdminPartidos = () => {
  // Stores
  const partidosStore = usePartidosApi();
  const deporteStore = useOpcionesDeporte();

  // Estado local
  const deporteSeleccionado = ref(null);
  const modalPartido = ref({ visible: false, partido: null });

  // Computed
  const deportes = computed(() => deporteStore.obtenerDeportes);
  const torneo = computed(() => partidosStore.torneo);
  const equiposParaTorneo = computed(() => partidosStore.equiposParaTorneo);
  const cargando = computed(() => partidosStore.cargando);

  // --- MÉTODOS PRINCIPALES ---

  const seleccionarDeporte = async (deporte) => {
    deporteSeleccionado.value = deporte;
    try {
      await partidosStore.cargarDatosDeporte(deporte.valor);
      guardarSeleccionDeporte(deporte);
    } catch (error) {
      alert('Error al cargar datos del torneo: ' + (error.response?.data?.mensaje || error.message));
    }
  };

  const generarTorneo = async () => {
    try {
      const equiposParaAPI = partidosStore.equiposParaTorneo.map(e => ({
        id: e.id_equipo || e.jugador_id,
        nombre: e.nombre_equipo || e.jugador_nombre
      }));

      if (equiposParaAPI.length < 4) {
        alert('Se necesitan al menos 4 equipos/jugadores para generar un torneo.');
        return;
      }

      await partidosStore.generarTorneo(deporteSeleccionado.value.valor, equiposParaAPI);
      alert('¡Torneo generado exitosamente!');
    } catch (error) {
      alert('Error al generar torneo: ' + (error.response?.data?.mensaje || error.message));
    }
  };

  const reiniciarTorneo = async () => {
    if (!confirm('¿Estás seguro de que quieres reiniciar el torneo? Se perderán todos los datos.')) return;
    try {
      await partidosStore.reiniciarTorneo(deporteSeleccionado.value.valor);
      alert('Torneo reiniciado exitosamente');
    } catch (error) {
      alert('Error al reiniciar torneo: ' + (error.response?.data?.mensaje || error.message));
    }
  };

  const completarFase = async (rondaIndex) => {
    if (!confirm('¿Crear enfrentamientos para la siguiente fase?')) return;
    try {
      const ronda = partidosStore.torneo.rondas[rondaIndex];
      const resultado = await partidosStore.avanzarRonda(deporteSeleccionado.value.valor, ronda.fase_id);

      if (resultado.torneo_finalizado) {
        alert(`🏆 ¡Torneo finalizado!\n\nCampeón: ${resultado.campeon.nombre}`);
      } else {
        alert(`Ronda avanzada exitosamente.`);
      }
    } catch (error) {
      alert('Error al avanzar ronda: ' + (error.response?.data?.mensaje || error.message));
    }
  };

  // --- MANEJO DEL MODAL DE RESULTADO ---

  const finalizarPartido = (rondaIndex, partidoId) => {
    const ronda = partidosStore.torneo.rondas[rondaIndex];
    if (!ronda) return;

    const partido = ronda.partidos.find(p => p.enfrentamiento_id === partidoId);
    if (!partido) return;

    // Añadir fase_id al objeto partido para que esté disponible en el modal
    const partidoConFase = { ...partido, fase_id: ronda.fase_id, rondaIndex };

    modalPartido.value = { visible: true, partido: partidoConFase };
  };

  const guardarResultado = async (datosResultado) => {
    const { partido } = modalPartido.value;
    try {
      await partidosStore.finalizarPartido(
        partido.enfrentamiento_id,
        partido.fase_id, 
        datosResultado.puntos_equipo_1,
        datosResultado.puntos_equipo_2,
        datosResultado.ganador_id,
        datosResultado.perdedor_id
      );
      cerrarModal();
      alert('¡Resultado guardado exitosamente!');
    } catch (error) {
      alert('Error al guardar resultado: ' + (error.response?.data?.mensaje || error.message));
    }
  };

  const cerrarModal = () => {
    modalPartido.value = { visible: false, partido: null };
  };

  // --- HELPERS & LIFECYCLE ---

  const guardarSeleccionDeporte = (deporte) => {
    localStorage.setItem('ultimoDeporteSeleccionado', deporte.valor.toString());
  };

  const cargarUltimoDeporte = async () => {
    const ultimoDeporteId = localStorage.getItem('ultimoDeporteSeleccionado');
    if (ultimoDeporteId && deportes.value.length) {
      const deporte = deportes.value.find(d => d.valor.toString() === ultimoDeporteId);
      if (deporte) {
        await seleccionarDeporte(deporte);
      }
    }
  };

  onMounted(() => {
    // Esperar a que los deportes estén disponibles desde el store de opciones
    if (deportes.value.length) {
        cargarUltimoDeporte();
    }
  });

  return {
    deporteSeleccionado,
    deportes,
    torneo,
    equiposParaTorneo,
    cargando,
    modalPartido,
    seleccionarDeporte,
    generarTorneo,
    reiniciarTorneo,
    finalizarPartido,
    guardarResultado,
    completarFase,
    cerrarModal
  };
};
