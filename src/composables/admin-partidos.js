import { ref, computed, onMounted } from 'vue';
import { usePartidosApi } from '@/stores/partidos.js';
import { useOpcionesDeporte } from '@/stores/deporte.js';

export const useAdminPartidos = () => {
  // Stores
  const partidosStore = usePartidosApi();
  const deporteStore = useOpcionesDeporte();

  // Estado local
  const deporteSeleccionado = ref(null);
  const modalPartido = ref({
    visible: false,
    rondaIndex: null,
    partidoId: null,
    partido: null
  });

  // Computed
  const deportes = computed(() => deporteStore.obtenerDeportes);
  const torneo = computed(() => partidosStore.torneo);
  const equiposParaTorneo = computed(() => partidosStore.equiposParaTorneo);
  const cargando = computed(() => partidosStore.cargando);

  // Seleccionar deporte
  const seleccionarDeporte = async (deporte) => {
    deporteSeleccionado.value = deporte;

    try {
      await partidosStore.obtenerTorneo(deporte.valor);
      guardarSeleccionDeporte(deporte);
    } catch (error) {
      console.error('❌ Error al cargar datos:', error);
      alert('Error al cargar datos del torneo: ' + error.message);
    }
  };

  // Generar torneo
  const generarTorneo = async () => {
    try {
      const equiposParaAPI = partidosStore.equiposParaTorneo.map(e => ({
        id: e.id_equipo,
        nombre: e.nombre_equipo,
        ciclo: e.ciclo
      }));

      await partidosStore.generarTorneo(deporteSeleccionado.value.valor, equiposParaAPI);
      alert('¡Torneo generado exitosamente!');
    } catch (error) {
      console.error('❌ Error al generar torneo:', error);
      alert('Error al generar torneo: ' + error.message);
    }
  };

  // Reiniciar torneo
  const reiniciarTorneo = async () => {
    if (!confirm('¿Estás seguro de que quieres reiniciar el torneo? Se perderán todos los resultados.')) {
      return;
    }

    try {
      await partidosStore.reiniciarTorneo(deporteSeleccionado.value.valor);
      alert('Torneo reiniciado exitosamente');
    } catch (error) {
      console.error('❌ Error al reiniciar torneo:', error);
      alert('Error al reiniciar torneo: ' + error.message);
    }
  };

  // Iniciar partido
  const iniciarPartido = async (rondaIndex, partidoId) => {
    const ronda = partidosStore.torneo.rondas[rondaIndex];
    const partido = ronda.partidos.find(p => p.detalle_partido_id === partidoId);

    if (!partido) {
      console.error('❌ Partido no encontrado');
      return;
    }

    try {
      const faseId = partido.fase_id || ronda.fase_id;

      if (!faseId) {
        throw new Error('No se encontró fase_id en el partido ni en la ronda');
      }

      await partidosStore.iniciarPartido(partidoId, faseId);

      // Actualizar estado local
      partido.estado_id = 5;
      partido.estado = 'en_curso';

      // Abrir modal para registrar resultado
      modalPartido.value = {
        visible: true,
        rondaIndex,
        partidoId,
        partido: { ...partido }
      };
    } catch (error) {
      console.error('❌ Error al iniciar partido:', error);
      alert('Error al iniciar partido: ' + error.message);
    }
  };

  // Finalizar/Editar partido
  const finalizarPartido = (rondaIndex, partidoId) => {
    const ronda = partidosStore.torneo.rondas[rondaIndex];
    const partido = ronda.partidos.find(p => p.detalle_partido_id === partidoId);

    if (!partido) {
      console.error('❌ Partido no encontrado');
      return;
    }

    modalPartido.value = {
      visible: true,
      rondaIndex,
      partidoId,
      partido: { ...partido }
    };
  };

  // Guardar resultado
  const guardarResultado = async (datosResultado) => {
    const { rondaIndex, partidoId, partido } = modalPartido.value;

    try {
      const ronda = partidosStore.torneo.rondas[rondaIndex];
      const faseId = partido.fase_id || ronda.fase_id;

      if (!faseId) {
        throw new Error('No se encontró fase_id en el partido ni en la ronda');
      }

      await partidosStore.finalizarPartido(
        partidoId,
        faseId,
        datosResultado.puntos_equipo_1,
        datosResultado.puntos_equipo_2,
        datosResultado.ganador_id,
        datosResultado.perdedor_id
      );

      // Actualizar estado local
      const partidoLocal = ronda.partidos.find(p => p.detalle_partido_id === partidoId);

      if (partidoLocal) {
        partidoLocal.resultado = {
          equipo1: datosResultado.puntos_equipo_1,
          equipo2: datosResultado.puntos_equipo_2
        };
        partidoLocal.estado = 'finalizado';
        partidoLocal.estado_id = 2;

        // Determinar ganador
        if (datosResultado.puntos_equipo_1 > datosResultado.puntos_equipo_2) {
          partidoLocal.ganador = {
            id_equipo: partidoLocal.equipo_1_id,
            nombre_equipo: partidoLocal.equipo_1_nombre,
            ciclo: partidoLocal.equipo_1_ciclo
          };
        } else {
          partidoLocal.ganador = {
            id_equipo: partidoLocal.equipo_2_id,
            nombre_equipo: partidoLocal.equipo_2_nombre,
            ciclo: partidoLocal.equipo_2_ciclo
          };
        }
      }

      cerrarModal();
      alert('¡Resultado guardado exitosamente!');
    } catch (error) {
      console.error('❌ Error al guardar resultado:', error);
      alert('Error al guardar resultado: ' + error.message);
    }
  };

  // Completar fase
  const completarFase = async (rondaIndex) => {
    try {
      if (!confirm('¿Crear enfrentamientos para la siguiente fase?')) {
        return;
      }

      const ronda = partidosStore.torneo.rondas[rondaIndex];

      if (!ronda || !ronda.fase_id) {
        throw new Error('No se encontró la fase actual');
      }

      const resultado = await partidosStore.avanzarRonda(
        deporteSeleccionado.value.valor,
        ronda.fase_id
      );

      // Verificar si el torneo finalizó
      if (resultado.torneo_finalizado) {
        partidosStore.torneo.estado = 'finalizado';
        partidosStore.torneo.campeón = {
          id_equipo: resultado.campeon.id,
          nombre_equipo: resultado.campeon.nombre,
          ciclo: resultado.campeon.ciclo
        };

        alert(`🏆 ¡Torneo finalizado!\n\nCampeón: ${resultado.campeon.nombre} (${resultado.campeon.ciclo})`);
        return;
      }

      // Recargar datos del torneo
      await partidosStore.obtenerTorneo(deporteSeleccionado.value.valor);

      alert(`Ronda avanzada exitosamente. ${resultado.partidos_nuevos?.length || 0} nuevos enfrentamientos creados.`);
    } catch (error) {
      console.error('❌ Error al avanzar ronda:', error);
      alert('Error al avanzar ronda: ' + error.message);
    }
  };

  // Cerrar modal
  const cerrarModal = () => {
    modalPartido.value = {
      visible: false,
      rondaIndex: null,
      partidoId: null,
      partido: null
    };
  };

  // LocalStorage helpers
  const guardarSeleccionDeporte = (deporte) => {
    localStorage.setItem('ultimoDeporteSeleccionado', deporte.valor.toString());
  };

  const cargarUltimoDeporte = () => {
    const ultimoDeporte = localStorage.getItem('ultimoDeporteSeleccionado');
    if (ultimoDeporte) {
      const deporte = deportes.value.find(d => d.valor.toString() === ultimoDeporte);
      if (deporte) {
        seleccionarDeporte(deporte);
      }
    }
  };

  // Lifecycle
  onMounted(() => {
    cargarUltimoDeporte();
  });

  return {
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
  };
};
