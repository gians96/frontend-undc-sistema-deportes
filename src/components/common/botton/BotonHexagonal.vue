<template>
  <button 
    class="hexagon-btn"
    @click="handleClick"
  >
    <span>{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'BotonHexagonal',
  props: {
    text: {
      type: String,
      default: 'Click aquí!'
    },
    href: {
      type: String,
      default: null
    },
    action: {
      type: Function,
      default: null
    }
  },
  emits: ['click'],
  methods: {
    handleClick(event) {
      // Efecto visual de click
      event.target.style.transform = 'scale(0.95)';
      setTimeout(() => {
        event.target.style.transform = 'scale(1)';
      }, 150);

      // Si hay una función personalizada, ejecutarla
      if (this.action) {
        this.action();
        return;
      }

      // Si hay un href, navegar
      if (this.href) {
        // Para enlaces externos
        if (this.href.startsWith('http')) {
          window.open(this.href, '_blank');
        } else {
          // Para navegación interna con Vue Router
          this.$router.push(this.href);
        }
        return;
      }

      // Emitir evento click personalizado
      this.$emit('click', event);
    }
  }
}
</script>

<style scoped>
.hexagon-btn {
  position: relative;
  background: transparent;
  border: none;
  color: white;
  font-weight: 800;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
}

.hexagon-btn span {
  position: relative;
  z-index: 1;
  display: flex;
  padding: 14px 30px;
}

/* Hexágono con borde usando clip-path doble */
.hexagon-btn span:before {
  content: "";
  position: absolute;
  inset: 0;
  background: white;
  opacity: 0.15;
  z-index: -1;
  transition: 0.4s;
  clip-path: polygon(
    18px 0, 100% 0, 100% calc(100% - 18px), 
    calc(100% - 18px) 100%, 0 100%, 0 18px, 
    18px 0, 18px 1px, 1px 18px, 1px calc(100% - 1px), 
    calc(100% - 18px) calc(100% - 1px), 
    calc(100% - 1px) calc(100% - 18px), 
    calc(100% - 1px) 1px, 18px 1px
  );
}

.hexagon-btn span:after {
  content: "";
  position: absolute;
  inset: 1px;
  background: white;
  opacity: 0.06;
  z-index: -1;
  transition: 0.4s;
  clip-path: polygon(
    18px 0, 100% 0, 100% calc(100% - 18px), 
    calc(100% - 18px) 100%, 0 100%, 0 18px
  );
}

/* Cuadrados verdes en las esquinas */
.hexagon-btn:before,
.hexagon-btn:after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  background: #10B981;
  z-index: 2;
  transition: 0.4s;
}

.hexagon-btn:before {
  top: 5px;
  left: 5px;
}

.hexagon-btn:after {
  bottom: 5px;
  right: 5px;
}

/* Hover effects */
.hexagon-btn:hover {
  color: #111827;
}

.hexagon-btn:hover span:after {
  opacity: 1;
}

.hexagon-btn:hover:before,
.hexagon-btn:hover:after {
  background: #10B981;
}
</style>