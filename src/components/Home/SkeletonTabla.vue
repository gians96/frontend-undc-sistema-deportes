<template>
  <div class="bg-oscuro-800 rounded-2xl shadow-2xl border border-oscuro-600 overflow-hidden animate-pulse">
    <!-- Header skeleton -->
    <div class="bg-oscuro-700/50 p-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-oscuro-600 rounded-xl"></div>
          <div>
            <div class="w-48 h-6 bg-oscuro-600 rounded mb-2"></div>
            <div class="w-32 h-4 bg-oscuro-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla skeleton -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-oscuro-900/50 border-b border-oscuro-600">
          <tr>
            <th class="px-4 py-3">
              <div class="w-12 h-4 bg-oscuro-600 rounded"></div>
            </th>
            <th class="px-4 py-3">
              <div class="w-24 h-4 bg-oscuro-600 rounded"></div>
            </th>
            <th class="px-4 py-3">
              <div class="w-8 h-4 bg-oscuro-600 rounded mx-auto"></div>
            </th>
            <th class="px-4 py-3 hidden sm:table-cell">
              <div class="w-8 h-4 bg-oscuro-600 rounded mx-auto"></div>
            </th>
            <th class="px-4 py-3 hidden sm:table-cell">
              <div class="w-8 h-4 bg-oscuro-600 rounded mx-auto"></div>
            </th>
            <th class="px-4 py-3 hidden sm:table-cell">
              <div class="w-8 h-4 bg-oscuro-600 rounded mx-auto"></div>
            </th>
            <th class="px-4 py-3 hidden md:table-cell">
              <div class="w-8 h-4 bg-oscuro-600 rounded mx-auto"></div>
            </th>
            <th class="px-4 py-3 hidden md:table-cell">
              <div class="w-8 h-4 bg-oscuro-600 rounded mx-auto"></div>
            </th>
            <th class="px-4 py-3">
              <div class="w-8 h-4 bg-oscuro-600 rounded mx-auto"></div>
            </th>
            <th class="px-4 py-3">
              <div class="w-12 h-4 bg-oscuro-600 rounded mx-auto"></div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-oscuro-700">
          <!-- 5 filas skeleton -->
          <tr v-for="i in 5" :key="i" class="hover:bg-oscuro-700/50">
            <td class="px-4 py-4">
              <div class="w-8 h-8 bg-oscuro-600 rounded-lg"></div>
            </td>
            <td class="px-4 py-4">
              <div class="w-40 h-5 bg-oscuro-600 rounded"></div>
            </td>
            <td class="px-4 py-4">
              <div class="w-8 h-5 bg-oscuro-600 rounded mx-auto"></div>
            </td>
            <td class="px-4 py-4 hidden sm:table-cell">
              <div class="w-8 h-5 bg-oscuro-600 rounded mx-auto"></div>
            </td>
            <td class="px-4 py-4 hidden sm:table-cell">
              <div class="w-8 h-5 bg-oscuro-600 rounded mx-auto"></div>
            </td>
            <td class="px-4 py-4 hidden sm:table-cell">
              <div class="w-8 h-5 bg-oscuro-600 rounded mx-auto"></div>
            </td>
            <td class="px-4 py-4 hidden md:table-cell">
              <div class="w-8 h-5 bg-oscuro-600 rounded mx-auto"></div>
            </td>
            <td class="px-4 py-4 hidden md:table-cell">
              <div class="w-8 h-5 bg-oscuro-600 rounded mx-auto"></div>
            </td>
            <td class="px-4 py-4">
              <div class="w-12 h-6 bg-oscuro-600 rounded-md mx-auto"></div>
            </td>
            <td class="px-4 py-4">
              <div class="w-10 h-10 bg-oscuro-600 rounded-lg mx-auto"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer skeleton -->
    <div class="bg-oscuro-900/30 px-6 py-4 border-t border-oscuro-700">
      <div class="flex flex-wrap gap-4">
        <div class="w-32 h-4 bg-oscuro-600 rounded"></div>
        <div class="w-32 h-4 bg-oscuro-600 rounded"></div>
        <div class="w-32 h-4 bg-oscuro-600 rounded"></div>
        <div class="w-32 h-4 bg-oscuro-600 rounded"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
