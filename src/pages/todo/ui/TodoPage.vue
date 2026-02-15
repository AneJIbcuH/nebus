<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTodoStore } from "@/shared/store/todoStore";
import { useCache } from "@/shared/composables/useCache";
import { MyCheckBox, MyInput, Modal } from "@/shared/ui";
import {
  AddIcon,
  UndoIcon,
  CrossIcon,
  DeleteIcon,
  HomeIcon,
  RedoIcon,
} from "@/shared/assets/icons";
import type { Note, Todo } from "@/shared/types/types";

const { todos } = storeToRefs(useTodoStore());
const router = useRouter();
const route = useRoute();

//модалки
const isOpen = ref(false); // удаление
const isOpenHome = ref(false); // домой

const todoId = Number(route.query.id);
const foundTodo = todos.value.find((el) => el.id === todoId);
const editTodo = reactive<Omit<Todo, "id">>(
  foundTodo
    ? JSON.parse(
        JSON.stringify({
          name: foundTodo.name,
          notes: foundTodo.notes,
        }),
      )
    : { name: "", notes: [] },
);
const { undo, redo, canUndo, canRedo, save } = useCache(editTodo);

function deleteTask(task: Note) {
  editTodo.notes = editTodo.notes.filter((el) => el.idNote != task.idNote);
}

function addTask() {
  editTodo.notes.push({ done: false, idNote: Date.now(), text: "" });
}

function deleteTodo() {
  todos.value = todos.value.filter((el) => el.id != todoId);
  isOpen.value = false;
  setTimeout(() => {
    router.push("/");
  }, 400);
}

function saveTodo() {
  todos.value = todos.value.map((el) => {
    if (el.id == todoId) {
      return { ...el, ...editTodo };
    }
    return el;
  });

  router.push("/");
}

function addTodo() {
  todos.value.push({
    id: Date.now(),
    name: editTodo.name,
    notes: editTodo.notes,
  });

  router.push("/");
}

function toHome() {
  isOpenHome.value = false;
  setTimeout(() => {
    router.push("/");
  }, 400);
}

watch(
  editTodo,
  () => {
    save(editTodo);
  },
  { deep: true },
);
</script>

<template>
  <div class="todo-page">
    <MyInput
      v-model="editTodo.name"
      placeholder="Введите название заметки"
      class="todo-page-name"
    />
    <TransitionGroup tag="div" name="list" class="todo-page-list">
      <div
        v-for="task in editTodo.notes"
        :key="task.idNote"
        :class="['todo-page-list-task', { done: task.done }]"
      >
        <MyCheckBox v-model="task.done" />
        <MyInput v-model="task.text" placeholder="Введите название задачи" />
        <CrossIcon @click="deleteTask(task)" class="icon icon-red" />
      </div>
      <div class="todo-page-list-btns" key="todo-page-list-btns">
        <HomeIcon @click="isOpenHome = true" class="icon icon-orange" />
        <AddIcon @click="addTask" class="icon icon-green" />
        <DeleteIcon
          v-if="todoId"
          @click="isOpen = true"
          class="icon icon-red"
        />
        <UndoIcon
          @click="undo(editTodo)"
          :class="['icon icon-orange', { disabled: !canUndo }]"
        />
        <RedoIcon
          @click="redo(editTodo)"
          :class="['icon icon-green', { disabled: !canRedo }]"
        />
        <div v-if="todoId" @click="saveTodo" class="icon icon-orange">
          Сохранить
        </div>
        <div v-else @click="addTodo" class="icon icon-green">Добавить</div>
      </div>
    </TransitionGroup>
    <Modal v-model="isOpen">
      <div class="modal">
        <div class="modal-question">Удалить Todo список целиком?</div>
        <div @click="deleteTodo" class="icon icon-green">Да</div>
        <div @click="isOpen = false" class="icon icon-red">Отмена</div>
      </div>
    </Modal>
    <Modal v-model="isOpenHome">
      <div class="modal">
        <div class="modal-question">Вернуться на главную страницу?</div>
        <div @click="toHome" class="icon icon-green">Да</div>
        <div @click="isOpenHome = false" class="icon icon-red">Отмена</div>
      </div>
    </Modal>
  </div>
</template>

<style scoped lang="scss">
.todo-page {
  display: grid;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: auto;
  gap: 10px;

  &-list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &-task {
      display: grid;
      grid-template-columns: 40px auto 40px;
      justify-items: center;
      align-items: center;
      transition: all 0.3s ease-out;

      &.done {
        opacity: 0.6;
        filter: blur(1px);
        text-decoration: line-through;
      }
    }

    &-btns {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      gap: 15px;

      .disabled {
        pointer-events: none;
        opacity: 0.5;
      }
    }
  }

  .modal {
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
