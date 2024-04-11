import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from "@/router";

interface User {
    username: string;
    phone: string;
}
export const useAuthStore = defineStore('auth', () => {
    const name = ref<string>('')
    const phone = ref<string>('')

    const name_error = ref<string>('')
    const phone_error = ref<string>('')

    const user = ref<object>({})

    let users_list: Array<User> = [];

    const getUsersList = async () => {
        try {
            const data = await fetch('https://jsonplaceholder.typicode.com/users')
            const res = await data.json()
            users_list = res
            console.log(users_list)
        } catch (e) {
            console.log(e)
        }
    }

    const handlerSubmit = () => {
        if (!name.value) {
            name_error.value = 'Please enter a username.'
            return;
        }

        name_error.value = ''

        if (!phone.value) {
            phone_error.value = 'Please enter a phone number.'
            return;
        }

        phone_error.value  = ''

        const foundUserByName = users_list.find(user => user.username === name.value);
        if (!foundUserByName) {
            name_error.value = 'Username does not exist.'
            return;
        }

        name_error.value = ''

        const foundUserByPhone = users_list.find(user => user.phone === phone.value);
        if (!foundUserByPhone) {
            phone_error.value = 'Number does not exist'
            return;
        }

        phone_error.value = ''

        localStorage.setItem('user', JSON.stringify(foundUserByName));
        user.value = foundUserByName
        router.push('/').then(() => {
            window.location.reload()
        })
    };

    const logout = () => {
        localStorage.removeItem('user')
        router.push('/auth').then(() => {
            window.location.reload()
        })
    }

    return { name, phone, name_error, phone_error, getUsersList, handlerSubmit, user, logout }
})
