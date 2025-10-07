import { ref, watch, nextTick, computed } from 'vue'
import { useOpcionesDeporte } from '@/stores/deporte'

export function useInscripcionesEquipo(modelValue, emit) {
  const opcionesStore = useOpcionesDeporte()

  const formularioLocal = ref({ ...modelValue.value })

  const opcionesCiclos = computed(() => opcionesStore.obtenerCiclos)
  const opcionesDeportes = computed(() => opcionesStore.obtenerDeportes)

  // Bandera para evitar ciclos infinitos
  let actualizandoDesdeProps = false

  // Observador para emitir cambios al componente padre
  watch(formularioLocal, (valorNuevo) => {
    if (!actualizandoDesdeProps) {
      emit('update:modelValue', valorNuevo)
    }
  }, { deep: true })

  // Observador para actualizar el valor local cuando cambia el prop
  watch(() => modelValue.value, (valorNuevo) => {
    actualizandoDesdeProps = true
    formularioLocal.value = { ...valorNuevo }
    // Resetear la bandera en el siguiente tick
    nextTick(() => {
      actualizandoDesdeProps = false
    })
  }, { deep: true })

  const esFormularioCompleto = computed(() => {
    return formularioLocal.value.ciclo &&
           formularioLocal.value.email &&
           formularioLocal.value.celular &&
           formularioLocal.value.nombreGrupo &&
           formularioLocal.value.deporte
  })

  return {
    formularioLocal,
    opcionesCiclos,
    opcionesDeportes,
    esFormularioCompleto
  }
}