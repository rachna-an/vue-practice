<template>
  <div>
    <div class="!mb-6 flex gap-2">
      <input
        v-model="newTitle"
        type="text"
        placeholder="Task title"
        class="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-800/80"
      />
      <input
        v-model="newLabel"
        type="text"
        placeholder="Label"
        class="w-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-800/80"
      />
      <button
        @click="handleAddTask"
        class="bg-green-100 border border-green-700 cursor-pointer !font-medium text-green-800 px-4 rounded-lg hover:bg-green-100/80 transition"
        :disabled="!newTitle.trim()"
      >
        Add
      </button>
    </div>

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

      <!-- Progress Summary -->
      <div class="!my-4">
        <div class="flex justify-between items-center mb-1">
          <span class="text-sm font-medium text-gray-700">Progress</span>
          <span class="text-sm font-semibold text-gray-600">{{ taskStore.completionRate }}%</span>
        </div>
        <div class="w-full h-3 bg-gray-200 rounded-full">
          <div
            class="h-full bg-green-500 rounded-full transition-all duration-300"
            :style="{ width: `${taskStore.completionRate}%` }"
          ></div>
        </div>
      </div>

      <!-- Task List -->
      <ul class="!space-y-2 !mb-6">
        <ToDoItem
          v-for="task in filteredTasks"
          :key="task.id"
          :title="task.title"
          :label="task.label"
          :isCompleted="task.done"
          @toggle-complete="taskStore.toggleTaskCompletion(task.id)"
          @delete="taskStore.deleteTask(task.id)"
        />
      </ul>
    </div>
  </div>
</template>


<script setup>
  import { ref } from 'vue'
  import ToDoItem from './components/ToDoItem.vue'
  import { useSearch } from './composables/useSearch'
  import { useTaskStore } from './stores/taskstore'

  const taskStore = useTaskStore()
  const { searchTerm, filteredItems: filteredTasks } = useSearch(taskStore.tasks, ['title', 'label'])

  const newTitle = ref('')
  const newLabel = ref('')

  function handleAddTask() {
    if (!newTitle.value.trim()) return
    taskStore.addTask(newTitle.value.trim(), newLabel.value.trim())
    newTitle.value = ''
    newLabel.value = ''
  }
</script>
