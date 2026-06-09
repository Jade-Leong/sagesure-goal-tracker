"use client";

import { useState } from "react";
import { ManagerFeedback, WeeklyLogEntry } from "@/lib/types";
import EditableField from "./EditableField";
import RatingInput from "./RatingInput";

type WeekEntryProps = {
  entry: WeeklyLogEntry;
  feedback?: ManagerFeedback;
  defaultOpen?: boolean;
  onEntryChange: (patch: Partial<WeeklyLogEntry>) => void;
  onFeedbackChange: (patch: Partial<ManagerFeedback>) => void;
};

export default function WeekEntry({
  entry,
  feedback,
  defaultOpen = false,
  onEntryChange,
  onFeedbackChange
}: WeekEntryProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <article className={`week-entry ${open ? "open" : ""}`}>
      <button className="week-entry-header" type="button" onClick={() => setOpen((current) => !current)}>
        <span className="week-label">{entry.week_label}</span>
        <span className="week-dates">{entry.week_dates}</span>
        <span className="week-chevron">⌄</span>
      </button>
      <div className="week-body">
        <div className="week-fields">
          <EditableField
            full
            label="What I worked on"
            value={entry.worked_on}
            placeholder="Add your notes here"
            onChange={(worked_on) => onEntryChange({ worked_on })}
          />
          <EditableField
            full
            label="Business impact"
            value={entry.business_impact}
            placeholder="What changed because of this work? Did it save time, improve clarity, support a decision, reduce risk, help customers, help internal teams, or move a project forward?"
            onChange={(business_impact) => onEntryChange({ business_impact })}
          />
          <EditableField
            label="Something I learned"
            value={entry.learned}
            placeholder="Add your notes here"
            onChange={(learned) => onEntryChange({ learned })}
          />
          <EditableField
            label="Something that was hard"
            value={entry.hard}
            placeholder="Add your notes here"
            onChange={(hard) => onEntryChange({ hard })}
          />
          <EditableField
            full
            label="What I want to focus on next week"
            value={entry.focus_next_week}
            placeholder="Add your notes here"
            onChange={(focus_next_week) => onEntryChange({ focus_next_week })}
          />
          <EditableField
            full
            label="Goal progress check"
            value={entry.goal_progress}
            placeholder="Any movement on your summer goals this week?"
            onChange={(goal_progress) => onEntryChange({ goal_progress })}
          />
        </div>

        {feedback ? (
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
                rating={feedback.clarity_rating}
                note={feedback.clarity_note}
                onRatingChange={(clarity_rating) => onFeedbackChange({ clarity_rating })}
                onNoteChange={(clarity_note) => onFeedbackChange({ clarity_note })}
              />
              <RatingInput
                label="Availability and support"
                description="When you needed help or had a question, was Jamie accessible and useful?"
                rating={feedback.support_rating}
                note={feedback.support_note}
                onRatingChange={(support_rating) => onFeedbackChange({ support_rating })}
                onNoteChange={(support_note) => onFeedbackChange({ support_note })}
              />
              <RatingInput
                label="Feedback quality"
                description="Was the feedback you received this week specific, actionable, and fair?"
                rating={feedback.feedback_quality_rating}
                note={feedback.feedback_quality_note}
                onRatingChange={(feedback_quality_rating) => onFeedbackChange({ feedback_quality_rating })}
                onNoteChange={(feedback_quality_note) => onFeedbackChange({ feedback_quality_note })}
              />
              <RatingInput
                label="Learning and growth"
                description="Did this week stretch you? Did Jamie create space for you to learn, try things, and own your work?"
                rating={feedback.growth_rating}
                note={feedback.growth_note}
                onRatingChange={(growth_rating) => onFeedbackChange({ growth_rating })}
                onNoteChange={(growth_note) => onFeedbackChange({ growth_note })}
              />
            </div>
            <div className="divider"></div>
            <div className="prompt-list">
              <FeedbackPrompt
                label="What's one thing Jamie does well as a manager?"
                helper="Be specific. Supportive is nice; business context, prioritization, or feedback examples are more useful."
                value={feedback.open_reflection_good}
                onChange={(open_reflection_good) => onFeedbackChange({ open_reflection_good })}
              />
              <FeedbackPrompt
                label="What's one thing Jamie could do differently?"
                helper="Think about what would make your work easier, clearer, or more meaningful."
                value={feedback.open_reflection_different}
                onChange={(open_reflection_different) => onFeedbackChange({ open_reflection_different })}
              />
              <FeedbackPrompt
                label="Is there anything you need that you haven't gotten yet?"
                helper="Context, access, feedback, autonomy, stretch assignments, or introductions."
                value={feedback.open_reflection_needs}
                onChange={(open_reflection_needs) => onFeedbackChange({ open_reflection_needs })}
              />
              <FeedbackPrompt
                label="One word that describes working here so far"
                helper="No wrong answer. Update it whenever it changes."
                value={feedback.one_word}
                onChange={(one_word) => onFeedbackChange({ one_word })}
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
