export type TournamentDraft = {
  id: string;
  name: string;
  note: string;
  createdAt: string;
};

export const tournamentDraftsStorageKey = "rkbsports:tournament-drafts";

export function readTournamentDrafts(): TournamentDraft[] {
  try {
    const value = window.localStorage.getItem(tournamentDraftsStorageKey);
    const parsed = value ? (JSON.parse(value) as TournamentDraft[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeTournamentDrafts(drafts: TournamentDraft[]) {
  window.localStorage.setItem(tournamentDraftsStorageKey, JSON.stringify(drafts));
}

export function addTournamentDraft(name: string, note: string) {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return readTournamentDrafts();
  }

  const nextDrafts = [
    {
      id: `${Date.now()}`,
      name: trimmedName,
      note: note.trim(),
      createdAt: new Date().toISOString(),
    },
    ...readTournamentDrafts(),
  ].slice(0, 20);

  writeTournamentDrafts(nextDrafts);
  return nextDrafts;
}

export function deleteTournamentDraft(id: string) {
  const nextDrafts = readTournamentDrafts().filter((draft) => draft.id !== id);
  writeTournamentDrafts(nextDrafts);
  return nextDrafts;
}

export function clearTournamentDrafts() {
  writeTournamentDrafts([]);
  return [];
}
