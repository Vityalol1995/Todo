<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import {useUserStore} from "@/stores/user";
import {useAuthStore} from "@/stores/auth";
import {ref} from "vue";

const user = useUserStore()
const auth = useAuthStore()

const user_first_letter = user.user_info ? user.user_info.name[0] : null

const dropdownVisible = ref(false);
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};
</script>

<template>
  <header class="header">
    <div class="header__container">
      <div class="container">
        <div class="header__block">
          <Logo/>

          <div class="header__inf" v-if="user.user_info">

            <div class="header__email">
              {{user.user_info.email}}
            </div>

            <div class="header__avatar" @click="toggleDropdown">
              <span>{{user_first_letter}}</span>

              <div v-show="dropdownVisible" class="dropdown" @click.stop>
                <ul class="dropdown__list">
                  <li class="dropdown__item"><b>Name:</b> {{user.user_info.name}}</li>
                  <li class="dropdown__item"><b>Phone:</b> {{user.user_info.phone}}</li>
                  <li class="dropdown__item"><b>City:</b> {{user.user_info.address.city}}</li>
                  <li class="dropdown__item"><b>Username:</b> {{user.user_info.username}}</li>
                  <li class="dropdown__item"><b>Company:</b> {{user.user_info.company.name}}</li>
                  <li class="dropdown__item"><button @click.stop="auth.logout" class="button button__logout">Logout</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
