<script setup lang="ts">
import { Header } from "@/widgets/header";
</script>

<template>
  <div class="layout">
    <Header />
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
  padding: 20px 10px;
  background: rgb(241, 241, 241);
}
</style>
