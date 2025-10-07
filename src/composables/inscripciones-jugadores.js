import { computed } from 'vue'

export function useInscripcionesJugadores(jugadores, emit) {

  const agregarJugador = () => {
    if (jugadores.value.length < 16) {
      const isFirstPlayer = jugadores.value.length === 0
      const nuevosJugadores = [...jugadores.value, {
        nombre: '',
        apellido: '',
        dni: '',
        codigo: '',
        rol: isFirstPlayer ? 'capitan' : 'titular',
        sexo: 'masculino',
        expanded: true,
      }]
      emit('update:modelValue', nuevosJugadores)
    }
  }

  const eliminarJugador = (index) => {
    const nuevosJugadores = [...jugadores.value]
    nuevosJugadores.splice(index, 1)
    emit('update:modelValue', nuevosJugadores)
  }

  const toggleJugador = (index) => {
    const nuevosJugadores = [...jugadores.value]
    nuevosJugadores[index].expanded = !nuevosJugadores[index].expanded
    emit('update:modelValue', nuevosJugadores)
  }

  const actualizarJugador = (index, campo, valor) => {
    const nuevosJugadores = [...jugadores.value]
    nuevosJugadores[index][campo] = valor
    emit('update:modelValue', nuevosJugadores)
  }

  const isJugadorComplete = (jugador) => {
    return jugador.nombre &&
           jugador.apellido &&
           jugador.dni &&
           jugador.codigo &&
           jugador.rol &&
           jugador.sexo
  }

  const todosJugadoresCompletos = computed(() => {
    return jugadores.value.length > 0 &&
           jugadores.value.every(jugador => isJugadorComplete(jugador))
  })

  const cantidadJugadores = computed(() => jugadores.value.length)

  const puedeAgregarJugador = computed(() => jugadores.value.length < 16)

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
    puedeAgregarJugador
  }
}