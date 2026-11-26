import * as state from './state.js';
import { renderList, renderStats } from './ui.js';

const form = document.querySelector('#addForm');
const nameInput = document.querySelector('#nameInput');
const priceInput = document.querySelector('#priceInput');
const categoryInput = document.querySelector('#categoryInput');
const filterButtons = document.querySelectorAll('#filters button');

function refresh() {
  renderList(state.getFilteredItems(), {
    onToggle: (id) => {
      state.toggleItem(id);
      refresh();
    },
    onDelete: (id) => {
      state.removeItem(id);
      refresh();
    },
  });
  renderStats(state.getAllItems());
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  if (!name) return;

  state.addItem({
    name,
    price: Number(priceInput.value) || 0,
    category: categoryInput.value,
  });

  form.reset();
  nameInput.focus();
  refresh();
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    state.setFilter(btn.dataset.filter);
    filterButtons.forEach(b => b.classList.toggle('active', b === btn));
    refresh();
  });
});

refresh();