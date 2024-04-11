<script setup lang="ts">
interface Props {
  show: boolean
}

const props = defineProps<Props>();
</script>

<template>
  <Transition>
    <div
        class="modals"
        v-if="show"
        :class="{
        'modals--open': show,
      }"
    >
      <slot></slot>
    </div>
  </Transition>
</template>
