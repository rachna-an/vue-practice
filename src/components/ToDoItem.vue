<!-- Component: ToDoItem.vue -->
<template>
  <li class="bg-zinc-100 p-3 rounded-lg" @click="emitToggle">
    <input type="checkbox" :checked="isCompleted" class="cursor-pointer" />
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
