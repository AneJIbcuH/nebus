import { defineStore } from "pinia";
import { ref } from "vue";
import type { Todo } from "../types/types";
import { KEY_TODO } from "../consts/consts";

export const useTodoStore = defineStore("todo", () => {
  const todos = ref<Todo[]>([
    {
      id: 1,
      name: "Подготовить отчёт по проекту",
      notes: [
        {
          idNote: 101,
          text: "Собрать данные за прошлый месяц",
          done: true,
        },
        { idNote: 102, text: "Сделать диаграммы в Excel", done: false },
        { idNote: 103, text: "Написать выводы", done: false },
      ],
    },
    {
      id: 2,
      name: "Купить продукты",
      notes: [
        { idNote: 201, text: "Молоко", done: false },
        { idNote: 202, text: "Хлеб", done: true },
        { idNote: 203, text: "Яйца", done: false },
        { idNote: 204, text: "Сыр", done: false },
      ],
    },
    {
      id: 3,
      name: "Уборка в квартире",
      notes: [
        { idNote: 301, text: "Пропылесосить", done: false },
        { idNote: 302, text: "Помыть полы", done: false },
        { idNote: 303, text: "Вытереть пыль", done: true },
      ],
    },
    {
      id: 4,
      name: "Изучить Nuxt 4",
      notes: [
        {
          idNote: 401,
          text: "Посмотреть документацию по Server Components",
          done: true,
        },
        { idNote: 402, text: "Попробовать FSD + Nuxt 4", done: true },
        { idNote: 403, text: "Написать тестовый проект", done: false },
        { idNote: 404, text: "Сравнить с Nuxt 3", done: false },
      ],
    },
    {
      id: 5,
      name: "Спортзал",
      notes: [
        { idNote: 501, text: "Разминка 10 мин", done: true },
        { idNote: 502, text: "Жим лёжа 3×10", done: false },
        { idNote: 503, text: "Приседания 3×12", done: false },
        { idNote: 504, text: "Растяжка", done: false },
      ],
    },
  ]);

  onMounted(() => {
    todos.value = JSON.parse(localStorage.getItem(KEY_TODO) ?? "null");
  });

  watch(
    todos,
    () => {
      localStorage.setItem(KEY_TODO, JSON.stringify(todos.value));
    },
    { deep: true },
  );

  return {
    todos,
  };
});
