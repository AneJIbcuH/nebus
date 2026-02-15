<script setup lang="ts">
import type { Todo } from "@/shared/types/types";
import { DeleteIcon, EditIcon } from "@/shared/assets/icons";
import { Modal } from "@/shared/ui";

const { todo } = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  (e: "delete", id: number): void;
}>();
const router = useRouter();
const isOpen = ref(false);

function deleteTodo() {
  emit("delete", todo.id);
  isOpen.value = false;
}

function editTodo() {
  router.push({
    name: "todo",
    query: { id: todo.id },
  });
}
</script>

<template>
  <div class="todo">
    <div class="todo-top">
      <div class="todo-top-name">{{ todo.name || "Нет названия" }}</div>
      <EditIcon @click="editTodo" class="icon icon-orange" />
      <DeleteIcon @click="isOpen = true" class="icon icon-red" />
    </div>
    <div class="todo-list">
      <div
        v-for="item in todo.notes.slice(0, 2)"
        v-show="item.text"
        :class="['todo-list-item', { 'done-item': item.done }]"
      >
        &bull;{{ item.text }}
      </div>
    </div>
    <Modal v-model="isOpen">
      <div class="todo-modal">
        <div class="todo-modal-question">Точно удалить?</div>
        <div @click="deleteTodo" class="icon icon-green">Да</div>
        <div @click="isOpen = false" class="icon icon-red">Отмена</div>
      </div>
    </Modal>
  </div>
</template>

<style scoped lang="scss">
.todo {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  padding: 15px;
  background: #fffff8;
  overflow: hidden;

  &-top {
    display: grid;
    grid-template-columns: auto 30px 30px;
    align-items: center;

    &-name {
      font-size: 18px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .icon {
      justify-self: end;
    }
  }

  &-list {
    width: 100%;

    &-item {
      opacity: 0.7;

      &.done-item {
        text-decoration: line-through;
        filter: blur(1px);
      }
    }
  }

  &-modal {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;
    gap: 20px;
    padding: 20px;

    &-question {
      width: 100%;
      font-size: 20px;
      font-weight: 600;
    }
  }
}
</style>
