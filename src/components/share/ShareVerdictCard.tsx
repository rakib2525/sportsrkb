"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";

export type ShareCardData = {
  calculatorName: string;
  mainResult: string;
  verdict: string;
  teamName?: string;
};

type ShareVerdictCardProps = {
  data: ShareCardData;
};

export function getShareCardText(data: ShareCardData) {
  return [
    "RKBSports.app",
    data.calculatorName,
    data.teamName ? `Team: ${data.teamName}` : null,
    data.mainResult,
    data.verdict,
  ]
    .filter(Boolean)
    .join("\n");
}

export function ShareVerdictCard({ data }: ShareVerdictCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");

  async function copyCardText() {
    try {
      const text = getShareCardText(data);
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "true");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setMessage("Card text copied");
    } catch {
      setMessage("Copy unavailable");
    }
  }

  async function downloadCard() {
    if (!cardRef.current) {
      return;
    }

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `${data.calculatorName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-result.png`;
      link.href = dataUrl;
      link.click();
      setMessage("PNG downloaded");
    } catch {
      setMessage("PNG download unavailable. You can copy the card text instead.");
    }
  }

  return (
    <section className="glass-card result-appear mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-sport-border dark:bg-sport-dark/70">
      <div
        ref={cardRef}
        className="glass-card rounded-lg border border-emerald-200 bg-white p-5 text-slate-950 shadow-sm dark:border-sport-primary/30 dark:bg-sport-card dark:text-white"
      >
        <p className="text-xs font-black uppercase tracking-wide text-emerald-700 dark:text-sport-primary">
          RKBSports.app
        </p>
        <h3 className="mt-2 text-lg font-black">{data.calculatorName}</h3>
        {data.teamName ? (
          <p className="mt-2 text-sm font-bold text-slate-600 dark:text-slate-300">
            Team: {data.teamName}
          </p>
        ) : null}
        <p className="mt-4 text-2xl font-black text-emerald-800 dark:text-sport-primary">
          {data.mainResult}
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
          {data.verdict}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copyCardText}
          className="btn-glow rounded border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:border-sport-border dark:text-slate-200 dark:hover:border-sport-primary dark:hover:text-sport-primary"
        >
          Copy Card Text
        </button>
        <button
          type="button"
          onClick={downloadCard}
          className="btn-glow rounded border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:border-sport-border dark:text-slate-200 dark:hover:border-sport-primary dark:hover:text-sport-primary"
        >
          Download Card as PNG
        </button>
        {message ? (
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
            {message}
          </span>
        ) : null}
      </div>
    </section>
  );
}
