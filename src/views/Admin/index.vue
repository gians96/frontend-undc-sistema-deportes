<template>
  <div class="dashboard">
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p class="text-gray-600">Panel principal de administración</p>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="bg-blue-500 p-3 rounded-lg">
            <i class="fa-solid fa-users text-white"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-900">Inscripciones</h3>
            <p class="text-2xl font-bold text-blue-600">124</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="bg-green-500 p-3 rounded-lg">
            <i class="fa-solid fa-receipt text-white"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-900">Vouchers</h3>
            <p class="text-2xl font-bold text-green-600">89</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="bg-purple-500 p-3 rounded-lg">
            <i class="fa-solid fa-futbol text-white"></i>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-900">Partidos</h3>
            <p class="text-2xl font-bold text-purple-600">15</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent activity -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">Actividad Reciente</h2>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div class="flex items-center p-4 bg-gray-50 rounded-lg">
            <div class="bg-green-100 p-2 rounded-full">
              <i class="fa-solid fa-check text-green-600"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-900">Nueva inscripción aprobada</p>
              <p class="text-xs text-gray-500">Hace 2 minutos</p>
            </div>
          </div>

          <div class="flex items-center p-4 bg-gray-50 rounded-lg">
            <div class="bg-blue-100 p-2 rounded-full">
              <i class="fa-solid fa-upload text-blue-600"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-900">Voucher subido</p>
              <p class="text-xs text-gray-500">Hace 5 minutos</p>
            </div>
          </div>

          <div class="flex items-center p-4 bg-gray-50 rounded-lg">
            <div class="bg-purple-100 p-2 rounded-full">
              <i class="fa-solid fa-calendar text-purple-600"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-900">Partido programado</p>
              <p class="text-xs text-gray-500">Hace 10 minutos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AdminLayout from '../../layouts/AdminLayout.vue'

defineOptions({
  layout: AdminLayout
})
</script>

<style scoped>
.dashboard {
  max-width: 7xl;
}
</style>