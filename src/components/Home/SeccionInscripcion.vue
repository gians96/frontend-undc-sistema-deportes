<template>
  <section class="relative bg-oscuro-800 text-white py-20 overflow-hidden tg">
    <div
      class="absolute inset-0 bg-cover bg-center opacity-10"
      style="background-image: url('/images/pagina_inscripciones.png')"
    ></div>
    <div
      class="absolute inset-0 bg-gradient-to-t from-oscuro-800 via-oscuro-800/80 to-transparent"
    ></div>

    <div class="relative max-w-7xl mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <div class="text-center md:text-left z-10">
          <h2
            class="text-4xl md:text-5xl font-black uppercase tracking-wider mb-4"
          >
            <span class="text-green-400 glow-text">Deja tu huella</span> en la
            Cancha
          </h2>
          <p class="text-oscuro-200 text-lg mb-8 max-w-xl mx-auto md:mx-0">
            Forma tu equipo y participa en los torneos de vóley, futsal, 
            básquet, ajedrez y Gincana. Vive la emoción del deporte en las canchas de la UNDC.
          </p>
          <div class="flex justify-center md:justify-start">
            <BotonHexagonal text="Inscribirse Ahora" href="/inscripciones" />
          </div>
        </div>
        <div class="hidden md:block relative h-full">
          <div
            class="absolute -right-1/2 top-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-gradient-to-t from-oscuro-800 to-black/15 [clip-path:polygon(25%_0%,_100%_0%,_100%_100%,_0%_100%)]"
          ></div>
          <div
            class="absolute w-full h-full flex items-center justify-center"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import BotonHexagonal from "@/components/common/botton/BotonHexagonal.vue";
</script>

<style scoped>
.glow-text {
  text-shadow: 0 0 8px rgba(52, 211, 153, 0.5), 0 0 20px rgba(52, 211, 153, 0.3);
}

.tg:before {
  background: #11131c;
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 67px),
    50% 100%,
    50% 100%,
    0 calc(100% - 67px)
  );
  content: "";
  inset: 0;
  z-index: 50;
}

.tg:after {
  background: var(--color-verde-primario);
  bottom: -0px;
  z-index: 20;
  clip-path: polygon(50% 99%, 100% 0, 100% 40px, 50% 100%, 0 40px, 0 0);
  content: "";
  height: 67px;
  left: 0;
  z-index: 10;
  position: absolute;
  right: 0;
}

.tg {
  position: relative;
}
</style>
