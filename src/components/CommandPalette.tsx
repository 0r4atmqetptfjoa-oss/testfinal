// =======================================================
// FILE: src/components/CommandPalette.tsx
// A global command palette built with cmdk. This component
// can be toggled open from anywhere and provides quick
// navigation between pages. To use, import and render
// <CommandPalette /> once in your Shell or layout. You
// should also bind a keyboard shortcut (e.g. Ctrl+K) to
// toggle the palette's open state.
// =======================================================

import React, { useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';

// A list of commands that define the palette actions. Each
// command includes a label and a route to navigate to. Add
// additional entries as your app grows.
const commands = [
  { label: 'Acasă', route: '/home' },
  { label: 'Mod Învățare', route: '/learning' },
  { label: 'Simulare Examen', route: '/exam' },
  { label: 'Setări', route: '/settings' },
  { label: 'Test Engleză', route: '/english' },
  { label: 'Insigne', route: '/badges' },
  { label: 'Dashboard', route: '/dashboard' },
  { label: 'Adaptive Learning', route: '/adaptive-learning' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Expose a global hotkey to toggle the palette. We listen
  // for Ctrl+K or Cmd+K on macOS. Note: If your app already
  // binds Ctrl+K, adjust this to a different key.
  React.useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // When selecting a command, navigate to its route and close
  // the palette
  const handleSelect = (route: string) => {
    navigate(route);
    setOpen(false);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Comenzi rapide"
      className="fixed inset-0 flex items-start justify-center z-[200] p-4"
    >
      <div className="bg-base-300 rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <Command.Input
          placeholder="Tastează o comandă sau caută..."
          className="p-3 w-full bg-base-200 text-base-100 border-b border-base-300 outline-none"
        />
        <Command.List className="max-h-80 overflow-y-auto">
          <Command.Empty className="p-4 text-center text-base-400">
            Niciun rezultat.
          </Command.Empty>
          {commands.map((cmd) => (
            <Command.Item
              key={cmd.route}
              value={cmd.label}
              onSelect={() => handleSelect(cmd.route)}
              className="p-3 cursor-pointer hover:bg-base-200"
            >
              {cmd.label}
            </Command.Item>
          ))}
        </Command.List>
      </div>
    </Command.Dialog>
  );
}