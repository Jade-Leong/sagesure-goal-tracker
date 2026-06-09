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
  function saveLog(savedEntry: WeeklyLogEntry) {
    onWeeklyChange(weeklyLogs.map((entry) => (entry.id === savedEntry.id ? savedEntry : entry)));
  }

  function saveFeedback(savedFeedback: ManagerFeedback) {
    onFeedbackChange(managerFeedback.map((entry) => (entry.id === savedFeedback.id ? savedFeedback : entry)));
  }

  return (
    <div className="prompt-list">
      {weeklyLogs.map((entry, index) => (
        <WeekEntry
          key={entry.id}
          entry={entry}
          feedback={managerFeedback.find((item) => item.week_number === entry.week_number)}
          defaultOpen={index === 0}
          onEntrySave={saveLog}
          onFeedbackSave={saveFeedback}
        />
      ))}
    </div>
  );
}
