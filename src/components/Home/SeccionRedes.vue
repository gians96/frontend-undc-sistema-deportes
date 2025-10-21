<template>
  <section class="py-20 bg-oscuro-950 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-oscuro-800 to-oscuro-900 z-10"></div>
    <div class="absolute -top-1/2 -left-1/4 w-full h-full bg-radial-gradient-green opacity-10 animate-pulse-slow"></div>
    <div class="absolute -bottom-1/2 -right-1/4 w-full h-full bg-radial-gradient-green opacity-10 animate-pulse-slow delay-2000"></div>

    <div class="container mx-auto px-4 relative z-20">
      <div class="text-center mb-12">
        <p class="text-xs md:text-sm lg:text-xl font-bold text-green-400 uppercase tracking-widest">
          Contáctanos
        </p>
        <h2 class="text-3xl md:text-4xl lg:text-6xl font-black text-white mt-2 uppercase titulo">
          Mantente conectado
        </h2>
        <div class="flex justify-center mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="65" height="5" viewBox="0 0 65 5">
            <path d="M968,5630h65l-4,5H972Z" transform="translate(-968 -5630)" fill="#68fb9a"></path>
          </svg>
        </div>
      </div>
      <div class="flex flex-wrap justify-center gap-8">
        <BotonRedes
          v-for="red in redes"
          :key="red.texto"
          :href="red.href"
          :icono="red.icono"
          :texto="red.texto"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import BotonRedes from "./BotonRedes.vue";

const redes = [
  {
    href: "https://www.facebook.com/FIUNDC",
    icono: "fa-brands fa-facebook-f",
    texto: "Facebook",
  },
  {
    href: "#",
    icono: "fa-brands fa-instagram",
    texto: "Instagram",
  },
  {
    href: "https://www.tiktok.com/@fiundc?lang=es",
    icono: "fa-brands fa-tiktok",
    texto: "Tiktok",
  },
  {
    href: "https://github.com/FernandoYZ",
    icono: "fa-brands fa-github",
    texto: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/fernando-yovera-zavala-066904283/",
    icono: "fa-brands fa-linkedin",
    texto: "LinkedIn",
  },
];
</script>

<style scoped>
.titulo {
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(180, 235, 215, 0.3);
}
</style>
