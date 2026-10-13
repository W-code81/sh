import { checklistItemIds } from "./checklistData";

const STORAGE_KEY = "shift-camp-packing-checklist";
const EMPTY_SNAPSHOT: readonly string[] = [];
const validItemIds = new Set(checklistItemIds);
const subscribers = new Set<() => void>();
let snapshot: readonly string[] | undefined;

/** Read saved IDs once and discard stale IDs if the checklist content changes later. */
function loadSnapshot() {
  if (snapshot) return snapshot;

  try {
    const storedValue: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    snapshot = Array.isArray(storedValue)
      ? [...new Set(storedValue.filter((id): id is string => typeof id === "string" && validItemIds.has(id)))]
      : [];
  } catch {
    snapshot = [];
  }

  return snapshot;
}

/** Keep the in-memory snapshot, browser storage, and React subscribers in sync. */
function publish(nextSnapshot: readonly string[]) {
  snapshot = [...nextSnapshot];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Keep the checklist usable when browser storage is unavailable.
  }
  subscribers.forEach((subscriber) => subscriber());
}

export function subscribeToChecklist(subscriber: () => void) {
  loadSnapshot();
  subscribers.add(subscriber);
  return () => subscribers.delete(subscriber);
}

/** The browser snapshot used by useSyncExternalStore after hydration. */
export function getChecklistSnapshot() {
  return loadSnapshot();
}

/** Use an empty server snapshot to keep server HTML deterministic. */
export function getServerChecklistSnapshot() {
  return EMPTY_SNAPSHOT;
}

/** Update one item without mutating the snapshot currently observed by React. */
export function setChecklistItem(itemId: string, checked: boolean) {
  const current = loadSnapshot();
  const next = new Set(current);
  if (checked) next.add(itemId);
  else next.delete(itemId);
  publish([...next]);
}

export function markChecklistComplete() {
  publish(checklistItemIds);
}

export function resetChecklist() {
  publish([]);
}
