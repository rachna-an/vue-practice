import { ref, watch } from 'vue'

export const useSearch = (items = [], keys = []) => {
  const searchTerm = ref('')
  const filteredItems = ref([...items])
  const debounceTimer = ref(null)

  watch(searchTerm, (val) => {
    clearTimeout(debounceTimer.value)
    debounceTimer.value = setTimeout(() => {
      const search = val.trim().toLowerCase()
      if (search && keys.length) {
        filteredItems.value = items.filter((item) =>
          keys.some((key) =>
            String(item[key] || '')
              .toLowerCase()
              .includes(search),
          ),
        )
      } else {
        filteredItems.value = [...items]
      }
    }, 300)
  })

  return {
    searchTerm,
    filteredItems,
  }
}
