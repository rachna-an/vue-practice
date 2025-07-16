<template>
  <div class="flex-1 max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl border border-gray-200">
    <h1 class="text-2xl !font-bold text-gray-800 !mb-4">📝 My Task List</h1>

    <!-- Search Bar -->
    <div class="!mb-4">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search task title..."
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-800/80"
      />
    </div>

    <!-- Task List -->
    <ul class="!space-y-2 !mb-6">
      <ToDoItem
        v-for="task in filteredTasks"
        :key="task.id"
        :title="task.title"
        :isCompleted="task.done"
        @toggle-complete="toggleTaskCompletion(task.id)"
      />
    </ul>

    <!-- Progress Summary -->
    <div>
      <div class="flex justify-between items-center mb-1">
        <span class="text-sm font-medium text-gray-700">Progress</span>
        <span class="text-sm font-semibold text-gray-600">{{ completionRate }}%</span>
      </div>
      <div class="w-full h-3 bg-gray-200 rounded-full">
        <div
          class="h-full bg-green-500 rounded-full transition-all duration-300"
          :style="{ width: `${completionRate}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>


<script setup>
  import { reactive } from 'vue'
  import ToDoItem from './components/ToDoItem.vue'
  import { useTasks } from './composables/useTasks'

  const tasks = reactive([
    { id: 1, title: 'Code Review', done: false },
    { id: 2, title: 'Write documentation', done: true },
    { id: 3, title: 'Fix bugs', done: false },
    { id: 4, title: 'Design homepage layout', done: true },
    { id: 5, title: 'Implement search feature', done: false },
    { id: 6, title: 'Test user registration flow', done: false },
  ])

  const { searchTerm, filteredTasks, completionRate, toggleTaskCompletion } = useTasks(tasks)
</script>
