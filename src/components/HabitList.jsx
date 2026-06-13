import HabitCard from './HabitCard'

export default function HabitList({ habits, onToggleToday, onDelete, onUpdate }) {
  if (habits.length === 0) {
    return <p className="empty-state">No habits yet. Add one above to get started.</p>
  }

  return (
    <div className="habit-list">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggleToday={onToggleToday}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}