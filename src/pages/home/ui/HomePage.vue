<script setup lang="ts">
import { useTodoStore } from "@/shared/store/todoStore";
import { storeToRefs } from "pinia";
import { Todo } from "@/entites";

const { todos } = storeToRefs(useTodoStore());
const router = useRouter();

function deleteTodo(id: number) {
  todos.value = todos.value.filter((el) => el.id != id);
}
</script>

<template>
  <div class="home-page">
    <div class="home-page-title">Cписок задач</div>
    <div @click="router.push('/todo')" class="home-page-add">
      Добавить задачу
    </div>

    <TransitionGroup tag="div" name="list" class="home-page-todos">
      <Todo
        v-for="todo in todos"
        :key="`todo-${todo.id}`"
        :todo="todo"
        @delete="deleteTodo"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  &-title {
    font-size: 30px;
  }

  &-add {
    transition: all 0.2s ease-out;
    cursor: pointer;

    &:hover {
      color: rgb(0, 226, 0);
    }

    &:active {
      transform: translateY(-3px);
    }
  }

  &-todos {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    gap: 20px;
    position: relative;
  }
}
</style>
