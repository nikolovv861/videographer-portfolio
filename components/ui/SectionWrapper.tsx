interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  fullBleed?: boolean;
  className?: string;
}

export function SectionWrapper({
  id,
  children,
  fullBleed = false,
  className = "",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      {fullBleed ? (
        children
      ) : (
        <div className="mx-auto max-w-6xl px-6 md:px-8">{children}</div>
      )}
    </section>
  );
}
