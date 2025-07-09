<!-- Component: ToDoItem.vue -->
<template>
  <li>
    <input type="checkbox" :checked="isCompleted" @change="emitToggle" class="cursor-pointer" />
    <label :class="{ 'line-through text-gray-400': isCompleted }" class="pl-3">
      {{ title }}
    </label>
  </li>
</template>

<script setup>
  defineProps({
    title: String,
    isCompleted: Boolean,
  })

  const emit = defineEmits(['toggle-complete'])
  function emitToggle() {
    emit('toggle-complete')
  }
</script>
