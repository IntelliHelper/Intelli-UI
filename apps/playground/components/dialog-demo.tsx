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
  Textarea,
} from "@intelli/ui";

export function DialogDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input id="name" defaultValue="Adeeb Mirza" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="bio" className="text-sm font-medium">
                Bio
              </label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                defaultValue="Building beautiful glass interfaces."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary">Elevated variant</Button>
        </DialogTrigger>
        <DialogContent variant="elevated">
          <DialogHeader>
            <DialogTitle>Confirm action</DialogTitle>
            <DialogDescription>
              This dialog uses the elevated variant with a softer transparent
              frosted surface.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost">Dismiss</Button>
            <Button variant="destructive">Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">Heavy blur</Button>
        </DialogTrigger>
        <DialogContent overlayBlur="heavy" overlayDim="heavy">
          <DialogHeader>
            <DialogTitle>Strong backdrop blur</DialogTitle>
            <DialogDescription>
              Per-dialog overlay control — heavier blur and dimming on the screen
              behind this modal.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">Custom blur</Button>
        </DialogTrigger>
        <DialogContent overlayBlurAmount="48px" overlayDimAmount={15}>
          <DialogHeader>
            <DialogTitle>Custom overlay</DialogTitle>
            <DialogDescription>
              Use overlayBlurAmount and overlayDimAmount for exact pixel and
              percentage control.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}