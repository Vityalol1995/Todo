import {computed, reactive, ref} from 'vue'
import { defineStore } from 'pinia'

interface TodoList {
    completed: boolean;
    id: number;
    title: string;
    userId: number;
    favorite?: boolean | undefined
}

export const useTodoStore = defineStore('todo', () => {
    const todo_list = ref<TodoList[] | null>(null)

    const form = reactive({
        title: '',
        id: ''
    })

    const title_error = ref<string>('')
    const id_error = ref<string>('')
    const show_modal = ref<boolean>(false)
    const favoriteUserIds = ref<number[]>(JSON.parse(localStorage.getItem('favoriteUserIds') || '[]'))

    const getAllTodoList = async () => {
        try {
            const data = await fetch('https://jsonplaceholder.typicode.com/todos')
            const res = await data.json()
            todo_list.value = res

            updateFavorites()
        } catch (e) {
            console.error(e)
        }
    }

    const createdToDo = async () => {
        if (!form.title) {
            title_error.value = 'Please enter a title.'
            return;
        }

        title_error.value = ''

        if (!form.id) {
            id_error.value = 'Please enter a user id.'
            return;
        }

        id_error.value  = ''

        try {
          const data = fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify({
              title: `${form.title}`,
              userId: `${form.id}`,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            }
          })

            const res = await data

            if (res.status === 200 || res.status === 201) {
                const obj = await res.json()
                todo_list.value?.push(obj)
            }

            show_modal.value = false
        } catch (e) {
          console.error(e)
        }
    }

    const updateFavorites = () => {
        if (!todo_list.value) return;

        todo_list.value.forEach(todo => {
            if (favoriteUserIds.value.includes(todo.id)) {
                todo.favorite = true;
            }
        });
    }

    const toggleFavorite = (item:TodoList) => {
        if (favoriteUserIds.value.includes(item.id)) {
            favoriteUserIds.value = favoriteUserIds.value.filter(id => id !== item.id);
            localStorage.setItem('favoriteUserIds', JSON.stringify(favoriteUserIds.value));

            if (!todo_list.value) return;
            const obj = todo_list.value.find(el => el.id === item?.id)
            if (obj) {
                obj.favorite = false;
            }
        } else {
            favoriteUserIds.value.push(item.id);
            localStorage.setItem('favoriteUserIds', JSON.stringify(favoriteUserIds.value));

            if (!todo_list.value) return;
            const obj = todo_list.value.find(el => el.id === item?.id)
            if (obj) {
                obj.favorite = true;
            }
        }
    }

    const todoList = computed(() => {
        return todo_list.value
    })

    const uniqueUserIds = computed(() => {
        if (!todo_list.value) return [];
        return Array.from(new Set(todo_list.value.map(todo => todo.userId)));
    });

    return { getAllTodoList, toggleFavorite , todoList, uniqueUserIds, createdToDo, form, title_error, id_error, show_modal }
})
