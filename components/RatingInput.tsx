type RatingInputProps = {
  label: string;
  description: string;
  rating: number | null;
  note: string;
  onRatingChange: (rating: number | null) => void;
  onNoteChange: (note: string) => void;
};

export default function RatingInput({
  label,
  description,
  rating,
  note,
  onRatingChange,
  onNoteChange
}: RatingInputProps) {
  return (
    <div className="rating-item">
      <p className="rating-dim">{label}</p>
      <p className="rating-desc">{description}</p>
      <div className="rating-scale">
        {[1, 2, 3, 4].map((value) => (
          <button
            key={value}
            type="button"
            className={`r${value} ${rating === value ? "selected" : ""}`}
            onClick={() => onRatingChange(rating === value ? null : value)}
          >
            {value}
          </button>
        ))}
      </div>
      <textarea
        className="rating-note-input"
        value={note}
        placeholder="Add one line of context"
        onChange={(event) => onNoteChange(event.target.value)}
      />
    </div>
  );
}
