<script setup lang="ts">
const isOpen = defineModel({ type: Boolean, required: true });
</script>

<template>
  <transition name="modal-animation">
    <div v-if="isOpen" :class="['modal']">
      <slot></slot>
    </div>
  </transition>
  <transition name="modal-overlay">
    <div @click="isOpen = false" class="modal-overlay" v-if="isOpen"></div>
  </transition>
</template>

<style scoped lang="scss">
.modal {
  background: white;
  position: fixed;
  z-index: 6;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  will-change: auto;
}

.modal-overlay {
  position: fixed;
  z-index: 5;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
}

.modal-overlay-enter-active,
.modal-overlay-leave-active {
  transition: all 0.4s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-overlay-enter-from,
.modal-overlay-leave-to {
  opacity: 0;
}

.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: all 0.4s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
  transform: translate(-50%, -1000px);
  filter: blur(30px);
}
</style>
