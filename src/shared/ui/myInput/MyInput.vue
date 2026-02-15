<script setup lang="ts">
const model = defineModel({ required: true });

</script>

<template>
  <input v-model.trim="model" v-bind="$attrs" :class="['input']" />
</template>

<style scoped lang="scss">
.input {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 10px;
}
</style>
