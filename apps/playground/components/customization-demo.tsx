"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from "@intelli/ui";

export function CustomizationDemo() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-sm font-medium">Form field states</p>
          <Input placeholder="Default chrome input" />
          <Input state="error" placeholder="Error state" defaultValue="invalid@" />
          <Input state="success" placeholder="Success state" defaultValue="valid@email.com" />
          <Textarea variant="outline" placeholder="Outline textarea" />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium">Tabs variants</p>
          <Tabs defaultValue="a">
            <TabsList>
              <TabsTrigger value="a">Chrome</TabsTrigger>
              <TabsTrigger value="b">Capsule</TabsTrigger>
            </TabsList>
            <TabsContent value="a">Default chrome capsule tabs.</TabsContent>
            <TabsContent value="b">Trigger size and content animation are configurable.</TabsContent>
          </Tabs>

          <Tabs defaultValue="a">
            <TabsList variant="plain" indicatorClassName="rounded-xl bg-primary/15">
              <TabsTrigger value="a" size="sm">
                Small
              </TabsTrigger>
              <TabsTrigger value="b">Default</TabsTrigger>
              <TabsTrigger value="c" size="lg">
                Large
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button loading>Loading</Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Custom dialog</Button>
          </DialogTrigger>
          <DialogContent
            size="lg"
            overlayBlur="xl"
            overlayDim="light"
            closeClassName="top-3 right-3 size-8"
            className="gap-6"
          >
            <DialogHeader className="pr-10">
              <DialogTitle className="text-xl">Fully customizable</DialogTitle>
              <DialogDescription>
                Control size, overlay blur/dim, close button, and every sub-part
                via className or variant props.
              </DialogDescription>
            </DialogHeader>
            <Input variant="outline" placeholder="Drop in any field variant" />
            <DialogFooter>
              <Button variant="ghost">Cancel</Button>
              <Button>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}