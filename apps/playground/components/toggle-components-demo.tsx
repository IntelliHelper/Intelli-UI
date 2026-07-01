"use client";

import { useState, type ReactNode } from "react";
import { Badge, Checkbox, Switch } from "@intelli/ui";

function LabelRow({
  id,
  label,
  description,
  children,
}: {
  id: string;
  label: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      {children}
      <div className="grid gap-0.5">
        <label htmlFor={id} className="text-sm font-medium leading-none">
          {label}
        </label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}

export function ToggleComponentsDemo() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [terms, setTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [selectAll, setSelectAll] = useState<boolean | "indeterminate">(
    "indeterminate",
  );

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-5">
        <p className="text-sm font-medium text-foreground">Switch</p>

        <LabelRow
          id="switch-notifications"
          label="Push notifications"
          description="Spring-animated thumb with chrome track fill"
        >
          <Switch
            id="switch-notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
            aria-label="Push notifications"
          />
        </LabelRow>

        <LabelRow
          id="switch-dark-mode"
          label="Dark mode"
          description="Outline variant, large size"
        >
          <Switch
            id="switch-dark-mode"
            variant="outline"
            size="lg"
            checked={darkMode}
            onCheckedChange={setDarkMode}
            aria-label="Dark mode"
          />
        </LabelRow>

        <div className="flex items-center gap-4">
          <Switch size="sm" defaultChecked aria-label="Small switch" />
          <Switch defaultChecked aria-label="Default switch" />
          <Switch size="lg" aria-label="Large switch" />
        </div>
      </div>

      <div className="space-y-5">
        <p className="text-sm font-medium text-foreground">Checkbox</p>

        <LabelRow
          id="checkbox-terms"
          label="Accept terms"
          description="Animated check mark on toggle"
        >
          <Checkbox
            id="checkbox-terms"
            checked={terms}
            onCheckedChange={(value) => setTerms(value === true)}
          />
        </LabelRow>

        <LabelRow
          id="checkbox-newsletter"
          label="Email newsletter"
          description="Outline variant"
        >
          <Checkbox
            id="checkbox-newsletter"
            variant="outline"
            checked={newsletter}
            onCheckedChange={(value) => setNewsletter(value === true)}
          />
        </LabelRow>

        <LabelRow
          id="checkbox-select-all"
          label="Select all items"
          description="Indeterminate state support"
        >
          <Checkbox
            id="checkbox-select-all"
            checked={selectAll}
            onCheckedChange={(value) => setSelectAll(value)}
          />
        </LabelRow>

        <div className="flex items-center gap-4">
          <Checkbox size="sm" defaultChecked aria-label="Small checkbox" />
          <Checkbox defaultChecked aria-label="Default checkbox" />
          <Checkbox size="lg" aria-label="Large checkbox" />
        </div>
      </div>

      <div className="space-y-5">
        <p className="text-sm font-medium text-foreground">Badge</p>

        <div className="flex flex-wrap gap-2">
          <Badge animated>Default</Badge>
          <Badge variant="secondary" animated>
            Secondary
          </Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="chrome">Chrome</Badge>
          <Badge variant="success" pulse>
            Live
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge size="sm">Small</Badge>
          <Badge>Default</Badge>
          <Badge size="lg">Large</Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" animated>
            New
          </Badge>
          <Badge variant="default" pulse>
            Beta
          </Badge>
          <Badge variant="outline" size="sm">
            v2.0
          </Badge>
        </div>
      </div>
    </div>
  );
}