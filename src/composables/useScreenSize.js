import { ref, onMounted, onUnmounted } from 'vue';

// El breakpoint 'md' de Tailwind es 768px. Usaremos este valor como referencia.
const MOBILE_BREAKPOINT = 768;

export function useScreenSize() {
  const isMobile = ref(window.innerWidth < MOBILE_BREAKPOINT);

  const onResize = () => {
    isMobile.value = window.innerWidth < MOBILE_BREAKPOINT;
  };

  onMounted(() => {
    window.addEventListener('resize', onResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });

  return { isMobile };
}
