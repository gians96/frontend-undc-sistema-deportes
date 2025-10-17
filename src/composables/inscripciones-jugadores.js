import { computed, watch, isRef } from "vue";

export function useInscripcionesJugadores(jugadores, emit, limiteJugadores) {

  // Si es ref o computed, usarlo directamente, sino crear computed
  const limite = computed(() => {
    const valorLimite = isRef(limiteJugadores) ? limiteJugadores.value : limiteJugadores;
    return valorLimite || 33;
  });

  // Watch para monitorear cambios en el límite
  watch(limite, () => {
  }, { immediate: true });

  const agregarJugador = () => {
    if (jugadores.value.length < limite.value) {
      const isFirstPlayer = jugadores.value.length === 0;
      const nuevosJugadores = [
        ...jugadores.value,
        {
          nombre: "",
          apellido: "",
          dni: "",
          codigo: "",
          rol: isFirstPlayer ? "capitan" : "titular",
          sexo: "masculino",
          expanded: true,
        },
      ];
      emit("update:modelValue", nuevosJugadores);
    }
  };

  const eliminarJugador = (index) => {
    const nuevosJugadores = [...jugadores.value];
    nuevosJugadores.splice(index, 1);
    emit("update:modelValue", nuevosJugadores);
  };

  const toggleJugador = (index) => {
    const nuevosJugadores = [...jugadores.value];
    nuevosJugadores[index].expanded = !nuevosJugadores[index].expanded;
    emit("update:modelValue", nuevosJugadores);
  };

  const actualizarJugador = (index, campo, valor) => {
    const nuevosJugadores = [...jugadores.value];
    nuevosJugadores[index][campo] = valor;
    emit("update:modelValue", nuevosJugadores);
  };

  const isJugadorComplete = (jugador) => {
    return (
      jugador.nombre &&
      jugador.apellido &&
      jugador.dni &&
      jugador.codigo &&
      jugador.rol &&
      jugador.sexo
    );
  };

  const todosJugadoresCompletos = computed(() => {
    return (
      jugadores.value.length > 0 &&
      jugadores.value.every((jugador) => isJugadorComplete(jugador))
    );
  });

  const cantidadJugadores = computed(() => jugadores.value.length);

  const puedeAgregarJugador = computed(() => {
    const puede = jugadores.value.length < limite.value;
    return puede;
  });

  // Watch para monitorear cambios en puedeAgregarJugador
  watch(puedeAgregarJugador, (nuevoValor, viejoValor) => {
    console.log('🔀 puedeAgregarJugador cambió de', viejoValor, 'a:', nuevoValor);
  }, { immediate: true });

  return {
    // Metodos
    agregarJugador,
    eliminarJugador,
    toggleJugador,
    actualizarJugador,
    isJugadorComplete,

    // Computed properties
    todosJugadoresCompletos,
    cantidadJugadores,
    puedeAgregarJugador,
    limite,
  };
}