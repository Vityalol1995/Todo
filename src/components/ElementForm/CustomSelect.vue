<script setup lang="ts">
import {ref} from "vue";

interface Props {
  label?: string | '',
  placeholder?: string | 'Select',
  id?: string | 'default-select.scss',
  value?: string
}

const props = defineProps<Props>();

const emit = defineEmits(['update:value']);
const modelValue = ref<string>(props.value || '');

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  modelValue.value = target.value;
  emit('update:value', modelValue.value);
};
</script>

<template>
  <div class="select">
    <p class="field__label" v-if="label && label.length > 0">
      <small>
        {{ label }}
      </small>
      <slot name="removeItem"></slot>
    </p>

    <div class="select__group">
      <select :value="value" @input="handleChange" class="select__part">
        <slot></slot>
      </select>

      <svg width="24" height="24" class="select__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M6 9L12 15L18 9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </div>
</template>
