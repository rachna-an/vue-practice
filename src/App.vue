<!-- Parent -->
<template>
  <ul class="list-disc">
    <ToDoItem
      v-for="task in tasks"
      :key="task.id"
      :title="task.title"
      :isCompleted="task.done"
      @toggle-complete="toggleTaskCompletion(task.id)"
    />
  </ul>
</template>

<script setup>
  import { reactive } from 'vue'
  import ToDoItem from './components/ToDoItem.vue'

  const tasks = reactive([
    { id: 1, title: 'Code Review', done: false },
    { id: 2, title: 'Write documentation', done: true },
    { id: 3, title: 'Fix bugs', done: false },
  ])

  const toggleTaskCompletion = (id) => {
    const task = tasks.find((t) => t.id === id)
    if (task) task.done = !task.done
  }
</script>
