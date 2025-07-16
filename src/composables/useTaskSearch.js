import { ref, watch } from 'vue'

export const useTaskSearch = (tasks = []) => {
  const searchTerm = ref('')
  const filteredTasks = ref([...tasks])
  const debounceTimer = ref(null)

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
    searchTerm,
    filteredTasks,
  }
}
