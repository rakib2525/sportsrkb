export type SavedTeam = {
  id: string;
  name: string;
};

export const savedTeamsStorageKey = "rkbsports:saved-teams";

export function readSavedTeams(): SavedTeam[] {
  try {
    const value = window.localStorage.getItem(savedTeamsStorageKey);
    return value ? (JSON.parse(value) as SavedTeam[]) : [];
  } catch {
    return [];
  }
}

export function writeSavedTeams(teams: SavedTeam[]) {
  window.localStorage.setItem(savedTeamsStorageKey, JSON.stringify(teams));
}

export function addSavedTeam(name: string) {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return readSavedTeams();
  }

  const teams = readSavedTeams();
  const nextTeams = [
    { id: `${Date.now()}`, name: trimmedName },
    ...teams.filter(
      (team) => team.name.toLowerCase() !== trimmedName.toLowerCase(),
    ),
  ].slice(0, 12);

  writeSavedTeams(nextTeams);
  return nextTeams;
}

export function deleteSavedTeam(id: string) {
  const nextTeams = readSavedTeams().filter((team) => team.id !== id);
  writeSavedTeams(nextTeams);
  return nextTeams;
}

export function clearSavedTeams() {
  writeSavedTeams([]);
  return [];
}
