<script setup lang="ts">
import {useTodoStore} from "@/stores/todo";
import {onMounted, ref, computed} from "vue";
import CustomSelect from "@/components/ElementForm/CustomSelect.vue";
import InputText from "@/components/ElementForm/InputText.vue";
import ModalsApp from "@/components/Modals/ModalsApp.vue";
import Close from "@/components/Close.vue";
const todo = useTodoStore()

const selectedStatus = ref<string>('all');
const selectedId = ref<string>('All Users');
const filterTitle = ref<string>('')

onMounted( () => {
  todo.getAllTodoList()
})

const statuses = [
  { id: 1, value: 'all'},
  { id: 2, value: 'completed'},
  { id: 3, value: 'uncompleted'},
  { id: 4, value: 'favorites'}
]

const filteredTodos = computed(() => {
  if (!todo.todoList) {
    return [];
  }

  let filteredByStatus = [...todo.todoList];

  if (selectedId.value !== 'All Users') {
    const userId = parseInt(selectedId.value);
    filteredByStatus = filteredByStatus.filter(todo => todo.userId === userId);
  }

  if (selectedStatus.value !== 'all') {
    filteredByStatus = filteredByStatus.filter(todo => {
      if (selectedStatus.value === 'completed') {
        return todo.completed;
      } else if (selectedStatus.value === 'uncompleted') {
        return !todo.completed;
      } else if (selectedStatus.value === 'favorites') {
        return todo.favorite;
      }

      return true;
    });
  }

  if (filterTitle.value) {
    const str = filterTitle.value.toLowerCase()
    filteredByStatus = filteredByStatus.filter(todo => todo.title.toLowerCase().includes(str));
  }

  return filteredByStatus;
});
</script>

<template>
  <div class="layout__container">
    <div class="container">
      <div class="filter">
        <div class="filter__wrapper">
          <ul class="filter__items">
            <li class="filter__item">
              <CustomSelect
                  v-model:value="selectedStatus"
                  placeholder="Select"
                  label="Status"
                  id="select-statuses"
              >
                <option v-for="item in statuses" :key="item.id" :value="item.value">{{item.value}}</option>
              </CustomSelect>
            </li>

            <li class="filter__item">
              <CustomSelect
                  v-model:value="selectedId"
                  placeholder="Select"
                  label="ID"
                  id="select-statuses"
              >
                <option :value="null">All Users</option>
                <option v-for="item in todo.uniqueUserIds" :key="item" :value="item">{{item}}</option>
              </CustomSelect>
            </li>

            <li class="filter__item">
              <InputText placeholder="Search" v-model="filterTitle" label="Title"/>
            </li>
          </ul>


          <div class="filter__button">
            <button class="button" @click="todo.show_modal = true">Add new To-Do</button>
          </div>
        </div>
      </div>

      <div class="todo">
        <ul class="todo__list">
          <template v-if="todo.todoList">
            <li class="todo__item" v-for="(item, index) in filteredTodos" :key="item.id">
              <div class="todo__block">
                <div class="todo__inf">
                  <span class="todo__number">{{index + 1}}</span>
                  <p class="todo__title">{{item.title}}</p>
                </div>

                <div class="todo__container">
                  <div class="todo__action">userId: {{item.userId}}</div>
                  <div class="todo__action">{{item.completed ? 'Completed' : 'Uncompleted'}}</div>
                  <button class="todo__action" @click="todo.toggleFavorite(item)">
                    <svg :fill="item.favorite ? '#ffc600' : ''" viewBox="0 0 32 31" stroke="#ffc600" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M16.0005 1.00037L20.6355 10.3904L31.0005 11.9054L23.5005 19.2104L25.2705 29.5304L16.0005 24.6554L6.73049 29.5304L8.50049 19.2104L1.00049 11.9054L11.3655 10.3904L16.0005 1.00037Z"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>

      <ModalsApp :show="todo.show_modal">
        <div class="modals__modal" @click.self="todo.show_modal = false">
          <div class="modals__modal-block">
            <div class="modals__modal-header">
              <h5>
                <strong>Add new todo</strong>

                <Close @click="todo.show_modal = false" class="modals__modal-close"/>
              </h5>
            </div>

            <div class="modals__modal-body">
              <form class="form" @submit.prevent="todo.createdToDo">
                <ul class="form__items">
                  <li class="form__item">
                    <InputText
                        v-model="todo.form.title"
                        :only_letters="true"
                        required
                        id="input-title"
                        label="Title"
                        placeholder="Type Here"
                    />

                    <small class="error" v-if="todo.title_error && todo.title_error.length > 0">{{ todo.title_error }}</small>
                  </li>
                </ul>

                <ul class="form__items">
                  <li class="form__item">
                    <InputText
                        v-model="todo.form.id"
                        label="User Id"
                        required
                        id="input-user-id"
                        placeholder="Type Here"
                    />

                    <small class="error" v-if="todo.id_error && todo.id_error.length > 0">{{ todo.id_error }}</small>
                  </li>
                </ul>

                <ul class="form__items">
                  <li class="form__item">
                    <button type="submit" class="button">Add Todo</button>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </ModalsApp>
    </div>
  </div>
</template>
