import { ref, watch, nextTick, computed } from "vue";
import { useOpcionesDeporte } from "@/stores/deporte";

export function useInscripcionesEquipo(modelValue, emit) {
  const opcionesStore = useOpcionesDeporte();

  const formularioLocal = ref({ ...modelValue.value });

  const opcionesCiclos = computed(() => opcionesStore.obtenerCiclos);

  const opcionesDeportes = computed(() => {
    const todosLosDeportes = opcionesStore.obtenerDeportes;
    if (formularioLocal.value.tipoPago === "basket") {
      return todosLosDeportes.filter((d) => d.tipo === "basket");
    } else {
      return todosLosDeportes.filter((d) => !d.tipo);
    }
  });

  watch(
    () => formularioLocal.value.tipoPago,
    (nuevoTipo) => {
      const todosLosDeportes = opcionesStore.obtenerDeportes;
      if (nuevoTipo === "basket") {
        const deporteBasket = todosLosDeportes.find((d) => d.tipo === "basket");
        if (deporteBasket) {
          formularioLocal.value.deporte = deporteBasket.valor;
        }
      } else {
        // Si el deporte seleccionado era basket, limpiarlo
        const deporteActual = todosLosDeportes.find(
          (d) => d.valor === formularioLocal.value.deporte
        );
        if (deporteActual && deporteActual.tipo === "basket") {
          formularioLocal.value.deporte = "";
        }
      }
    }
  );

  // Bandera para evitar ciclos infinitos
  let actualizandoDesdeProps = false;

  // Observador para emitir cambios al componente padre
  watch(
    formularioLocal,
    (valorNuevo) => {
      if (!actualizandoDesdeProps) {
        emit("update:modelValue", valorNuevo);
      }
    },
    { deep: true }
  );

  // Observador para actualizar el valor local cuando cambia el prop
  watch(
    () => modelValue.value,
    (valorNuevo) => {
      actualizandoDesdeProps = true;
      formularioLocal.value = { ...valorNuevo };
      // Resetear la bandera en el siguiente tick
      nextTick(() => {
        actualizandoDesdeProps = false;
      });
    },
    { deep: true }
  );

  const esFormularioCompleto = computed(() => {
    return (
      formularioLocal.value.ciclo &&
      formularioLocal.value.email &&
      formularioLocal.value.celular &&
      formularioLocal.value.nombreGrupo &&
      formularioLocal.value.deporte
    );
  });

  const deporteSeleccionado = computed(() => {
    const deporte = opcionesStore.obtenerDeportes.find(
      (d) => d.valor === parseInt(formularioLocal.value.deporte)
    );
    return deporte;
  });

  const limiteJugadores = computed(() => {
    const limite = deporteSeleccionado.value?.maxJugadores || 33;
    return limite;
  });

  return {
    formularioLocal,
    opcionesCiclos,
    opcionesDeportes,
    esFormularioCompleto,
    deporteSeleccionado,
    limiteJugadores,
  };
}
