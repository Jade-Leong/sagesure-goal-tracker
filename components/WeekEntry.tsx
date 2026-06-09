"use client";

import { useEffect, useState } from "react";
import { ManagerFeedback, WeeklyLogEntry } from "@/lib/types";
import EditableField from "./EditableField";
import RatingInput from "./RatingInput";

type WeekEntryProps = {
  entry: WeeklyLogEntry;
  feedback?: ManagerFeedback;
  defaultOpen?: boolean;
  onEntrySave: (entry: WeeklyLogEntry) => void;
  onFeedbackSave: (feedback: ManagerFeedback) => void;
};

const entryFields: (keyof Pick<
  WeeklyLogEntry,
  "worked_on" | "business_impact" | "learned" | "hard" | "focus_next_week" | "goal_progress"
>)[] = ["worked_on", "business_impact", "learned", "hard", "focus_next_week", "goal_progress"];

const feedbackFields: (keyof Pick<
  ManagerFeedback,
  | "clarity_rating"
  | "clarity_note"
  | "support_rating"
  | "support_note"
  | "feedback_quality_rating"
  | "feedback_quality_note"
  | "growth_rating"
  | "growth_note"
  | "open_reflection_good"
  | "open_reflection_different"
  | "open_reflection_needs"
  | "one_word"
>)[] = [
  "clarity_rating",
  "clarity_note",
  "support_rating",
  "support_note",
  "feedback_quality_rating",
  "feedback_quality_note",
  "growth_rating",
  "growth_note",
  "open_reflection_good",
  "open_reflection_different",
  "open_reflection_needs",
  "one_word"
];

