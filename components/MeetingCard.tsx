import { MeetingCardData } from "@/lib/types";

type MeetingCardProps = {
  meeting: MeetingCardData;
  onChange: (patch: Partial<MeetingCardData>) => void;
  onDelete: () => void;
};

export default function MeetingCard({ meeting, onChange, onDelete }: MeetingCardProps) {
  return (
    <article className="meeting-card">
      <div className="meeting-card-header">
        <input
          className="meeting-title"
          aria-label="Meeting title"
          value={meeting.title}
          placeholder="Meeting title"
          onChange={(event) => onChange({ title: event.target.value })}
        />
        <input
          className="meeting-time"
          aria-label="Meeting time"
          value={meeting.time}
          placeholder="Time"
          onChange={(event) => onChange({ time: event.target.value })}
        />
      </div>
      <Field label="Attendees / team" value={meeting.attendees} onChange={(attendees) => onChange({ attendees })} />
      <Field label="Notes" value={meeting.notes} onChange={(notes) => onChange({ notes })} />
      <Field label="Key takeaways" value={meeting.takeaways} onChange={(takeaways) => onChange({ takeaways })} />
      <Field label="Follow-ups / action items" value={meeting.follow_ups} onChange={(follow_ups) => onChange({ follow_ups })} />
      <button className="text-button danger align-right" type="button" onClick={onDelete}>
        Delete meeting
      </button>
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
