import { createId } from "@/lib/storage";
import { Goal } from "@/lib/types";

type GoalTableProps = {
  goals: Goal[];
  onChange: (goals: Goal[]) => void;
};

export default function GoalTable({ goals, onChange }: GoalTableProps) {
  function updateGoal(id: string, goalText: string) {
    onChange(goals.map((goal) => (goal.id === id ? { ...goal, goal: goalText } : goal)));
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
    <div className="goal-list">
      {goals.map((item, index) => (
        <article className="goal-card" key={item.id}>
          <label>
            <span>Goal {index + 1}</span>
            <textarea
              aria-label={`Goal ${index + 1}`}
              value={item.goal}
              onChange={(event) => updateGoal(item.id, event.target.value)}
              placeholder="Add a summer goal"
            />
          </label>
          <button
            className="text-button danger"
            type="button"
            onClick={() => onChange(goals.filter((goal) => goal.id !== item.id))}
          >
            Delete
          </button>
        </article>
      ))}

      <button className="accent-button" type="button" onClick={addGoal}>
        Add goal
      </button>
    </div>
  );
}
