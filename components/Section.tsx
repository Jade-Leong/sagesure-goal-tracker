type SectionProps = {
  number: string;
  title: string;
  children: React.ReactNode;
};

export default function Section({ number, title, children }: SectionProps) {
  return (
    <section className="section">
      <div className="section-header">
        <span className="section-num">{number}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}
