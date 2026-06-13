import { useState } from 'react'
import { getTodayKey, getLastNDays } from '../utils/storage'

const CATEGORIES = ['Health', 'Productivity', 'Learning', 'Mindfulness', 'Other']

export default function HabitCard({ habit, onToggleToday, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(habit.name)
  const [category, setCategory] = useState(habit.category || 'Other')
  const [notes, setNotes] = useState(habit.notes || '')

  const today = getTodayKey()
  const doneToday = habit.history.includes(today)
  const streak = calculateStreak(habit.history)
  const last7 = getLastNDays(7)

  function saveEdit() {
    onUpdate(habit.id, { name: name.trim() || habit.name, category, notes: notes.trim() })
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="habit-card editing">
        <div className="edit-fields">
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            placeholder="Notes / reminder"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="habit-actions">
          <button className="toggle-btn" onClick={saveEdit}>Save</button>
          <button className="delete-btn" onClick={() => setEditing(false)}>✕</button>
        </div>
      </div>
    )
  }

  return (
    <div className={`habit-card ${doneToday ? 'done' : ''}`}>
      <div className="habit-info">
        <div className="habit-title-row">
          <h3>{habit.name}</h3>
          <span className="category-tag">{habit.category || 'Other'}</span>
        </div>
        {habit.notes && <p className="habit-notes">{habit.notes}</p>}
        <p className="streak">🔥 {streak} day streak</p>
        <div className="heatmap">
          {last7.map((day) => (
            <div
              key={day}
              className={`heatmap-cell ${habit.history.includes(day) ? 'filled' : ''}`}
              title={day}
            ></div>
          ))}
        </div>
      </div>
      <div className="habit-actions">
        <button className="toggle-btn" onClick={() => onToggleToday(habit.id)}>
          {doneToday ? '✓ Done' : 'Mark done'}
        </button>
        <button className="edit-btn" onClick={() => setEditing(true)}>✎</button>
        <button className="delete-btn" onClick={() => onDelete(habit.id)}>✕</button>
      </div>
    </div>
  )
}

function calculateStreak(history) {
  if (!history.length) return 0
  const sorted = [...history].sort().reverse()
  let streak = 0
  let cursor = new Date()

  for (let i = 0; i < sorted.length; i++) {
    const expected = cursor.toISOString().split('T')[0]
    if (sorted[i] === expected) {
      streak++
      cursor.setDate(cursor.getDate() - 1)
    } else {
      break
    }
  }
  return streak
}