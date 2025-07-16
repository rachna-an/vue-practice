<!-- Component: ToDoItem.vue -->
<template>
  <li class="flex items-center justify-between bg-zinc-100 p-3 rounded-lg" @click="emitToggle">
    <div>
      <input type="checkbox" :checked="isCompleted" class="cursor-pointer" />
      <label :class="{ 'line-through text-gray-400': isCompleted }" class="pl-3">
        {{ title }}
      </label>
    </div>
    <span class="!text-xs px-3 rounded-full bg-zinc-50 border border-zinc-400/40">{{ label }}</span>
  </li>
</template>

<script setup>
  defineProps({
    title: String,
    label: String,
    isCompleted: Boolean,
  })

  const emit = defineEmits(['toggle-complete'])
  function emitToggle() {
    emit('toggle-complete')
  }
</script>
