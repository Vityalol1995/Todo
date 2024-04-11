<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const route = useRoute();

const currentLayout = computed(() => {
  if (route.meta && route.meta.layout) {
    return route.meta.layout;
  }
  return 'default';
});
</script>

<template>
  <div class="wrapper">
    <Header/>
    <component class="content" :is="currentLayout">
      <router-view />
    </component>
    <Footer/>
  </div>
</template>
