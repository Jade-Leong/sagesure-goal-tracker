import { createId } from "@/lib/storage";
import { Goal, GoalStatus } from "@/lib/types";

const statuses: GoalStatus[] = ["Not started", "In progress", "Done"];

type GoalTableProps = {
  goals: Goal[];
  onChange: (goals: Goal[]) => void;
};

export default function GoalTable({ goals, onChange }: GoalTableProps) {
  function updateGoal(id: string, patch: Partial<Goal>) {
    onChange(goals.map((goal) => (goal.id === id ? { ...goal, ...patch } : goal)));
  }

  function addGoal() {
    const timestamp = new Date().toISOString();
    onChange([
      ...goals,
      {
        id: createId("goal"),
        goal: "",
        type: "",
        success_metric: "",
        status: "Not started",
        created_at: timestamp,
        updated_at: timestamp
      }
    ]);
  }

  return (
    <div className="table-wrap">
      <table className="goal-table">
        <thead>
          <tr>
            <th>Goal</th>
            <th>Type</th>
            <th>Success metric</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((item) => (
            <tr key={item.id}>
              <td>
                <textarea
                  aria-label="Goal"
                  value={item.goal}
                  onChange={(event) => updateGoal(item.id, { goal: event.target.value })}
                  placeholder="Add a summer goal"
                />
              </td>
              <td>
                <input
                  aria-label="Goal type"
                  value={item.type}
                  onChange={(event) => updateGoal(item.id, { type: event.target.value })}
                  placeholder="Learning"
                />
              </td>
              <td>
                <textarea
                  aria-label="Success metric"
                  value={item.success_metric}
                  onChange={(event) => updateGoal(item.id, { success_metric: event.target.value })}
                  placeholder="How will you know it worked?"
                />
              </td>
              <td>
                <select
                  aria-label="Goal status"
                  value={item.status}
                  onChange={(event) => updateGoal(item.id, { status: event.target.value as GoalStatus })}
                  className={`status-pill ${statusClass(item.status)}`}
                >
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td>
                <button className="text-button danger" type="button" onClick={() => onChange(goals.filter((goal) => goal.id !== item.id))}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="accent-button" type="button" onClick={addGoal}>
        Add goal
      </button>
    </div>
  );
}

function statusClass(status: GoalStatus) {
  if (status === "Done") return "status-done";
  if (status === "In progress") return "status-in-progress";
  return "status-not-started";
}
