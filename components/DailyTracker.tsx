"use client";

import Section from "./Section";
import MeetingCard from "./MeetingCard";
import { createId } from "@/lib/storage";
import { DailyEntry, MeetingCardData } from "@/lib/types";

type DailyTrackerProps = {
  dailyEntries: DailyEntry[];
  meetingCards: MeetingCardData[];
  onChange: (dailyEntries: DailyEntry[], meetingCards: MeetingCardData[]) => void;
};

export default function DailyTracker({ dailyEntries, meetingCards, onChange }: DailyTrackerProps) {
  function addDay() {
    const timestamp = new Date().toISOString();
    const date = new Date().toISOString().slice(0, 10);
    onChange(
      [
        ...dailyEntries,
        {
          id: createId("day"),
          date,
          created_at: timestamp,
          updated_at: timestamp
        }
      ],
      meetingCards
    );
  }

  function updateDay(id: string, date: string) {
    onChange(dailyEntries.map((entry) => (entry.id === id ? { ...entry, date } : entry)), meetingCards);
  }

  function deleteDay(id: string) {
    onChange(
      dailyEntries.filter((entry) => entry.id !== id),
      meetingCards.filter((card) => card.daily_entry_id !== id)
    );
  }

  function addMeeting(dailyEntryId: string) {
    const timestamp = new Date().toISOString();
    onChange(dailyEntries, [
      ...meetingCards,
      {
        id: createId("meeting"),
        daily_entry_id: dailyEntryId,
        title: "",
        time: "",
        attendees: "",
        notes: "",
        takeaways: "",
        follow_ups: "",
        created_at: timestamp,
        updated_at: timestamp
      }
    ]);
  }

  function updateMeeting(id: string, patch: Partial<MeetingCardData>) {
    onChange(dailyEntries, meetingCards.map((card) => (card.id === id ? { ...card, ...patch } : card)));
  }

  function deleteMeeting(id: string) {
    onChange(dailyEntries, meetingCards.filter((card) => card.id !== id));
  }

  return (
    <Section number="04" title="Daily Tracker">
      <div className="daily-toolbar">
        <p className="prose">Track meetings, notes, takeaways, and follow-ups by day.</p>
        <button className="accent-button" type="button" onClick={addDay}>
          Add day
        </button>
      </div>

      <div className="day-list">
        {dailyEntries.length === 0 ? (
          <div className="empty-state">Add a day to start tracking meetings.</div>
        ) : null}

        {dailyEntries.map((day) => {
          const cards = meetingCards.filter((card) => card.daily_entry_id === day.id);
          return (
            <article className="day-entry" key={day.id}>
              <div className="day-header">
                <input
                  aria-label="Day date"
                  type="date"
                  value={day.date}
                  onChange={(event) => updateDay(day.id, event.target.value)}
                />
                <div className="day-actions">
                  <button className="text-button" type="button" onClick={() => addMeeting(day.id)}>
                    Add meeting
                  </button>
                  <button className="text-button danger" type="button" onClick={() => deleteDay(day.id)}>
                    Delete day
                  </button>
                </div>
              </div>

              <div className="meeting-grid">
                {cards.length === 0 ? <div className="empty-state small">No meetings yet.</div> : null}
                {cards.map((card) => (
                  <MeetingCard
                    key={card.id}
                    meeting={card}
                    onSave={(meeting) => updateMeeting(card.id, meeting)}
                    onDelete={() => deleteMeeting(card.id)}
                  />
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
