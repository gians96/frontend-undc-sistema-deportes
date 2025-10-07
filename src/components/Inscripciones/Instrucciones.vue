<template>
  <div class="flex items-start gap-3">
    <div
      class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
    >
      <span class="text-white text-xs font-bold">i</span>
    </div>
    <div>
      <h6 class="text-blue-400 font-semibold mb-2">Instrucciones de pago:</h6>
      <ul class="text-gray-300 text-sm space-y-1">
        <li>1. Realiza el pago de S/ 30.00 al número indicado</li>
        <li>2. Guarda el comprobante de pago</li>
        <li>3. Sube la imagen del comprobante en la sección correspondiente</li>
        <li>4. Completa y envía el formulario de inscripción</li>
        <li>5. Recibirás una confirmación por email</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Insctrucciones"
}
</script>
