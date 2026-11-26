import { loadItems, saveItems } from './storage.js';

let items = loadItems();
let filter = 'all';

export function getAllItems() {
  return items;
}

export function getFilteredItems() {
  if (filter === 'all') return items;
  return items.filter(item => item.category === filter);
}

export function setFilter(value) {
  filter = value;
}

export function addItem(data) {
  items.unshift({
    id: String(Date.now()),
    done: false,
    ...data,
  });
  persist();
}

export function toggleItem(id) {
  const item = items.find(i => i.id === id);
  if (item) item.done = !item.done;
  persist();
}

export function removeItem(id) {
  items = items.filter(i => i.id !== id);
  persist();
}

function persist() {
  saveItems(items);
}