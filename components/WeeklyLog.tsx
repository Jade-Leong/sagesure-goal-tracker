import { ManagerFeedback, WeeklyLogEntry } from "@/lib/types";
import WeekEntry from "./WeekEntry";

type WeeklyLogProps = {
  weeklyLogs: WeeklyLogEntry[];
  managerFeedback: ManagerFeedback[];
  onWeeklyChange: (logs: WeeklyLogEntry[]) => void;
  onFeedbackChange: (feedback: ManagerFeedback[]) => void;
};

export default function WeeklyLog({
  weeklyLogs,
  managerFeedback,
  onWeeklyChange,
  onFeedbackChange
}: WeeklyLogProps) {
  function updateLog(id: string, patch: Partial<WeeklyLogEntry>) {
    onWeeklyChange(weeklyLogs.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)));
  }

  function updateFeedback(weekNumber: number, patch: Partial<ManagerFeedback>) {
    onFeedbackChange(
      managerFeedback.map((entry) => (entry.week_number === weekNumber ? { ...entry, ...patch } : entry))
    );
  }

  return (
    <div className="prompt-list">
      {weeklyLogs.map((entry, index) => (
        <WeekEntry
          key={entry.id}
          entry={entry}
          feedback={managerFeedback.find((item) => item.week_number === entry.week_number)}
          defaultOpen={index === 0}
          onEntryChange={(patch) => updateLog(entry.id, patch)}
          onFeedbackChange={(patch) => updateFeedback(entry.week_number, patch)}
        />
      ))}
    </div>
  );
}
