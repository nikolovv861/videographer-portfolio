import { siteConfig } from "@/data/navigation";

export function Footer() {
  return (
    <footer id="footer" className="py-12">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo text */}
          <p className="font-heading text-lg font-bold tracking-tight text-heading">
            {siteConfig.name}
          </p>

          {/* Email */}
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-body transition-colors duration-300 hover:text-heading"
          >
            {siteConfig.email}
          </a>

          {/* Social icon placeholders */}
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-xs text-body transition-colors duration-300 hover:bg-foreground/10"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-xs text-body transition-colors duration-300 hover:bg-foreground/10"
              aria-label="LinkedIn"
            >
              LI
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-foreground/10 pt-8 text-center">
          <p className="text-sm text-body">
            &copy; {new Date().getFullYear()} {siteConfig.name}.{" "}
            {siteConfig.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
