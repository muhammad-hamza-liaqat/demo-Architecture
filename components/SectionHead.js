export default function SectionHead({ eyebrow, title, text, center = false }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow" data-reveal>{eyebrow}</p>
      <h2 className="h2" data-reveal data-delay="0.08">{title}</h2>
      {text && <p className="mt-4 text-[0.95rem] text-muted-foreground" data-reveal data-delay="0.14">{text}</p>}
    </div>
  );
}
