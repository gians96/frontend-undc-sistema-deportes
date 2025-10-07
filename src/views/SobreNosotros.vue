<template>
  <div>
    <!-- Header Section -->
    <section class="text-center mb-16">
      <h1 class="text-4xl font-bold text-gray-800 mb-6">Sobre Nosotros</h1>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        Conoce la historia, misión y valores que hacen de UNDC Deportes una institución líder en formación deportiva.
      </p>
    </section>

    <!-- Mission Section -->
    <section class="grid md:grid-cols-2 gap-12 mb-16">
      <div>
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Nuestra Misión</h2>
        <p class="text-lg text-gray-600 mb-4">
          Formar atletas integrales que destaquen no solo en el ámbito deportivo, sino también en los valores humanos y el compromiso social.
        </p>
        <p class="text-gray-600">
          Creemos en el poder transformador del deporte como herramienta de desarrollo personal y comunitario.
        </p>
      </div>
      <div class="bg-blue-50 p-8 rounded-lg">
        <h3 class="text-2xl font-semibold text-blue-800 mb-4">Nuestros Valores</h3>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-center">
            <span class="text-blue-600 mr-2">✓</span>
            Excelencia deportiva
          </li>
          <li class="flex items-center">
            <span class="text-blue-600 mr-2">✓</span>
            Trabajo en equipo
          </li>
          <li class="flex items-center">
            <span class="text-blue-600 mr-2">✓</span>
            Respeto y fair play
          </li>
          <li class="flex items-center">
            <span class="text-blue-600 mr-2">✓</span>
            Compromiso social
          </li>
          <li class="flex items-center">
            <span class="text-blue-600 mr-2">✓</span>
            Desarrollo integral
          </li>
        </ul>
      </div>
    </section>

    <!-- History Section -->
    <section class="bg-gray-50 p-12 rounded-lg mb-16">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">Nuestra Historia</h2>
      <div class="max-w-4xl mx-auto">
        <p class="text-lg text-gray-600 mb-6">
          Fundada en 1985, UNDC Deportes nació con el sueño de crear un espacio donde el deporte y la educación se unieran para formar personas íntegras.
        </p>
        <p class="text-gray-600 mb-6">
          A lo largo de estos años, hemos graduado a cientos de atletas que han destacado tanto en competencias nacionales como internacionales, siempre manteniendo nuestros valores fundamentales.
        </p>
        <p class="text-gray-600">
          Hoy somos una institución reconocida por nuestra excelencia académica y deportiva, con instalaciones de primera categoría y un equipo de profesionales comprometidos con el desarrollo de cada uno de nuestros estudiantes.
        </p>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="mb-16">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Nuestros Logros</h2>
      <div class="grid md:grid-cols-4 gap-8 text-center">
        <div class="bg-white p-6 rounded-lg shadow-md border">
          <div class="text-4xl font-bold text-blue-600 mb-2">35+</div>
          <p class="text-gray-600">Años de experiencia</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md border">
          <div class="text-4xl font-bold text-blue-600 mb-2">500+</div>
          <p class="text-gray-600">Atletas graduados</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md border">
          <div class="text-4xl font-bold text-blue-600 mb-2">15</div>
          <p class="text-gray-600">Disciplinas deportivas</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md border">
          <div class="text-4xl font-bold text-blue-600 mb-2">50+</div>
          <p class="text-gray-600">Trofeos obtenidos</p>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="bg-blue-600 text-white p-12 rounded-lg text-center">
      <h2 class="text-3xl font-bold mb-4">¿Quieres ser parte de nuestra historia?</h2>
      <p class="text-xl mb-8 opacity-90">
        Únete a la familia UNDC Deportes y descubre todo tu potencial.
      </p>
      <router-link
        to="/inscripciones"
        class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
      >
        Comenzar Inscripción
      </router-link>
    </section>
  </div>
</template>

<script setup>
</script>