import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user_info = computed(() => {
        const userDataJSON = localStorage.getItem('user');
        if (userDataJSON) {
            return JSON.parse(userDataJSON);
        }
    })

    return { user_info }
})
