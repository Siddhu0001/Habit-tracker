import { useState, useEffect } from 'react'
import AddHabitForm from './components/AddHabitForm'
import HabitList from './components/HabitList'
import ProgressChart from './components/ProgressChart'
import { loadHabits, saveHabits, getTodayKey, loadTheme, saveTheme } from './utils/storage'

export default function App() {
  const [habits, setHabits] = useState([])
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    setHabits(loadHabits())
    const savedTheme = loadTheme()
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  useEffect(() => {
    saveHabits(habits)
  }, [habits])

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    saveTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  function addHabit({ name, category, notes }) {
    const newHabit = {
      id: Date.now().toString(),
      name,
      category,
      notes,
      history: [],
    }
    setHabits([...habits, newHabit])
  }

  function toggleToday(id) {
    const today = getTodayKey()
    setHabits(
      habits.map((h) => {
        if (h.id !== id) return h
        const hasToday = h.history.includes(today)
        return {
          ...h,
          history: hasToday
            ? h.history.filter((d) => d !== today)
            : [...h.history, today],
        }
      })
    )
  }

  function deleteHabit(id) {
    setHabits(habits.filter((h) => h.id !== id))
  }

  function updateHabit(id, updates) {
    setHabits(habits.map((h) => (h.id === id ? { ...h, ...updates } : h)))
  }

  return (
    <div className="app">
      <header>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <h1>Habit Tracker</h1>
        <p className="subtitle">Build better habits, one day at a time.</p>
      </header>

      <ProgressChart habits={habits} />
      <AddHabitForm onAdd={addHabit} />
      <HabitList
        habits={habits}
        onToggleToday={toggleToday}
        onDelete={deleteHabit}
        onUpdate={updateHabit}
      />
    </div>
  )
}