type EditableFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  full?: boolean;
  onChange: (value: string) => void;
};

export default function EditableField({ label, value, placeholder, full, onChange }: EditableFieldProps) {
  return (
    <div className={`week-field ${full ? "full" : ""}`}>
      <label>{label}</label>
      <textarea
        className="field-box"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
