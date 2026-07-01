"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  accordionVariants,
  Slider,
} from "@intelli/ui";
import { cn } from "@intelli/utils";

export function AccordionSliderDemo() {
  const [volume, setVolume] = useState([65]);
  const [brightnessRange, setBrightnessRange] = useState([25, 75]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-4">
        <p className="text-sm font-medium text-foreground">Accordion</p>
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className={cn(accordionVariants({ variant: "chrome" }))}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Liquid Glass?</AccordionTrigger>
            <AccordionContent>
              A chrome layer of frosted, translucent controls that floats above
              expressive content — inspired by Apple&apos;s design language and
              Material Design 3.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How do I install components?</AccordionTrigger>
            <AccordionContent>
              Run{" "}
              <code className="rounded-md bg-background/50 px-1.5 py-0.5 text-xs">
                npx @intellihelper/cli@latest add accordion slider
              </code>{" "}
              to copy source into your project.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I customize variants?</AccordionTrigger>
            <AccordionContent>
              Yes — every component exports CVA helpers, data-slot hooks, and
              className slots for full control over chrome and outline surfaces.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion
          type="single"
          collapsible
          className={cn(accordionVariants({ variant: "outline", animated: false }))}
        >
          <AccordionItem value="outline-1">
            <AccordionTrigger size="sm">Outline variant</AccordionTrigger>
            <AccordionContent>
              A subtler bordered surface for nested panels and secondary content.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="space-y-6">
        <p className="text-sm font-medium text-foreground">Slider</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Volume</span>
            <span className="font-medium tabular-nums">{volume[0]}%</span>
          </div>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            aria-label="Volume"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Brightness range</span>
            <span className="font-medium tabular-nums">
              {brightnessRange[0]}% – {brightnessRange[1]}%
            </span>
          </div>
          <Slider
            value={brightnessRange}
            onValueChange={setBrightnessRange}
            max={100}
            step={5}
            aria-label="Brightness range"
          />
        </div>

        <div className="space-y-3">
          <span className="text-sm text-muted-foreground">Sizes & outline</span>
          <Slider defaultValue={[40]} max={100} size="sm" aria-label="Small slider" />
          <Slider
            defaultValue={[60]}
            max={100}
            variant="outline"
            size="lg"
            aria-label="Large outline slider"
          />
        </div>
      </div>
    </div>
  );
}