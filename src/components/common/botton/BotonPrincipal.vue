<template>
  <div class="">
    <button
      @click="handleClick"
      :class="className"
      class="th-btn"
      :disabled="disabled"
      :type="tipo"
    >
      <i v-if="icon" :class="[icon, 'me-1']"></i>
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'BotonPrincipal',
  props: {
    text: {
      type: String,
      default: 'Live Streaming'
    },
    icon: {
      type: String,
      default: 'fa-brands fa-twitch'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tipo: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },
    className: {
      type: String,
      default: ''
    }
  },
  emits: ['click'],
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit('click', event);
      }
    }
  }
}
</script>

<style>

.me-1 {
  margin-right: 0.25rem;
}

.th-btn {
  position: relative;
  z-index: 2;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #44f883;
  color: #0B0E13;
  font-size: 16px;
  font-weight: 700;
  font-family: 'Rajdhani', sans-serif;
  padding: 10px 30px;
  min-width: 200px;
  border: none;
  cursor: pointer;
  clip-path: polygon(15px 0%, calc(100% - 15px) 0%, 100% 50%, calc(100% - 15px) 100%, 15px 100%, 0% 50%);
  transition: clip-path 0.2s ease-in-out;
  text-decoration: none;
  outline: none;
}

.th-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.th-btn:before,
.th-btn:after {
  content: "";
  position: absolute;
  background-color: #0B0E13;
  z-index: -1;
  width: 16px;
  height: calc(100% - 10px);
  clip-path: polygon(85% 0, 100% 0, 15% 50%, 100% 100%, 85% 100%, 0% 50%);
  transition: all 0.2s ease-in-out;
}

.th-btn:before {
  top: 5px;
  left: 5px;
}

.th-btn:after {
  top: 50%;
  right: 5px;
  transform: translateY(-50%) rotate(180deg);
}

/* Hover: transformar a rectángulo con esquinas L y cambio de color */
.th-btn:hover:not(:disabled) {
  clip-path: polygon(0 0, 100% 0, 100% 0%, 100% 100%, 0% 100%, 0% 0%);
  background-color: #ffffff;
}

/* Esquina superior izquierda - forma de L con puntas triangulares alargadas */
.th-btn:hover:not(:disabled):before {
  width: 25px;
  height: 25px;
  top: 3px;
  left: 3px;
  transform: none;
  clip-path: polygon(0 0, 100% 0, 100% 15%, 15% 15%, 15% 100%, 0 100%);
}

/* Esquina inferior derecha - forma de L invertida con puntas triangulares alargadas */
.th-btn:hover:not(:disabled):after {
  width: 25px;
  height: 25px;
  top: auto;
  bottom: 3px;
  right: 3px;
  transform: translateY(0) rotate(180deg);
  clip-path: polygon(0 0, 100% 0, 100% 15%, 15% 15%, 15% 100%, 0 100%);
}
</style>