export default function WeekEntry({
  entry,
  feedback,
  defaultOpen = false,
  onEntrySave,
  onFeedbackSave
}: WeekEntryProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [draftEntry, setDraftEntry] = useState(entry);
  const [draftFeedback, setDraftFeedback] = useState(feedback);
  const [status, setStatus] = useState("Saved");

  useEffect(() => {
    setDraftEntry(entry);
    setStatus("Saved");
  }, [entry]);

  useEffect(() => {
    setDraftFeedback(feedback);
    setStatus("Saved");
  }, [feedback]);

  const entryHasChanges = entryFields.some((field) => draftEntry[field] !== entry[field]);
  const feedbackHasChanges =
    Boolean(feedback && draftFeedback) && feedbackFields.some((field) => draftFeedback?.[field] !== feedback?.[field]);
  const hasUnsavedChanges = entryHasChanges || feedbackHasChanges;

  function updateEntryDraft(patch: Partial<WeeklyLogEntry>) {
    setDraftEntry((current) => ({ ...current, ...patch }));
    setStatus("Unsaved");
  }

  function updateFeedbackDraft(patch: Partial<ManagerFeedback>) {
    setDraftFeedback((current) => (current ? { ...current, ...patch } : current));
    setStatus("Unsaved");
  }

  function saveWeek() {
    onEntrySave(draftEntry);
    if (draftFeedback) onFeedbackSave(draftFeedback);
    setStatus("Saved");
  }

  return (
    <article className={`week-entry ${open ? "open" : ""}`}>
      <button className="week-entry-header" type="button" onClick={() => setOpen((current) => !current)}>
        <span className="week-label">{entry.week_label}</span>
        <span className="week-dates">{entry.week_dates}</span>
        <span className={`week-save-badge ${hasUnsavedChanges ? "unsaved" : ""}`}>{status}</span>
        <span className="week-chevron">v</span>
      </button>
      <div className="week-body">
        <div className="week-save-row">
          <span className={`card-save-status ${hasUnsavedChanges ? "unsaved" : ""}`}>{status}</span>
          <button className="accent-button" type="button" onClick={saveWeek} disabled={!hasUnsavedChanges}>
            Save week
          </button>
        </div>

        <div className="week-fields">
          <EditableField
            full
            label="What I worked on"
            value={draftEntry.worked_on}
            placeholder="Add your notes here"
            onChange={(worked_on) => updateEntryDraft({ worked_on })}
          />
          <EditableField
            full
            label="Business impact"
            value={draftEntry.business_impact}
            placeholder="What changed because of this work? Did it save time, improve clarity, support a decision, reduce risk, help customers, help internal teams, or move a project forward?"
            onChange={(business_impact) => updateEntryDraft({ business_impact })}
          />
          <EditableField
            label="Something I learned"
            value={draftEntry.learned}
            placeholder="Add your notes here"
            onChange={(learned) => updateEntryDraft({ learned })}
          />
          <EditableField
            label="Something that was hard"
            value={draftEntry.hard}
            placeholder="Add your notes here"
            onChange={(hard) => updateEntryDraft({ hard })}
          />
          <EditableField
            full
            label="What I want to focus on next week"
            value={draftEntry.focus_next_week}
            placeholder="Add your notes here"
            onChange={(focus_next_week) => updateEntryDraft({ focus_next_week })}
          />
          <EditableField
            full
            label="Goal progress check"
            value={draftEntry.goal_progress}
            placeholder="Any movement on your summer goals this week?"
            onChange={(goal_progress) => updateEntryDraft({ goal_progress })}
          />
        </div>

        {draftFeedback ? (
          <>
            <div className="divider"></div>
            <p className="prose">
              <strong>Weekly pulse</strong> - rate Jamie on the four dimensions below using this scale:
              <strong> 1</strong> needs work, <strong>2</strong> getting there, <strong>3</strong> solid,
              <strong> 4</strong> excellent.
            </p>
            <div className="rating-row">
              <RatingInput
                label="Clarity of direction"
                description="Do you know what you're working on and why it matters? Are priorities clear?"
                rating={draftFeedback.clarity_rating}
                note={draftFeedback.clarity_note}
                onRatingChange={(clarity_rating) => updateFeedbackDraft({ clarity_rating })}
                onNoteChange={(clarity_note) => updateFeedbackDraft({ clarity_note })}
              />
              <RatingInput
                label="Availability and support"
                description="When you needed help or had a question, was Jamie accessible and useful?"
                rating={draftFeedback.support_rating}
                note={draftFeedback.support_note}
                onRatingChange={(support_rating) => updateFeedbackDraft({ support_rating })}
                onNoteChange={(support_note) => updateFeedbackDraft({ support_note })}
              />
              <RatingInput
                label="Feedback quality"
                description="Was the feedback you received this week specific, actionable, and fair?"
                rating={draftFeedback.feedback_quality_rating}
                note={draftFeedback.feedback_quality_note}
                onRatingChange={(feedback_quality_rating) => updateFeedbackDraft({ feedback_quality_rating })}
                onNoteChange={(feedback_quality_note) => updateFeedbackDraft({ feedback_quality_note })}
              />
              <RatingInput
                label="Learning and growth"
                description="Did this week stretch you? Did Jamie create space for you to learn, try things, and own your work?"
                rating={draftFeedback.growth_rating}
                note={draftFeedback.growth_note}
                onRatingChange={(growth_rating) => updateFeedbackDraft({ growth_rating })}
                onNoteChange={(growth_note) => updateFeedbackDraft({ growth_note })}
              />
            </div>
            <div className="divider"></div>
            <div className="prompt-list">
              <FeedbackPrompt
                label="What's one thing Jamie does well as a manager?"
                helper="Be specific. Supportive is nice; business context, prioritization, or feedback examples are more useful."
                value={draftFeedback.open_reflection_good}
                onChange={(open_reflection_good) => updateFeedbackDraft({ open_reflection_good })}
              />
              <FeedbackPrompt
                label="What's one thing Jamie could do differently?"
                helper="Think about what would make your work easier, clearer, or more meaningful."
                value={draftFeedback.open_reflection_different}
                onChange={(open_reflection_different) => updateFeedbackDraft({ open_reflection_different })}
              />
              <FeedbackPrompt
                label="Is there anything you need that you haven't gotten yet?"
                helper="Context, access, feedback, autonomy, stretch assignments, or introductions."
                value={draftFeedback.open_reflection_needs}
                onChange={(open_reflection_needs) => updateFeedbackDraft({ open_reflection_needs })}
              />
              <FeedbackPrompt
                label="One word that describes working here so far"
                helper="No wrong answer. Update it whenever it changes."
                value={draftFeedback.one_word}
                onChange={(one_word) => updateFeedbackDraft({ one_word })}
              />
            </div>
            <div className="tip-box">
              <p>
                <strong>Why this matters:</strong> Giving upward feedback is a skill most people do not develop
                until they are managing others themselves. Practice it clearly and without drama.
              </p>
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
}

function FeedbackPrompt({
  label,
  helper,
  value,
  onChange
}: {
  label: string;
  helper: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="prompt">
      <p className="prompt-label">{label}</p>
      <p className="prompt-q">{helper}</p>
      <textarea className="prompt-input" value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}
