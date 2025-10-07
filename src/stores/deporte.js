// src/stores/inscripciones.js
import { defineStore } from "pinia";

export const useOpcionesDeporte = defineStore("opciones", {
  state: () => ({
    ciclos: [
      { valor: 1, etiqueta: "I", imagen: "/images/ciclo/1.webp" },
      { valor: 2, etiqueta: "II", imagen: "/images/ciclo/2.webp" },
      { valor: 3, etiqueta: "III", imagen: "/images/ciclo/3.webp" },
      { valor: 4, etiqueta: "IV", imagen: "/images/ciclo/4.webp" },
      { valor: 5, etiqueta: "V", imagen: "/images/ciclo/5.webp" },
      { valor: 6, etiqueta: "VI", imagen: "/images/ciclo/6.webp" },
      { valor: 7, etiqueta: "VII", imagen: "/images/ciclo/7.webp" },
      { valor: 8, etiqueta: "VIII", imagen: "/images/ciclo/8.webp" },
      { valor: 9, etiqueta: "IX", imagen: "/images/ciclo/9.webp" },
      { valor: 10, etiqueta: "X", imagen: "/images/ciclo/10.webp" },
    ],
    deportes: [
      { valor: 1, etiqueta: 'Fútsal', icono: 'fas fa-futbol' },
      { valor: 3, etiqueta: 'Vóley', icono: 'fa-solid fa-volleyball' },
      { valor: 4, etiqueta: 'Ajedrez', icono: 'fa-solid fa-chess' },
      { valor: 5, etiqueta: 'Gincana', icono: 'fas fa-puzzle-piece' }
    ],
    fasesTorneo: [
      { valor: 5, etiqueta: 'Ronda 1', orden: 0 },
      { valor: 1, etiqueta: 'Octavos', orden: 1 },
      { valor: 2, etiqueta: 'Cuartos', orden: 2 },
      { valor: 3, etiqueta: 'Semifinal', orden: 3 },
      { valor: 4, etiqueta: 'Final', orden: 4 }
    ],
    estadosPartido: [
      { valor: 1, etiqueta: 'Pendiente' },
      { valor: 2, etiqueta: 'Finalizado' },
      { valor: 3, etiqueta: 'Cancelado' },
      { valor: 4, etiqueta: 'Postergado' },
      { valor: 5, etiqueta: 'En curso' },
    ],
  }),
  getters: {
    obtenerCiclos: (state) => state.ciclos,
    obtenerDeportes: (state) => state.deportes,
    obtenerFasesTorneo: (state) => state.fasesTorneo,
    obtenerEstadosPartido: (state) => state.estadosPartido,
  }
});
