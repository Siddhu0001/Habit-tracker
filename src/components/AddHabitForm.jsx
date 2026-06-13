import { useState } from 'react'

const CATEGORIES = ['Health', 'Productivity', 'Learning', 'Mindfulness', 'Other']

export default function AddHabitForm({ onAdd }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Other')
  const [notes, setNotes] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    onAdd({ name: name.trim(), category, notes: notes.trim() })
    setName('')
    setNotes('')
    setCategory('Other')
  }

  return (
    <form className="add-habit-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          placeholder="New habit, e.g. Drink water"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <input
          type="text"
          placeholder="Notes / reminder (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button type="submit">Add habit</button>
      </div>
    </form>
  )
}