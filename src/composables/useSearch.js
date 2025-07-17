import { ref, watch } from 'vue'

export const useSearch = (items, keys = []) => {
  const searchTerm = ref('')
  const filteredItems = ref([])

  const filter = () => {
    const search = searchTerm.value.trim().toLowerCase()
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
  }

  watch(searchTerm, () => {
    filter()
  })

  watch(
    () => items,
    () => {
      filter()
    },
    { deep: true },
  )

  // Initial filter
  filter()

  return {
    searchTerm,
    filteredItems,
  }
}
