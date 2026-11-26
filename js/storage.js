const KEY = 'shopping-list-items';

export function loadItems() {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveItems(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}