"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const installDismissedKey = "rkbsports:pwa-install-dismissed:v1";

export function InstallHint() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    try {
      setIsDismissed(localStorage.getItem(installDismissedKey) === "true");
    } catch {
      setIsDismissed(true);
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();

      try {
        if (localStorage.getItem(installDismissedKey) === "true") {
          return;
        }
      } catch {
        return;
      }

      setInstallPrompt(event as BeforeInstallPromptEvent);
      setIsDismissed(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(installDismissedKey, "true");
    } catch {}
    setIsDismissed(true);
    setInstallPrompt(null);
  };

  const install = async () => {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    await installPrompt.userChoice.catch(() => undefined);
    dismiss();
  };

  if (!installPrompt || isDismissed) {
    return null;
  }

  return (
    <aside className="fixed inset-x-3 bottom-3 z-40 rounded border border-emerald-300/70 bg-white/95 p-4 text-sm text-slate-800 shadow-xl backdrop-blur dark:border-sport-primary/60 dark:bg-sport-card/95 dark:text-slate-100 sm:left-auto sm:max-w-sm">
      <p className="font-bold">Install RKBSports for quick access</p>
      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
        Open cricket calculators faster from your device home screen.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={install}
          className="btn-glow rounded bg-emerald-700 px-3 py-2 text-xs font-bold text-white hover:bg-emerald-800 dark:bg-sport-primary dark:text-sport-dark"
        >
          Install
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="btn-glow rounded border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:border-emerald-700 hover:text-emerald-800 dark:border-sport-border dark:text-slate-200 dark:hover:border-sport-primary dark:hover:text-sport-primary"
        >
          Not now
        </button>
      </div>
    </aside>
  );
}
