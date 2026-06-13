
import { getTodayKey } from '../utils/storage'

export default function ProgressChart({ habits }) {
  const today = getTodayKey()
  const total = habits.length
  const completed = habits.filter((h) => h.history.includes(today)).length
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="progress-chart">
      <div className="progress-label">
        <span>Today's progress</span>
        <span>{completed}/{total}</span>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  )
}