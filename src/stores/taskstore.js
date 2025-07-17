import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = reactive([
    { id: 1, title: 'Code Review', label: 'Work', done: false },
    { id: 2, title: 'Book dentist appointment', label: 'Health', done: true },
    { id: 3, title: 'Design homepage layout', label: 'Work', done: true },
    { id: 4, title: 'Plan weekend trip', label: 'Personal', done: false },
  ])

  const toggleTaskCompletion = (id) => {
    const task = tasks.find((t) => t.id === id)
    if (task) task.done = !task.done
  }

  const addTask = (title, label) => {
    const newId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1
    tasks.push({
      id: newId,
      title,
      label,
      done: false,
    })
  }

  const deleteTask = (id) => {
    const index = tasks.findIndex((t) => t.id === id)
    if (index !== -1) tasks.splice(index, 1)
  }

  const completionRate = computed(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.done).length
    return total ? Math.round((completed / total) * 100) : 0
  })

  return {
    tasks,
    toggleTaskCompletion,
    addTask,
    deleteTask,
    completionRate,
  }
})
