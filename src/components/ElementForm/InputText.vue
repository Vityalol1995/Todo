<script setup lang="ts">
import { ref } from "vue";

interface Props {
  label?: string | '',
  placeholder?: string | 'Type Here',
  id?: string | 'default-input',
  required?: boolean,
  only_letters?: boolean | false
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue'])
const inputValue = ref<string>('')
const handleKeyDown = (event: KeyboardEvent) => {
  if (props.only_letters) {
    if (/\d/.test(event.key)) {
      event.preventDefault();
    }
  }
}

const handlePaste = (event: ClipboardEvent) => {
  if (props.only_letters) {
    const pastedText = event.clipboardData?.getData('text/plain');
    if (/\d/.test(pastedText || '')) {
      event.preventDefault();
    }
  }
}

const handleInput = (event: Event) => {
  inputValue.value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', inputValue.value);
}

</script>

<template>
  <div class="field">
    <label :for="id" class="field__label" v-if="label && label.length > 0">
      <small>
        {{ label }}
        <span v-if="required">*</span>
      </small>
    </label>
    <input
        type="text"
        :id="id"
        :placeholder="placeholder"
        @keydown="handleKeyDown"
        @paste="handlePaste"
        @input="handleInput"
    />
  </div>
</template>
