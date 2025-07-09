<!-- Parent -->
<template>
  <div>
    <ul class="list-disc">
      <ToDoItem
        v-for="task in tasks"
        :key="task.id"
        :title="task.title"
        :isCompleted="task.done"
        @toggle-complete="toggleTaskCompletion(task.id)"
      />
    </ul>

    <div class="progress-bar !mt-10 w-100 h-3 rounded-full bg-neutral-200 relative">
      <span class="absolute -top-5.5 !text-sm !font-medium">{{ completionRate }}%</span>
      <div class="bg-green-600 rounded-full h-full" :style="{ width: `${completionRate}%` }"></div>
    </div>
  </div>
</template>

<script setup>
  import { computed, reactive } from 'vue'
  import ToDoItem from './components/ToDoItem.vue'

  const tasks = reactive([
    { id: 1, title: 'Code Review', done: false },
    { id: 2, title: 'Write documentation', done: true },
    { id: 3, title: 'Fix bugs', done: false },
    { id: 4, title: 'Design homepage layout', done: true },
    { id: 5, title: 'Implement search feature', done: false },
    { id: 6, title: 'Test user registration flow', done: false },
  ])

  const toggleTaskCompletion = (id) => {
    const task = tasks.find((t) => t.id === id)
    if (task) task.done = !task.done
  }

  // Computed property
  const completionRate = computed(() => {
    const totalTasks = tasks.length
    const completedTasks = tasks.filter((task) => task.done).length
    return totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0
  })
</script>
