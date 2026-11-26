const listEl = document.querySelector('#list');
const counterEl = document.querySelector('#counter');
const totalEl = document.querySelector('#total');

const categoryLabels = {
  food: 'Продукты',
  home: 'Для дома',
  other: 'Другое',
};

export function renderList(items, handlers) {
  listEl.textContent = '';

  if (items.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = 'Пока ничего нет';
    listEl.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();

  for (const item of items) {
    const li = document.createElement('li');
    li.className = 'item' + (item.done ? ' done' : '');
    li.dataset.id = item.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.done;
    checkbox.addEventListener('change', () => handlers.onToggle(item.id));

    const info = document.createElement('div');
    info.className = 'info';

    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = item.name;

    const meta = document.createElement('span');
    meta.className = 'meta';
    meta.textContent = categoryLabels[item.category] + ' · ' + item.price + ' ₽';

    info.append(title, meta);

    const del = document.createElement('button');
    del.className = 'del';
    del.type = 'button';
    del.textContent = '×';
    del.title = 'Удалить';
    del.addEventListener('click', () => handlers.onDelete(item.id));

    li.append(checkbox, info, del);
    fragment.appendChild(li);
  }

  listEl.appendChild(fragment);
}

export function renderStats(allItems) {
  const left = allItems.filter(i => !i.done);
  const sum = left.reduce((acc, i) => acc + (Number(i.price) || 0), 0);

  counterEl.textContent = `${left.length} ${plural(left.length, 'покупка', 'покупки', 'покупок')}`;
  totalEl.textContent = sum;
}

function plural(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}