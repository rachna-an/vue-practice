<!-- Parent -->
<template>
  <div>
    <div class="!my-4">
      <label class="mb-2">Search Tasks</label>
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search task title..."
        class="border border-zinc-500 px-2 py-1 rounded-lg w-full"
      />
    </div>

    <ul class="list-disc">
      <ToDoItem
        v-for="task in filteredTasks"
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
  import { computed, reactive, ref, watch } from 'vue'
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

  // Search Task
  const searchTerm = ref('')
  const filteredTasks = ref([...tasks])
  let debounceTimer = null
  watch(searchTerm, (val) => {
    clearTimeout(debounceTimer)

    debounceTimer = setTimeout(() => {
      const search = val.trim().toLowerCase()
      filteredTasks.value = search
        ? tasks.filter((t) => t.title.toLowerCase().includes(search))
        : [...tasks]
    }, 300)
  })
</script>
