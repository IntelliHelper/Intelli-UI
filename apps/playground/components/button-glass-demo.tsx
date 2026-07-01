import { Button } from "@intelli/ui";

const variants = [
  "default",
  "glass",
  "primary",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
] as const;

export function ButtonGlassDemo() {
  return (
    <div
      className="overflow-hidden rounded-2xl p-6"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.52 0.18 270) 0%, oklch(0.62 0.16 220) 45%, oklch(0.72 0.2 55) 100%)",
      }}
    >
      <p className="mb-4 text-sm font-medium content-text-muted">
        Default & glass stay neutral frosted — primary/destructive use saturated
        theme glass on expressive content
      </p>
      <div className="flex flex-wrap gap-3">
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
}