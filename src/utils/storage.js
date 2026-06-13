const STORAGE_KEY = 'habit-tracker-data'
const THEME_KEY = 'habit-tracker-theme'

export function loadHabits() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveHabits(habits) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
}

export function loadTheme() {
  return localStorage.getItem(THEME_KEY) || 'light'
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme)
}

export function getTodayKey() {
  return new Date().toISOString().split('T')[0]
}

export function getLastNDays(n) {
  const days = []
  const cursor = new Date()
  for (let i = 0; i < n; i++) {
    days.push(cursor.toISOString().split('T')[0])
    cursor.setDate(cursor.getDate() - 1)
  }
  return days.reverse()
}