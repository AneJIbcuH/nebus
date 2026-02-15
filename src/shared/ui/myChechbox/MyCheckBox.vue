<script setup lang="ts">
const model = defineModel({ required: true });
</script>

<template>
  <label class="checkbox">
    <input type="checkbox" v-model="model" class="checkbox-input" />
    <span class="checkbox-custom"></span>
  </label>
</template>

<style scoped lang="scss">
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-custom {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  background: white;
  transition: all 0.2s;
  position: relative;
}

.checkbox-input:checked + .checkbox-custom {
  background: #1bff5c;
  border-color: #1bff5c;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
