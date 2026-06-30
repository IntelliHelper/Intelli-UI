import type { ReactNode } from "react";
import { Button } from "@intelli/ui";
import { ButtonGlassDemo } from "../components/button-glass-demo";
import { CliGettingStarted } from "../components/cli-getting-started";
import { DataComponentsDemo } from "../components/data-components-demo";
import { LiquidGlassDemo } from "../components/liquid-glass-demo";
import { ThemeSwitcher } from "../components/theme-switcher";
import { ThemeToggle } from "../components/theme-toggle";

const variants = [
  "default",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
] as const;

const sizes = ["sm", "default", "lg", "icon"] as const;
const shapes = ["rounded", "pill", "rectangular"] as const;

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function GlassSection({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`glass-panel rounded-2xl p-6 ${className ?? ""}`}>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <header className="glass-header sticky top-4 z-[var(--z-sticky)] mx-auto mb-8 flex max-w-5xl items-center justify-between rounded-2xl px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Intelli UI
          </h1>
          <p className="text-sm text-muted-foreground">
            Liquid Glass × Material Design 3
          </p>
        </div>
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-6 pb-16">
        <GlassSection
          title="CLI"
          description="Add Liquid Glass components to any Next.js + Tailwind project"
        >
          <CliGettingStarted />
        </GlassSection>

        <GlassSection
          title="Liquid Glass"
          description="Apple-style chrome layer floating over expressive content — toggle light/dark to see adaptive glass"
          className="animate-fade-in"
        >
          <LiquidGlassDemo />
        </GlassSection>

        <GlassSection
          title="Card, Tabs & Table"
          description="Chrome-layer surfaces with premium motion — rise-in cards, sliding tab indicator, staggered table rows"
        >
          <DataComponentsDemo />
        </GlassSection>

        <GlassSection
          title="Themes"
          description="Start with Mono Basic for black & white, or pick a glass palette"
        >
          <ThemeSwitcher />
        </GlassSection>

        <GlassSection
          title="Variants"
          description="Chrome layer (outline, secondary, ghost) + content layer (default, destructive) on glass"
        >
          <ButtonGlassDemo />
          <div className="mt-4 flex flex-wrap gap-3">
            {variants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Button>
            ))}
          </div>
        </GlassSection>

        <GlassSection
          title="Shapes"
          description="Rounded, pill, and rectangular geometry"
        >
          <div className="flex flex-wrap items-center gap-3">
            {shapes.map((shape) => (
              <Button key={shape} shape={shape} variant="default">
                {shape.charAt(0).toUpperCase() + shape.slice(1)}
              </Button>
            ))}
            <Button shape="pill" size="icon" variant="outline" aria-label="Add">
              <PlusIcon />
            </Button>
            <Button
              shape="rectangular"
              size="icon"
              variant="outline"
              aria-label="Add"
            >
              <PlusIcon />
            </Button>
          </div>
        </GlassSection>

        <GlassSection title="Sizes">
          <div className="flex flex-wrap items-center gap-3">
            {sizes.map((size) =>
              size === "icon" ? (
                <Button key={size} size={size} variant="outline" aria-label="Add">
                  <PlusIcon />
                </Button>
              ) : (
                <Button key={size} size={size} variant="default">
                  {size === "default" ? "Default" : size.toUpperCase()}
                </Button>
              ),
            )}
          </div>
        </GlassSection>

        <GlassSection title="States">
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
          </div>
        </GlassSection>

        <GlassSection title="As Child">
          <Button asChild variant="secondary">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              Renders as link
            </a>
          </Button>
        </GlassSection>
      </main>
    </div>
  );
}