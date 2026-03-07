interface ButtonProps {
  variant?: "default" | "cta";
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export function Button({
  variant = "default",
  children,
  href,
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-heading text-sm tracking-wide transition-all duration-300";

  const variants = {
    default:
      "border border-foreground/20 text-foreground px-6 py-3 hover:border-foreground/40",
    cta: "border border-foreground/30 text-foreground px-6 py-3 hover:bg-gold hover:text-background hover:border-gold",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
