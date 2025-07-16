import { reactive, ref, computed, watch } from 'vue'

export const useTasks = (initialTask = []) => {
  const tasks = reactive(initialTask)
  const searchTerm = ref('')
  const filteredTasks = ref([...tasks])
  const debounceTimer = ref(null)

  const toggleTaskCompletion = (id) => {
    const task = tasks.find((t) => t.id === id)
    if (task) task.done = !task.done
  }

  const completionRate = computed(() => {
    const totalTasks = tasks.length
    const completedTasks = tasks.filter((task) => task.done).length
    return totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0
  })

  watch(searchTerm, (val) => {
    clearTimeout(debounceTimer.value)
    debounceTimer.value = setTimeout(() => {
      const search = val.trim().toLowerCase()
      filteredTasks.value = search
        ? tasks.filter((t) => t.title.toLowerCase().includes(search))
        : [...tasks]
    }, 300)
  })

  return {
    tasks,
    searchTerm,
    filteredTasks,
    completionRate,
    toggleTaskCompletion,
  }
}
