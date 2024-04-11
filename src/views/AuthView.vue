<script setup lang="ts">
import InputText from "@/components/ElementForm/InputText.vue";
import {onMounted, ref} from "vue";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore()

onMounted(() => {
  auth.getUsersList()
})
</script>

<template>
  <section class="layout__section">
    <div class="container">
      <form class="form form--signin" @submit.prevent="auth.handlerSubmit()">
        <div class="form__label">
          <b>Login</b>
        </div>

        <ul class="form__items">
          <li class="form__item">
            <InputText
                v-model="auth.name"
                :only_letters="true"
                required
                id="input-name"
                label="User Name"
                placeholder="Type Here"
            />

            <small class="error" v-if="auth.name_error && auth.name_error.length > 0">{{ auth.name_error }}</small>
          </li>
        </ul>

        <ul class="form__items">
          <li class="form__item">
            <InputText
                v-model="auth.phone"
                label="Phone"
                required
                id="input-phone"
                placeholder="Type Here"
            />

            <small class="error" v-if="auth.phone_error && auth.phone_error.length > 0">{{ auth.phone_error }}</small>
          </li>
        </ul>

        <ul class="form__items">
          <li class="form__item form__item--submit">
           <button type="submit" class="button">Login</button>
          </li>
        </ul>
      </form>
    </div>
  </section>
</template>
