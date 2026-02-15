<script setup lang="ts">
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const route = useRoute();
const splitText = ref();
const title = computed(() => {
  return route.path == "/"
    ? "Главная"
    : route.query.id
      ? "Редактирование"
      : "Добавление";
});

watch(title, async () => {
  await nextTick();
  let split = SplitText.create(splitText.value, {
    type: "chars,words,lines",
  });
  gsap.from(split.chars, {
    x: 150,
    opacity: 0,
    duration: 0.7,
    ease: "power4",
    stagger: 0.04,
  });
});
</script>

<template>
  <header class="header">
    <div :key="title" class="header-title" ref="splitText">
      {{ title }}
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #cbcbcb;

  &-title {
    font-size: 20px;
  }
}
</style>
