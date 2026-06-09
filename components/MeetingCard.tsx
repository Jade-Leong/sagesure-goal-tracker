import { useEffect, useState } from "react";
import { MeetingCardData } from "@/lib/types";

type MeetingCardProps = {
  meeting: MeetingCardData;
  onSave: (meeting: MeetingCardData) => void;
  onDelete: () => void;
};

const editableFields: (keyof Pick<
  MeetingCardData,
  "title" | "time" | "attendees" | "notes" | "takeaways" | "follow_ups"
>)[] = ["title", "time", "attendees", "notes", "takeaways", "follow_ups"];

export default function MeetingCard({ meeting, onSave, onDelete }: MeetingCardProps) {
  const [draft, setDraft] = useState(meeting);
  const [status, setStatus] = useState("Saved");

  useEffect(() => {
    setDraft(meeting);
    setStatus("Saved");
  }, [meeting]);

  const hasUnsavedChanges = editableFields.some((field) => draft[field] !== meeting[field]);

  function updateDraft(patch: Partial<MeetingCardData>) {
    setDraft((current) => ({ ...current, ...patch }));
    setStatus("Unsaved");
  }

  function saveDraft() {
    onSave(draft);
    setStatus("Saved");
  }

  return (
    <article className="meeting-card">
      <div className="meeting-card-header">
        <input
          className="meeting-title"
          aria-label="Meeting title"
          value={draft.title}
          placeholder="Meeting title"
          onChange={(event) => updateDraft({ title: event.target.value })}
        />
        <input
          className="meeting-time"
          aria-label="Meeting time"
          value={draft.time}
          placeholder="Time"
          onChange={(event) => updateDraft({ time: event.target.value })}
        />
      </div>
      <Field label="Attendees / team" value={draft.attendees} onChange={(attendees) => updateDraft({ attendees })} />
      <Field label="Notes" value={draft.notes} onChange={(notes) => updateDraft({ notes })} />
      <Field label="Key takeaways" value={draft.takeaways} onChange={(takeaways) => updateDraft({ takeaways })} />
      <Field
        label="Follow-ups / action items"
        value={draft.follow_ups}
        onChange={(follow_ups) => updateDraft({ follow_ups })}
      />
      <div className="meeting-card-actions">
        <span className={`card-save-status ${hasUnsavedChanges ? "unsaved" : ""}`}>{status}</span>
        <button className="accent-button" type="button" onClick={saveDraft} disabled={!hasUnsavedChanges}>
          Save
        </button>
        <button className="text-button danger" type="button" onClick={onDelete}>
          Delete meeting
        </button>
      </div>
    </article>
  );
}

function Field({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="meeting-field">
      <span>{label}</span>
      <textarea value={value} placeholder="Add notes here" onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
