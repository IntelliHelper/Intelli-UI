"use client";

import { Input, Textarea } from "@intelli/ui";

export function FormComponentsDemo() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="input-chrome" className="text-sm font-medium">
            Chrome input
          </label>
          <Input
            id="input-chrome"
            placeholder="Enter your name"
            defaultValue="Adeeb Mirza"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="input-outline" className="text-sm font-medium">
            Outline input
          </label>
          <Input
            id="input-outline"
            variant="outline"
            placeholder="you@example.com"
            type="email"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="input-sizes" className="text-sm font-medium">
            Sizes
          </label>
          <div className="flex flex-col gap-2">
            <Input size="sm" placeholder="Small" />
            <Input placeholder="Default" />
            <Input size="lg" placeholder="Large" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="textarea-chrome" className="text-sm font-medium">
            Chrome textarea
          </label>
          <Textarea
            id="textarea-chrome"
            placeholder="Write a message..."
            defaultValue="Liquid Glass form fields with translucent chrome surfaces."
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="textarea-outline" className="text-sm font-medium">
            Outline textarea
          </label>
          <Textarea
            id="textarea-outline"
            variant="outline"
            placeholder="Add a longer description..."
          />
        </div>
      </div>
    </div>
  );
}