'use client';

import { useEffect } from 'react';

/**
 * Global content protection component:
 * - Disables context menu (right-click) across the entire page
 * - Disables text selection, copy, cut, and drag events
 * - Blocks devtools / inspect shortcuts (F12, Ctrl+Shift+I/J/C)
 * - Blocks save & print shortcuts (Ctrl+S, Ctrl+P, Ctrl+U)
 * - Neutralizes PrintScreen clipboard copy attempts
 */
export function ContentProtection() {
  useEffect(() => {
    // 1. Disable Right Click (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Disable Copy, Cut, SelectStart & Drag
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    const handleSelectStart = (e: Event) => {
      // Allow selection only in input or textarea if any exist
      const target = e.target as HTMLElement;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA') return;
      e.preventDefault();
    };

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // 3. Disable Shortcuts (DevTools, View Source, Save, Print, Copy)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;

      // F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
        return;
      }

      // PrintScreen key: clear clipboard
      if (e.key === 'PrintScreen') {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('');
        }
      }

      if (isCtrlOrMeta) {
        const key = e.key.toLowerCase();

        // Ctrl+C (Copy), Ctrl+X (Cut), Ctrl+A (Select All), Ctrl+U (Source), Ctrl+S (Save), Ctrl+P (Print)
        if (['c', 'x', 'a', 'u', 's', 'p'].includes(key)) {
          const target = e.target as HTMLElement;
          if ((key === 'c' || key === 'a') && (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA')) {
            return;
          }
          e.preventDefault();
          return;
        }

        // Ctrl+Shift+I / J / C (DevTools inspector)
        if (e.shiftKey && ['i', 'j', 'c'].includes(key)) {
          e.preventDefault();
          return;
        }
      }
    };

    document.addEventListener('contextmenu', handleContextMenu, { capture: true });
    document.addEventListener('copy', handleCopy, { capture: true });
    document.addEventListener('cut', handleCut, { capture: true });
    document.addEventListener('selectstart', handleSelectStart, { capture: true });
    document.addEventListener('dragstart', handleDragStart, { capture: true });
    window.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      document.removeEventListener('copy', handleCopy, { capture: true });
      document.removeEventListener('cut', handleCut, { capture: true });
      document.removeEventListener('selectstart', handleSelectStart, { capture: true });
      document.removeEventListener('dragstart', handleDragStart, { capture: true });
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, []);

  return null;
}
